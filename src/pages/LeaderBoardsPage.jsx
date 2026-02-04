import { useSelector } from 'react-redux';
import LeaderBoardsList from '../components/LeaderBoardsList';

const LeaderBoardsPage = () => {
  const authUser = useSelector((state) => state.authUser);

  if (!authUser) {
    return (
      <div className="flex flex-col space-y-3 justify-center items-center mt-24">
        <h2 className="text-3xl font-bold text-gray-700">Login First!</h2>
        <p className="text-lg font-semibold text-center">
          Please log in to view leaderboards.
        </p>
      </div>
    );
  }

  return (
    <div className="sm:mb-20">
      <h2 className="text-2xl font-semibold mb-3">Klasmen Pengguna Aktif</h2>
      <LeaderBoardsList authUser={authUser} />
    </div>
  );
};
export default LeaderBoardsPage;
