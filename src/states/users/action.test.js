/**
 * test scenarios for asyncRegisterUser thunk
 *
 * - should call api.register correctly when success
 * - should call alert correctly when register failed
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import api from '../../utils/api';
import { asyncRegisterUser } from './action';

const fakeRegisterPayload = {
  name: 'User Test',
  email: 'user@test.com',
  password: 'password123',
};

const fakeErrorResponse = new Error('Register failed');

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    api._register = api.register;
    window._alert = window.alert;
  });

  afterEach(() => {
    api.register = api._register;
    delete api._register;

    window.alert = window._alert;
    delete window._alert;
  });

  it('should call api.register correctly when success', async () => {
    // arrange
    api.register = vi.fn(() => Promise.resolve());

    // action
    await asyncRegisterUser(fakeRegisterPayload)();

    // assert
    expect(api.register).toHaveBeenCalledWith(fakeRegisterPayload);
  });

  it('should call alert correctly when register failed', async () => {
    // arrange
    api.register = vi.fn(() => Promise.reject(fakeErrorResponse));
    window.alert = vi.fn();

    // action and assert
    await expect(asyncRegisterUser(fakeRegisterPayload)()).rejects.toThrow(
      'Register failed',
    );

    // assert alert was called
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
