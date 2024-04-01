import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
function Header() {
  return (
    <div >
      <h1>Image WebTest</h1>
      <div className="header-container">
      <Link className='header-link' to="/">메인</Link>
      <Link className='header-link' to="/upload">사진 업로드</Link>
      </div>
    </div>
  );
}

export default Header;
