import { Link } from 'react-router-dom';
import { FaHome, FaTrophy, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Navigation = ({ authUser, signOut }) => {
  return (
    <nav className="flex items-center justify-evenly lg:w-[40%] lg:mx-auto  ">
      <Link to="/" className="flex flex-col items-center">
        <FaHome className="text-2xl" />
        <span className="text-sm mt-1">Threads</span>
      </Link>
      <Link to="/leaderboards" className="flex flex-col items-center">
        <FaTrophy className="text-2xl" />
        <span className="text-sm mt-1">Leaderboards</span>
      </Link>

      {authUser ? (
        <button
          type="button"
          onClick={signOut}
          className="flex flex-col items-center"
        >
          <FaSignOutAlt className="text-2xl" />
          <span className="text-sm mt-1">Logout</span>
        </button>
      ) : (
        <Link to="/login" className="flex flex-col items-center">
          <FaSignInAlt className="text-2xl" />
          <span className="text-sm mt-1">Login</span>
        </Link>
      )}
    </nav>
  );
};

Navigation.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
