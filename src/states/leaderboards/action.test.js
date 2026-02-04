/**
 * test scenario for asyncFetchLeaderboards thunk
 *
 * - asyncFetchLeaderboards thunk
 *   - should dispatch action correctly when fetch leaderboards success
 *   - should dispatch action correctly when fetch leaderboards failed
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncFetchLeaderboards,
  receiveLeaderboardsActionCreator,
} from './action';

const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'user-1',
      name: 'User One',
    },
    score: 100,
  },
  {
    user: {
      id: 'user-2',
      name: 'User Two',
    },
    score: 90,
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncFetchLeaderboards thunk', () => {
  beforeEach(() => {
    // backup original implementations
    api._getLeaderboards = api.getLeaderboards;
    window._alert = window.alert;
  });

  afterEach(() => {
    // restore original implementations
    api.getLeaderboards = api._getLeaderboards;
    delete api._getLeaderboards;

    window.alert = window._alert;
    delete window._alert;
  });

  it('should dispatch action correctly when fetch leaderboards success', async () => {
    // arrange
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);
    const dispatch = vi.fn();

    // action
    await asyncFetchLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when fetch leaderboards failed', async () => {
    // arrange
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);
    window.alert = vi.fn();
    const dispatch = vi.fn();

    // action
    await asyncFetchLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
