import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

const LoginInput = ({ onLogin }) => {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={onEmailChange}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-200"
      >
        Login
      </button>
    </form>
  );
};

LoginInput.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginInput;
