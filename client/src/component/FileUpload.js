import React, { useEffect, useState } from "react";
import axios from "axios";
import './FileUpload.css';

//contextApi
import { useImages } from "../App";
const FileUpload = () => {
  const [file, setFile] = useState(null);
  // const [data, setData] = useState({ fname: '', label: '', isedit: false });
  const [label, setLabel] = useState('');
  const {fetchData} = useImages();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  }

  const handleUpload = () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("label", label);
    formData.append("filename", file.name); 

    axios
      .post("http://localhost:8800/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          alert("이미지 업로드 성공");
          fetchData();
        } else {
          console.log("Failed");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("업로드 실패.");
      });
  };

  return (
    <div className="FileUpload-container">
      <input type="file" onChange={handleFile} />
      <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label" />
      <button onClick={handleUpload}>Upload</button>
      {/* <img src={`http://localhost:8800/images/${data.fname}`} alt="" /> */}
    </div>
  );
};

export default FileUpload;
