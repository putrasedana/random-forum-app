/**
 * test scenario for authUser thunks
 *
 * - asyncSetAuthUser thunk
 *   - should dispatch action correctly when login success
 *   - should dispatch action and call alert correctly when login failed
 *
 * - asyncUnsetAuthUser thunk
 *   - should dispatch action correctly when logout
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from './action';

const fakeAuthUser = {
  id: 'user-1',
  name: 'User Test',
  email: 'user@test.com',
};

const fakeToken = 'fake-token';
const fakeErrorResponse = new Error('Ups, something went wrong');

describe('authUser thunks', () => {
  beforeEach(() => {
    // backup original implementations
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    // restore original implementations
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;

    delete api._login;
    delete api._putAccessToken;
    delete api._getOwnProfile;
  });

  describe('asyncSetAuthUser thunk', () => {
    it('should dispatch action correctly when login success', async () => {
      // arrange
      api.login = () => Promise.resolve(fakeToken);
      api.putAccessToken = vi.fn();
      api.getOwnProfile = () => Promise.resolve(fakeAuthUser);

      const dispatch = vi.fn();

      // action
      const result = await asyncSetAuthUser({
        email: 'user@test.com',
        password: 'password',
      })(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        setAuthUserActionCreator(fakeAuthUser),
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
      expect(result).toEqual({
        success: true,
        user: fakeAuthUser,
      });
    });

    it('should dispatch action and call alert correctly when login failed', async () => {
      // arrange
      api.login = () => Promise.reject(fakeErrorResponse);
      api.putAccessToken = vi.fn();
      api.getOwnProfile = vi.fn();

      const dispatch = vi.fn();
      window.alert = vi.fn();

      // action
      await expect(
        asyncSetAuthUser({
          email: 'user@test.com',
          password: 'password',
        })(dispatch),
      ).rejects.toThrow(fakeErrorResponse);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    });
  });

  describe('asyncUnsetAuthUser thunk', () => {
    it('should dispatch action correctly when logout', () => {
      // arrange
      api.putAccessToken = vi.fn();
      const dispatch = vi.fn();

      // action
      asyncUnsetAuthUser()(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
      expect(api.putAccessToken).toHaveBeenCalledWith('');
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
