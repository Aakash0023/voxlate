import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">Voxlate</div>
      <div className="navbar__links">
        <a href="/">Home</a>
      </div>
    </nav>
  );
}

export default Navbar;
