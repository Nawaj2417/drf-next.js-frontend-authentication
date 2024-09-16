"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('token'); // Access token
    
  
      // Check if tokens are available
      if (!accessToken ) {
        alert('Tokens not found. Please log in again.');
        return;
      }
  
      const response = await fetch('http://localhost:8000/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${accessToken}`, // Include access token
        },
        body: JSON.stringify({ refresh: accessToken }), // Send refresh token if required
        credentials: 'include',
      });
  
      if (response.ok) {
        localStorage.removeItem('token'); // Remove access token
        localStorage.removeItem('refreshToken'); // Remove refresh token if needed
        alert('Logged out successfully');
        router.push('/'); // Redirect to home page
      } else {
        const errorData = await response.json();
        alert(`Logout failed: ${errorData.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Profile Page</h1>
        <div className="mb-4">
          <p className="text-gray-700">Welcome, User!</p>
          {/* Add more profile details here */}
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
