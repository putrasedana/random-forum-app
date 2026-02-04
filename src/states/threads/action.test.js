/**
 * test scenario for asyncCreateThread thunk
 *
 * - asyncCreateThread thunk
 *   - should dispatch action correctly when create thread success
 *   - should dispatch action correctly when create thread failed
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncCreateThread, createThreadActionCreator } from './action';

const fakeThreadResponse = {
  id: 'thread-1',
  title: 'Thread Title',
  body: 'Thread body',
  category: 'general',
  ownerId: 'user-1',
  createdAt: '2023-01-01T00:00:00.000Z',
};

const fakeErrorResponse = new Error('Something went wrong');

describe('asyncCreateThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
    window._alert = window.alert;
  });

  afterEach(() => {
    api.createThread = api._createThread;
    delete api._createThread;

    window.alert = window._alert;
    delete window._alert;
  });

  it('should dispatch action correctly when create thread success', async () => {
    // arrange
    api.createThread = () => Promise.resolve(fakeThreadResponse);
    const dispatch = vi.fn();

    // action
    await asyncCreateThread({
      title: 'Thread Title',
      body: 'Thread body',
      category: 'general',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      createThreadActionCreator(fakeThreadResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when create thread failed', async () => {
    // arrange
    api.createThread = () => Promise.reject(fakeErrorResponse);
    window.alert = vi.fn();
    const dispatch = vi.fn();

    // action
    await asyncCreateThread({
      title: 'Thread Title',
      body: 'Thread body',
      category: 'general',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
