import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { postedAt, renderBody } from '../utils';
import {
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeCommentVote,
} from '../states/votes/action';
import VotesBtn from './VotesBtn';

const CommentItem = ({ comment, threadId }) => {
  const { owner, createdAt, content, upVotesBy, downVotesBy, id } = comment;
  const { avatar, name } = owner;
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  const hasUpVoted = authUser ? upVotesBy.includes(authUser.id) : false;
  const hasDownVoted = authUser ? downVotesBy.includes(authUser.id) : false;

  const handleUpVote = () => {
    if (!authUser) {
      alert('You need to log in first to vote.');
      return;
    }
    if (hasUpVoted) {
      dispatch(asyncNeutralizeCommentVote(threadId, id));
    } else {
      dispatch(asyncUpVoteComment(threadId, id));
    }
  };

  const handleDownVote = () => {
    if (!authUser) {
      alert('You need to log in first to vote.');
      return;
    }
    if (hasDownVoted) {
      dispatch(asyncNeutralizeCommentVote(threadId, id));
    } else {
      dispatch(asyncDownVoteComment(threadId, id));
    }
  };

  return (
    <div className="border-b border-gray-300 py-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className="w-5 h-5 rounded-full"
          />
          <span className="font-semibold ml-1">{name}</span>
        </div>
        <p>{postedAt(createdAt)}</p>
      </div>

      <div>{renderBody(content)}</div>

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
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  threadId: PropTypes.string.isRequired,
};

export default CommentItem;
