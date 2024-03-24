import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <h1>Image WebTest</h1>
      <Link style={{
        cursor: "pointer",
        border: "none",
        color:"#222831",
        background : "#EEEEEE",
        borderRadius: "5px",
        margin: "10",
        padding: "20px",
        textDecoration : "none",
      }} to="/upload">사진 업로드</Link>
      <Link style={{
        cursor: "pointer",
        border: "none",
        color:"#222831",
        background : "#EEEEEE",
        borderRadius: "5px",
        margin: "10",
        padding: "20px",
        textDecoration : "none",
      }} to="/">메인</Link>
    </div>
  );
}

export default Header;
