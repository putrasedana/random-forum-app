import PropTypes from 'prop-types';
import { FaComment, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postedAt, renderBody } from '../utils';
import {
  asyncDownVoteThread,
  asyncNeutralizeThreadVote,
  asyncUpVoteThread,
} from '../states/votes/action';
import VotesBtn from './VotesBtn';

const ThreadItem = ({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  totalComments,
}) => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  const MAX_BODY_LENGTH = 260;

  const trimmedBody =
    body.length > MAX_BODY_LENGTH
      ? `${body.substring(0, MAX_BODY_LENGTH)}...`
      : body;

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
    <div className="border-b border-gray-300 py-3 space-y-2">
      <div className="space-y-2 sm:space-y-3">
        <span className="border px-2 rounded-md text-xs sm:text-sm py-1 border-gray-500">
          <span>#</span>
          {category}
        </span>
        <h4 className="text-lg sm:text-xl font-semibold text-indigo-600">
          <Link to={`/threads/${id}`}>{title}</Link>
        </h4>
      </div>

      <div className="text-sm sm:text-base">{renderBody(trimmedBody)}</div>

      <div className="flex items-center space-x-4 text-sm sm:justify-normal sm:text-base lg:text-lg">
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
          <FaComment />
          <span className="ml-1 text-sm sm:text-base">{totalComments}</span>
        </div>
        <p className="text-sm sm:text-base">{postedAt(createdAt)}</p>
        <p className="text-sm sm:text-base flex flex-col sm:flex-row sm:space-x-1">
          <span>Dibuat oleh</span>
          <span className="font-semibold">{owner.name}</span>
        </p>
      </div>
    </div>
  );
};

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
};

export default ThreadItem;
