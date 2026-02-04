import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

const ThreadsList = ({ threads }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mt-5 mb-2">Diskusi Tersedia</h2>
      <div>
        {threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            id={thread.id}
            title={thread.title}
            body={thread.body}
            category={thread.category}
            createdAt={thread.createdAt}
            owner={thread.user}
            upVotesBy={thread.upVotesBy}
            downVotesBy={thread.downVotesBy}
            totalComments={thread.totalComments}
          />
        ))}
      </div>
    </div>
  );
};

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        avatar: PropTypes.string,
      }),
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      totalComments: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ThreadsList;
