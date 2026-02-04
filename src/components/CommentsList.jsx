import { useSelector } from 'react-redux';
import CommentItem from './CommentItem';

const CommentsList = () => {
  const threadDetail = useSelector((state) => state.threadDetail);
  const { comments, id } = threadDetail;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">
        Komentar ({comments.length})
      </h3>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} threadId={id} />
      ))}
    </div>
  );
};

export default CommentsList;
