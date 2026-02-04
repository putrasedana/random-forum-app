import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const VotesActionType = {
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRALIZE_COMMENT: 'NEUTRALIZE_COMMENT',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRALIZE_THREAD: 'NEUTRALIZE_THREAD',
};

function upVoteThreadActionCreator(threadId, userId) {
  return {
    type: VotesActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator(threadId, userId) {
  return {
    type: VotesActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralizeThreadVoteActionCreator(threadId, userId) {
  return {
    type: VotesActionType.NEUTRALIZE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function upVoteCommentActionCreator(commentId, userId) {
  return {
    type: VotesActionType.UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator(commentId, userId) {
  return {
    type: VotesActionType.DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralizeCommentVoteActionCreator(commentId, userId) {
  return {
    type: VotesActionType.NEUTRALIZE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    try {
      const { authUser } = getState();
      await api.upVoteThread(threadId);
      dispatch(upVoteThreadActionCreator(threadId, authUser.id));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    try {
      const { authUser } = getState();
      await api.downVoteThread(threadId);
      dispatch(downVoteThreadActionCreator(threadId, authUser.id));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralizeThreadVote(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    try {
      const { authUser } = getState();
      await api.neutralVoteThread(threadId);
      dispatch(neutralizeThreadVoteActionCreator(threadId, authUser.id));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    try {
      const { authUser } = getState();
      await api.upVoteComment(threadId, commentId);
      dispatch(upVoteCommentActionCreator(commentId, authUser.id));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDownVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    try {
      const { authUser } = getState();
      await api.downVoteComment(threadId, commentId);
      dispatch(downVoteCommentActionCreator(commentId, authUser.id));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralizeCommentVote(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    try {
      const { authUser } = getState();
      await api.neutralVoteComment(threadId, commentId);
      dispatch(neutralizeCommentVoteActionCreator(commentId, authUser.id));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  VotesActionType,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralizeThreadVoteActionCreator,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeThreadVote,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralizeCommentVoteActionCreator,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeCommentVote,
};
