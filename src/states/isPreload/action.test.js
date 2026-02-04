/**
 * test scenario for asyncPreloadProcess thunk
 *
 * - asyncPreloadProcess thunk
 *   - should dispatch action correctly when preload success
 *   - should dispatch action correctly when preload failed
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncPreloadProcess, setIsPreloadActionCreator } from './action';
import { setAuthUserActionCreator } from '../authUser/action';

const fakeAuthUser = {
  id: 'user-1',
  name: 'User Test',
  email: 'user@test.com',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPreloadProcess thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    // restore original implementation
    api.getOwnProfile = api._getOwnProfile;
    delete api._getOwnProfile;
  });

  it('should dispatch action correctly when preload success', async () => {
    // arrange
    api.getOwnProfile = () => Promise.resolve(fakeAuthUser);
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeAuthUser),
    );
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when preload failed', async () => {
    // arrange
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();

    // action
    await asyncPreloadProcess()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
