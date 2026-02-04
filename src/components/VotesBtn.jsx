import PropTypes from 'prop-types';

const VotesBtn = ({ handleClick, count, hasVoted, icon: Icon, votedColor }) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center ${hasVoted ? votedColor : ''}`}
    >
      <Icon />
      <span className="mx-1 text-sm">{count}</span>
    </button>
  );
};

VotesBtn.propTypes = {
  handleClick: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  hasVoted: PropTypes.bool.isRequired,
  icon: PropTypes.elementType.isRequired,
  votedColor: PropTypes.string.isRequired,
};

export default VotesBtn;
