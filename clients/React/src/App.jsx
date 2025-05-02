import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList.jsx';
import UserForm from './components/UserForm.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<UserForm />} />
        <Route path="/add/:id" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
