import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './screens/login/Login';
import Home from './screens/home/Home';
import Myprofile from './screens/myprofile/Myprofile';
import EditProfile from './screens/editprofile/EditProfile';
import Createpost from './screens/createpost/Createpost';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Myprofile />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/createpost" element={<Createpost />} />
    </Routes>
  );
}

export default App;
