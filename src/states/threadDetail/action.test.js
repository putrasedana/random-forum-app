/**
 * test scenario for thread detail thunks
 *
 * - asyncReceiveThreadDetail thunk
 *   - should dispatch action correctly when fetch thread detail success
 *   - should dispatch action correctly when fetch thread detail failed
 *
 * - asyncCreateComment thunk
 *   - should dispatch action correctly when create comment success
 *   - should dispatch action correctly when create comment failed
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncReceiveThreadDetail,
  asyncCreateComment,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  createCommentActionCreator,
} from './action';

const fakeThreadDetailResponse = {
  id: 'thread-1',
  title: 'Thread Title',
  body: 'Thread body',
  owner: {
    id: 'user-1',
    name: 'User One',
  },
  comments: [],
};

const fakeCommentResponse = {
  id: 'comment-1',
  content: 'This is a comment',
  owner: {
    id: 'user-1',
    name: 'User One',
  },
};

const fakeErrorResponse = new Error('Something went wrong');

describe('thread detail thunks', () => {
  beforeEach(() => {
    api._getDetailThread = api.getDetailThread;
    api._createComment = api.createComment;
    window._alert = window.alert;
  });

  afterEach(() => {
    api.getDetailThread = api._getDetailThread;
    api.createComment = api._createComment;
    delete api._getDetailThread;
    delete api._createComment;

    window.alert = window._alert;
    delete window._alert;
  });

  describe('asyncReceiveThreadDetail thunk', () => {
    it('should dispatch action correctly when fetch thread detail success', async () => {
      // arrange
      api.getDetailThread = () => Promise.resolve(fakeThreadDetailResponse);
      const dispatch = vi.fn();

      // action
      await asyncReceiveThreadDetail('thread-1')(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
      expect(dispatch).toHaveBeenCalledWith(
        receiveThreadDetailActionCreator(fakeThreadDetailResponse),
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action correctly when fetch thread detail failed', async () => {
      // arrange
      api.getDetailThread = () => Promise.reject(fakeErrorResponse);
      window.alert = vi.fn();
      const dispatch = vi.fn();

      // action
      await asyncReceiveThreadDetail('thread-1')(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe('asyncCreateComment thunk', () => {
    it('should dispatch action correctly when create comment success', async () => {
      // arrange
      api.createComment = () => Promise.resolve(fakeCommentResponse);
      const dispatch = vi.fn();

      // action
      await asyncCreateComment('thread-1', 'This is a comment')(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        createCommentActionCreator(fakeCommentResponse),
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch action correctly when create comment failed', async () => {
      // arrange
      api.createComment = () => Promise.reject(fakeErrorResponse);
      window.alert = vi.fn();
      const dispatch = vi.fn();

      // action
      await asyncCreateComment('thread-1', 'This is a comment')(dispatch);

      // assert
      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
