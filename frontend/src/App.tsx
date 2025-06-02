import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginSignup from './components/pages/LoginSignup';
import Home from './components/pages/Home';
import Profile from './components/pages/Profile';
import Browse from './components/pages/Browse';
import Navbar from './components/pages/Navbar';
import ChangePassword from './components/pages/ChangePassword';
import CreateAuction from './components/pages/CreateAuction';
import Bid from './components/pages/Bid';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/createauction" element={<CreateAuction />} />
          <Route path="/bid" element={<Bid />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
