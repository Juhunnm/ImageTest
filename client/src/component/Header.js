import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
function Header() {
  return (
    <div className="header">
      <h1>Image WebTest</h1>
      <Link className='header-link' to="/">메인</Link>
      <Link className='header-link' to="/upload">사진 업로드</Link>
    </div>
  );
}

export default Header;
