import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import Categories from '../components/Categories';
import ThreadsList from '../components/ThreadsList';
import asyncPopulateUsersAndThreads from '../states/shared/action';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();

  const authUser = useSelector((state) => state.authUser);
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
  }));

  const categories = [...new Set(threads.map((thread) => thread.category))];

  const filteredThreads = selectedCategory
    ? threadList.filter((thread) => thread.category === selectedCategory)
    : threadList;

  const handleCategoryClick = (category) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? '' : category,
    );
  };

  return (
    <div className="sm:mb-20">
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
      />
      <ThreadsList threads={filteredThreads} />
      {authUser && (
        <Link
          to="/new"
          className="fixed bottom-20 right-8 sm:bottom-24 sm:right-16 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-500"
        >
          <FiPlus size={24} />
        </Link>
      )}
    </div>
  );
};

export default HomePage;
