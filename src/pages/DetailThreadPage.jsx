import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { asyncReceiveThreadDetail } from '../states/threadDetail/action';
import { postedAt, renderBody } from '../utils';
import CommentInput from '../components/CommentInput';
import CommentsList from '../components/CommentsList';
import {
  asyncDownVoteThread,
  asyncNeutralizeThreadVote,
  asyncUpVoteThread,
} from '../states/votes/action';
import VotesBtn from '../components/VotesBtn';

const DetailThreadPage = () => {
  const { threadId } = useParams();
  const dispatch = useDispatch();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);
  const [showLoading, setShowLoading] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setShowLoading(true);

    dispatch(asyncReceiveThreadDetail(threadId));

    timerRef.current = setTimeout(() => {
      setShowLoading(false);
    }, 500);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [dispatch, threadId]);

  if (showLoading || !threadDetail) {
    return (
      <div className="flex justify-center items-center mt-16">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }
  const {
    id,
    title,
    body,
    category,
    createdAt,
    owner,
    upVotesBy = [],
    downVotesBy = [],
  } = threadDetail;

  const hasUpVoted = authUser ? upVotesBy.includes(authUser.id) : false;
  const hasDownVoted = authUser ? downVotesBy.includes(authUser.id) : false;

  const handleUpVote = () => {
    if (!authUser) {
      alert('You need to log in first to vote.');
      return;
    }

    if (hasUpVoted) {
      dispatch(asyncNeutralizeThreadVote(id));
    } else {
      dispatch(asyncUpVoteThread(id));
    }
  };

  const handleDownVote = () => {
    if (!authUser) {
      alert('You need to log in first to vote.');
      return;
    }

    if (hasDownVoted) {
      dispatch(asyncNeutralizeThreadVote(id));
    } else {
      dispatch(asyncDownVoteThread(id));
    }
  };

  return (
    <div className="space-y-3 sm:mb-20">
      <div className="space-y-3">
        <button
          type="button"
          className="border px-2 rounded-lg pb-1 border-gray-500"
        >
          <p className="text-lg"># {category}</p>
        </button>
        <h2 className="text-3xl font-semibold">{title}</h2>
      </div>

      <div className="text-lg">{renderBody(body)}</div>

      <div className="flex items-center space-x-4">
        <VotesBtn
          handleClick={handleUpVote}
          count={upVotesBy.length}
          hasVoted={hasUpVoted}
          icon={FaThumbsUp}
          votedColor="text-indigo-600"
        />
        <VotesBtn
          handleClick={handleDownVote}
          count={downVotesBy.length}
          hasVoted={hasDownVoted}
          icon={FaThumbsDown}
          votedColor="text-red-600"
        />
        <div className="flex items-center">
          Dibuat oleh
          <img
            src={owner.avatar}
            alt={`${owner.name}'s avatar`}
            className="w-5 h-5 rounded-full ml-1"
          />
          <span className="font-semibold ml-1">{owner.name}</span>
        </div>
        <p>{postedAt(createdAt)}</p>
      </div>

      <CommentInput threadId={id} />

      <CommentsList />
    </div>
  );
};

export default DetailThreadPage;
