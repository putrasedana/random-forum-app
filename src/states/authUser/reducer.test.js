/**
 * test scenario for authUserReducer
 *
 * - authUserReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the auth user when given by SET_AUTH_USER action
 *  - should return null when given by UNSET_AUTH_USER action
 *
 */

import { describe, it, expect } from 'vitest';
import authUserReducer from './reducer';
import { ActionType } from './action';

describe('authUserReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the auth user when given by SET_AUTH_USER action', () => {
    // arrange
    const initialState = null;
    const authUser = {
      id: 'user-1',
      name: 'User Test',
      email: 'user@test.com',
    };

    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser,
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(authUser);
  });

  it('should return null when given by UNSET_AUTH_USER action', () => {
    // arrange
    const initialState = {
      id: 'user-1',
      name: 'User Test',
      email: 'user@test.com',
    };

    const action = {
      type: ActionType.UNSET_AUTH_USER,
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });
});
