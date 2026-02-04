import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { VotesActionType } from '../votes/action';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  CREATE_COMMENT: 'CREATE_COMMENT',
  ...VotesActionType,
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function createCommentActionCreator(comment) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: {
      comment,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const response = await api.getDetailThread(threadId);
      dispatch(receiveThreadDetailActionCreator(response));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncCreateComment(threadId, content) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment(threadId, content);
      dispatch(createCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncCreateComment,
  createCommentActionCreator,
};
