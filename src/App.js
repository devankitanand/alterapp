import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './screens/login/Login';
import Home from './screens/home/Home';
import Myprofile from './screens/myprofile/Myprofile';
import EditProfile from './screens/editprofile/EditProfile';
// import Profile from './screens/profile/Profile';
// import EditProfile from './screens/profile/EditProfile';
// import CreatePost from './screens/posts/CreatePost';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Myprofile />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      {/* <Route path="/create-post" element={<CreatePost />} /> */}
    </Routes>
  );
}

export default App;
