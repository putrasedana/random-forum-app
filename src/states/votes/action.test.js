/**
 * test scenarios for votes thunk functions
 *
 * - asyncUpVoteThread
 * - asyncDownVoteThread
 * - asyncNeutralizeThreadVote
 * - asyncUpVoteComment
 * - asyncDownVoteComment
 * - asyncNeutralizeCommentVote
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeThreadVote,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeCommentVote,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralizeThreadVoteActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralizeCommentVoteActionCreator,
} from './action';

const fakeAuthUser = {
  id: 'user-1',
  name: 'User Test',
};

const fakeErrorResponse = new Error('Something went wrong');

const getState = () => ({
  authUser: fakeAuthUser,
});

describe('votes thunk functions', () => {
  beforeEach(() => {
    api._upVoteThread = api.upVoteThread;
    api._downVoteThread = api.downVoteThread;
    api._neutralVoteThread = api.neutralVoteThread;
    api._upVoteComment = api.upVoteComment;
    api._downVoteComment = api.downVoteComment;
    api._neutralVoteComment = api.neutralVoteComment;

    window._alert = window.alert;
  });

  afterEach(() => {
    api.upVoteThread = api._upVoteThread;
    api.downVoteThread = api._downVoteThread;
    api.neutralVoteThread = api._neutralVoteThread;
    api.upVoteComment = api._upVoteComment;
    api.downVoteComment = api._downVoteComment;
    api.neutralVoteComment = api._neutralVoteComment;

    delete api._upVoteThread;
    delete api._downVoteThread;
    delete api._neutralVoteThread;
    delete api._upVoteComment;
    delete api._downVoteComment;
    delete api._neutralVoteComment;

    window.alert = window._alert;
    delete window._alert;
  });

  it('should dispatch action correctly when asyncUpVoteThread success', async () => {
    api.upVoteThread = () => Promise.resolve();
    const dispatch = vi.fn();

    await asyncUpVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadActionCreator('thread-1', fakeAuthUser.id),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should call alert correctly when asyncUpVoteThread failed', async () => {
    api.upVoteThread = () => Promise.reject(fakeErrorResponse);
    window.alert = vi.fn();
    const dispatch = vi.fn();

    await asyncUpVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when asyncDownVoteThread success', async () => {
    api.downVoteThread = () => Promise.resolve();
    const dispatch = vi.fn();

    await asyncDownVoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      downVoteThreadActionCreator('thread-1', fakeAuthUser.id),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when asyncNeutralizeThreadVote success', async () => {
    api.neutralVoteThread = () => Promise.resolve();
    const dispatch = vi.fn();

    await asyncNeutralizeThreadVote('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      neutralizeThreadVoteActionCreator('thread-1', fakeAuthUser.id),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when asyncUpVoteComment success', async () => {
    api.upVoteComment = () => Promise.resolve();
    const dispatch = vi.fn();

    await asyncUpVoteComment('thread-1', 'comment-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      upVoteCommentActionCreator('comment-1', fakeAuthUser.id),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when asyncDownVoteComment success', async () => {
    api.downVoteComment = () => Promise.resolve();
    const dispatch = vi.fn();

    await asyncDownVoteComment('thread-1', 'comment-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      downVoteCommentActionCreator('comment-1', fakeAuthUser.id),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when asyncNeutralizeCommentVote success', async () => {
    api.neutralVoteComment = () => Promise.resolve();
    const dispatch = vi.fn();

    await asyncNeutralizeCommentVote('thread-1', 'comment-1')(
      dispatch,
      getState,
    );

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      neutralizeCommentVoteActionCreator('comment-1', fakeAuthUser.id),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
