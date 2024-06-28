import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Layout from './components/Layout';
import RegisterForm from './components/RegisterForm';
import VerificationPending from './components/VerificationPending';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';
import useInactivityTimer from './hooks/useInactivityTimer';

function App() {

   const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  };

  useInactivityTimer(handleLogout, 1800000); // 30 minutes
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/verification-pending" element={<VerificationPending />} />
            <Route path="/profile" element={<UserProfile />} />
            {/* Add more routes as needed */}
          </Routes>
        </Layout>
      </Router>
    </Provider>

  );
}

export default App;
