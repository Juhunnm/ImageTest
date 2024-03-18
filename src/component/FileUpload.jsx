import React, { useEffect, useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState({ fname: '', label: '', isedit: false });
  const [label, setLabel] = useState('');

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8800/")
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpload = () => {
    if (!file) {
      alert("파일을 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("label", label);
    formData.append("filename", file.name); // Use uploaded file name if filename field is empty

    axios
      .post("http://localhost:8800/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Success");
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
    <div className="container">
      <input type="file" onChange={handleFile} />
      <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label" />
      <button onClick={handleUpload}>Upload</button>
      {/* <img src={`http://localhost:8800/images/${data.fname}`} alt="" /> */}
    </div>
  );
};

export default FileUpload;
