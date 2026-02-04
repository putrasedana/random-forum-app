import PropTypes from 'prop-types';

const LeaderBoardItem = ({ user, score, authUser }) => {
  return (
    <div className="flex justify-between items-center py-1">
      <div className="flex items-center space-x-2">
        <img
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
        />
        <p className="text-base sm:text-xl font-semibold">
          {authUser.id === user.id ? (
            <>
              {user.name} <span className="italic font-normal">(Anda)</span>
            </>
          ) : (
            user.name
          )}
        </p>
      </div>
      <p className="text-xl sm:text-2xl font-semibold">{score}</p>{' '}
    </div>
  );
};

LeaderBoardItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default LeaderBoardItem;
