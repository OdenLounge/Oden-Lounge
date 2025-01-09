import { useState } from 'react';
import PropTypes from 'prop-types';

function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Hardcoded credentials
  const ADMIN_CREDENTIALS = {
    username: 'oden',
    password: '@odenlounge3',
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Check credentials
    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">Admin Login</h2>
        {error && <p className="text-center text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

// PropTypes validation
AdminLogin.propTypes = {
  onLogin: PropTypes.func.isRequired, // Ensures onLogin is a required function
};

export default AdminLogin;
