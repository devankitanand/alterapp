
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './screens/login/Login';
import Home from './screens/home/Home';
import Myprofile from './screens/myprofile/Myprofile';
import EditProfile from './screens/editprofile/EditProfile';
import Createpost from './screens/createpost/Createpost';
import ProtectedRoute from './ProtectedRoute'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Myprofile /></ProtectedRoute>} />
      <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
      <Route path="/createpost" element={<ProtectedRoute><Createpost /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
