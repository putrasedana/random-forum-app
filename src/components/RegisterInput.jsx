import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

const RegisterInput = ({ onRegister }) => {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          placeholder="Name"
          id="name"
          value={name}
          onChange={onNameChange}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          id="email"
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
          placeholder="Password"
          id="password"
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
        Register
      </button>
    </form>
  );
};

RegisterInput.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default RegisterInput;
