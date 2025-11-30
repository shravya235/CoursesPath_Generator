import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc'; // Ensure you have installed: npm install react-icons

const GoogleAuthButton = ({ onSuccess, onError, text = "Continue with Google" }) => {
  
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => onSuccess(tokenResponse),
    onError: (error) => onError(error),
    // We use the default implicit flow to get the access_token
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 font-extrabold uppercase text-lg py-3 px-6 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(0,0,0,0.2)] hover:bg-gray-50 mb-6"
    >
      <FcGoogle size={28} />
      <span>{text}</span>
    </button>
  );
};

export default GoogleAuthButton;