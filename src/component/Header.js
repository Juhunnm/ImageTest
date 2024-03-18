import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="header">
      <h1>Image WebTest</h1>
      <button
        style={{
          cursor: "pointer",
          border: "none",
          borderRadius: "5px",
          marginBottom: "10px",
          padding: "20px",
          // flex: "display",
          // flexDirection : "column",
          // alignContent: "start",
          // justifyContent: "end"

        }}
        onClick={() => {
          alert("데이터 베이스 저장 완료");
        }}
      >데이터 베이스 업로드</button>
      <Link to="/upload">사진 업로드</Link>
    </div>
  );
}

export default Header;
