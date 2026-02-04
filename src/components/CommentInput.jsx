import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';
import { asyncCreateComment } from '../states/threadDetail/action';

const CommentInput = ({ threadId }) => {
  const [comment, onChange, setComment] = useInput('');
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!authUser) {
      alert('You need to log in first to submit a comment.');
      return;
    }
    dispatch(asyncCreateComment(threadId, comment));
    setComment('');
  };

  return (
    <div className="py-3">
      <h3 className="text-xl font-semibold mb-2">Beri Komentar</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={onChange}
          rows="4"
          cols="50"
          className="w-full p-2 border border-indigo-500 rounded-md"
          placeholder="Write your comment..."
          required
        />
        <button
          type="submit"
          className="mt-2 py-2 w-full bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
        >
          Kirim
        </button>
      </form>
    </div>
  );
};

CommentInput.propTypes = {
  threadId: PropTypes.string.isRequired,
};

export default CommentInput;
