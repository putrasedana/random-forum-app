import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  ADD_THREAD: 'ADD_THREAD',
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  CREATE_THREAD: 'CREATE_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRALIZE_THREAD: 'NEUTRALIZE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function createThreadActionCreator(thread) {
  return {
    type: ActionType.CREATE_THREAD,
    payload: {
      thread,
    },
  };
}

function asyncCreateThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await api.createThread({ title, body, category });
      dispatch(createThreadActionCreator(response));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  createThreadActionCreator,
  asyncCreateThread,
};
