import React, { useEffect, useState } from "react";
import axios from "axios";
import './FileUpload.css';

//contextApi
import { useImages } from "../App";
const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState(new FormData());
  const [label, setLabel] = useState('');
  const {fetchData} = useImages();

  useEffect(()=>{
    const newFormData = new FormData();
    if (file) {
      newFormData.append("image", file);
      newFormData.append("filename", file.name);
    }
    newFormData.append("label", label);
    setFormData(newFormData);
  }, [file, label]);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  }

  const handleUpload = () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }
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
  
  const handleGrpc = () =>{
    axios.post("http://localhost:8800/grpc",formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res)=>{
      console.log("통신 성공");
    })
    .catch((err)=>{
      if(err) console.log("통신 실패");
    })
  }
  return (
    <div className="FileUpload-container">
      <input type="file" name="image" onChange={handleFile} />
      <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label" />
      <div>
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleGrpc}>grpc</button>
      </div>
      {/* <img src={`http://localhost:8800/images/${data.fname}`} alt="" /> */}
    </div>
  );
};

export default FileUpload;
