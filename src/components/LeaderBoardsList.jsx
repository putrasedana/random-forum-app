import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import LeaderBoardItem from './LeaderBoardItem';
import { asyncFetchLeaderboards } from '../states/leaderboards/action';

const LeaderBoardsList = ({ authUser }) => {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncFetchLeaderboards());
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-between mb-3">
        <p className="text-lg">Pengguna</p>
        <p className="text-lg">Skor</p>
      </div>
      <div className="space-y-2">
        {leaderboards.map(({ user, score }) => (
          <LeaderBoardItem
            key={user.id}
            user={user}
            score={score}
            authUser={authUser}
          />
        ))}
      </div>
    </>
  );
};

LeaderBoardsList.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default LeaderBoardsList;
