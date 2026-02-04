import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DetailThreadPage from './pages/DetailThreadPage';
import Navigation from './components/Navigation';
import LeaderBoardsPage from './pages/LeaderBoardsPage';
import AddThreadPage from './pages/AddThreadPage';
import NotFoundPage from './pages/NotFoundPage';
import Loading from './components/Loading';

const App = () => {
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, []);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 h-full w-full">
      <header className="bg-indigo-600 text-white px-6 py-4 ">
        <h1 className="text-3xl">Random Forum App</h1>
      </header>

      <Loading />

      <main className="w-full min-h-screen mx-auto p-6 sm:p-8 md:p-10 mb-24 sm:mb-2 lg:w-[75%] xl:w-[55%] bg-white text-slate-700">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<AddThreadPage />} />
          <Route path="/threads/:threadId" element={<DetailThreadPage />} />
          <Route path="/leaderboards" element={<LeaderBoardsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="fixed bottom-0 w-full border-t border-gray-300 p-2 bg-white">
        <Navigation authUser={authUser} signOut={onSignOut} />
      </footer>
    </div>
  );
};

export default App;
