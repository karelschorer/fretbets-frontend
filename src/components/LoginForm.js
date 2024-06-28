import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearLoginStatus } from '../features/auth/authSlice';
import { isAuthenticated } from '../utils/authUtils';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/profile');
    }
  }, [navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearLoginStatus());
    };
  }, [dispatch]);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Email is invalid';
        }
        break;
      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters long';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setTouched(prevTouched => ({ ...prevTouched, [name]: true }));
  };

  useEffect(() => {
    const validationErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        validationErrors[key] = error;
      }
    });
    setErrors(validationErrors);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        validationErrors[key] = error;
      }
    });
    
    if (Object.keys(validationErrors).length === 0) {
      try {
        const resultAction = await dispatch(loginUser({
          email: formData.email,
          password: formData.password,
        })).unwrap();

        // Store the token in local storage
        localStorage.setItem('token', resultAction.access_token);

        navigate('/profile');
      } catch (err) {
        // Error is now handled by the Redux state, no need to set it here
        console.error('Login failed:', err);
      }
    } else {
      setErrors(validationErrors);
      setTouched({
        email: true,
        password: true
      });
    }
  };

  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/profile');
    }
  }, [status, navigate]);

  const inputClass = (fieldName) => `
    mt-1 block w-full px-3 py-2 border rounded-md shadow-sm 
    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
    ${touched[fieldName] && errors[fieldName] ? 'border-red-500' : 'border-gray-300'}
  `;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Log in to your account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClass('email')}
            value={formData.email}
            onChange={handleChange}
          />
          {touched.email && errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={inputClass('password')}
            value={formData.password}
            onChange={handleChange}
          />
          {touched.password && errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
        </div>
        {error && (
          <p className="text-red-600 text-sm text-center">
            Error: {error}
          </p>
        )}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Logging in...' : 'Log in'}
          </button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
