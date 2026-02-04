import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogin = async ({ email, password }) => {
    try {
      await dispatch(asyncSetAuthUser({ email, password }));
      navigate('/');
    } catch (error) {
      console.log('Login failed, staying on login page');
    }
  };

  return (
    <div className="w-full py-8 space-y-4 bg-white">
      <h2 className="text-2xl font-semibold text-center">Login</h2>
      <LoginInput onLogin={onLogin} />
      <p>
        Belum punya akun?
        <Link to="/register" className="underline mx-1">
          Daftar di sini
        </Link>
      </p>
    </div>
  );
};
export default LoginPage;
