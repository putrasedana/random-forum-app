import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = async ({ name, email, password }) => {
    try {
      await dispatch(asyncRegisterUser({ name, email, password }));
      navigate('/login');
    } catch (error) {
      console.log('Register failed, staying on login page');
    }
  };

  return (
    <div className="w-full py-8 space-y-4 bg-white ">
      <h2 className="text-2xl font-semibold text-center">Register</h2>
      <RegisterInput onRegister={onRegister} />
      <p>
        Sudah punya akun?
        <Link to="/login" className="underline mx-1">
          Login di sini
        </Link>
      </p>
    </div>
  );
};
export default RegisterPage;
