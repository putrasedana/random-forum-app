/**
 * test scenario for threadDetailReducer
 *
 * - threadDetailReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the thread detail when given by RECEIVE_THREAD_DETAIL action
 *  - should return null when given by CLEAR_THREAD_DETAIL action
 *  - should return the thread detail with up-voted thread when given by UP_VOTE_THREAD action
 *  - should return the thread detail with down-voted thread when given by DOWN_VOTE_THREAD action
 *  - should return the thread detail with neutralized vote when given by NEUTRALIZE_THREAD action
 *  - should return the thread detail with the new comment when given by CREATE_COMMENT action
 *  - should return the thread detail with up-voted comment when given by UP_VOTE_COMMENT action
 *  - should return the thread detail with down-voted comment when given by DOWN_VOTE_COMMENT action
 *  - should return the thread detail with neutralized comment when given by NEUTRALIZE_COMMENT action
 *
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer function', () => {
  const threadDetail = {
    id: 'thread-1',
    title: 'Thread Test',
    body: 'Thread body',
    upVotesBy: [],
    downVotesBy: [],
    comments: [
      {
        id: 'comment-1',
        content: 'Comment Test',
        upVotesBy: [],
        downVotesBy: [],
      },
    ],
  };

  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the thread detail when given by RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail,
      },
    };

    // action
    const nextState = threadDetailReducer(null, action);

    // assert
    expect(nextState).toEqual(threadDetail);
  });

  it('should return null when given by CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const action = {
      type: ActionType.CLEAR_THREAD_DETAIL,
    };

    // action
    const nextState = threadDetailReducer(threadDetail, action);

    // assert
    expect(nextState).toEqual(null);
  });

  it('should return the thread detail with up-voted thread when given by UP_VOTE_THREAD action', () => {
    // arrange
    const action = {
      type: ActionType.UP_VOTE_THREAD,
      payload: {
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadDetailReducer(threadDetail, action);

    // assert
    expect(nextState.upVotesBy).toEqual(['user-1']);
    expect(nextState.downVotesBy).toEqual([]);
  });

  it('should return the thread detail with down-voted thread when given by DOWN_VOTE_THREAD action', () => {
    // arrange
    const action = {
      type: ActionType.DOWN_VOTE_THREAD,
      payload: {
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadDetailReducer(threadDetail, action);

    // assert
    expect(nextState.downVotesBy).toEqual(['user-1']);
    expect(nextState.upVotesBy).toEqual([]);
  });

  it('should return the thread detail with neutralized vote when given by NEUTRALIZE_THREAD action', () => {
    // arrange
    const votedState = {
      ...threadDetail,
      upVotesBy: ['user-1'],
      downVotesBy: [],
    };

    const action = {
      type: ActionType.NEUTRALIZE_THREAD,
      payload: {
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadDetailReducer(votedState, action);

    // assert
    expect(nextState.upVotesBy).toEqual([]);
    expect(nextState.downVotesBy).toEqual([]);
  });

  it('should return the thread detail with the new comment when given by CREATE_COMMENT action', () => {
    // arrange
    const action = {
      type: ActionType.CREATE_COMMENT,
      payload: {
        comment: {
          id: 'comment-2',
          content: 'New Comment',
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    // action
    const nextState = threadDetailReducer(threadDetail, action);

    // assert
    expect(nextState.comments[0].id).toBe('comment-2');
  });

  it('should return the thread detail with up-voted comment when given by UP_VOTE_COMMENT action', () => {
    // arrange
    const action = {
      type: ActionType.UP_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadDetailReducer(threadDetail, action);

    // assert
    expect(nextState.comments[0].upVotesBy).toEqual(['user-1']);
    expect(nextState.comments[0].downVotesBy).toEqual([]);
  });

  it('should return the thread detail with down-voted comment when given by DOWN_VOTE_COMMENT action', () => {
    // arrange
    const action = {
      type: ActionType.DOWN_VOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadDetailReducer(threadDetail, action);

    // assert
    expect(nextState.comments[0].downVotesBy).toEqual(['user-1']);
    expect(nextState.comments[0].upVotesBy).toEqual([]);
  });

  it('should return the thread detail with neutralized comment when given by NEUTRALIZE_COMMENT action', () => {
    // arrange
    const votedCommentState = {
      ...threadDetail,
      comments: [
        {
          ...threadDetail.comments[0],
          upVotesBy: ['user-1'],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: ActionType.NEUTRALIZE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'user-1',
      },
    };

    // action
    const nextState = threadDetailReducer(votedCommentState, action);

    // assert
    expect(nextState.comments[0].upVotesBy).toEqual([]);
    expect(nextState.comments[0].downVotesBy).toEqual([]);
  });
});
