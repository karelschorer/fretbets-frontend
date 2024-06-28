import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const VerificationPending = () => {
  const location = useLocation();
  const email = location.state?.email || 'your email';

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Verification Pending
      </h2>
      <p className="text-center text-gray-600 mb-4">
        We've sent a verification email to <strong>{email}</strong>. 
        Please check your inbox and click on the verification link to complete your registration.
      </p>
      <p className="text-center text-gray-600 mb-6">
        If you don't see the email, please check your spam folder.
      </p>
      <div className="text-center">
        <Link 
          to="/" 
          className="text-indigo-600 hover:text-indigo-500 font-medium"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default VerificationPending;