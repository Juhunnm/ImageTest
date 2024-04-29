import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
// css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';

import Header from './component/Header';
import RoutPage from './RoutePage';
import ImgLog from './component/ImgLog';

// contextApi 사용
const ImageContext = createContext();
export const useImages = () => useContext(ImageContext);

function App() {
  // image TABLE 데이터 저장
  const [data, setData] = useState([]);
  const [selectImage, setSelectImage] = useState(null);
  // 
  const [selectLog, setSelectLog] = useState(false)
  const [logs, setLogs] = useState([]); 
  //grpc reverse data
  const [reverse,setReverse] = useState("");

  const fetchData = () => {
    axios.get('http://localhost:8800/')
      .then((res) => {
        console.log(res.data);
        setData(res.data)
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    fetchData();
    setSelectImage(null); // 이미지 선택 상태를 초기화
  }, [])

// ImageLog 관련
useEffect(() => {
  if (selectImage) {
    setLogs([]); // Clear previous logs
    // Fetch new logs for the selected image
    axios.get(`http://localhost:8800/imglog/${selectImage.cid}`)
      .then(res => {
        setLogs(res.data); // Set new logs
      })
      .catch((err) => console.log(err));
  } else {
    // Optionally, clear logs if there is no selected image
    setLogs([]);
  }
}, [selectImage]);

const handleText = (e) =>{
  setReverse(e.target.value);
}
const handleReverse =() =>{
  axios.post(`http://localhost:8800/reverse`,{value : reverse})
  .then((res)=>{
    console.log("Reverse Data Confirm");
  })
  .catch((err)=>{
    console.log(err);
  })
}
  if (data.length === 0) {
    return <div>데이터를 불러오는 중이거나 데이터가 없습니다.</div>;
  }
  return (
    <ImageContext.Provider value={{ data, setData, selectImage, setSelectImage, selectLog, setSelectLog,fetchData}}>
      <div className="App">
        <Header />
        <div className="flexContainer">
          <div className="leftSidebar">
            <input
              type='text'
              value={reverse}
              onChange={handleText}
            />
            <button onClick={handleReverse}/>
          </div>

          <div className="mainContent">
            {/* <RoutPage /> */}
          </div>
          <div className="rightContent">
          {selectImage && logs.map((log, index) => (
            <ImgLog key={index} log={log} />
          ))}
        </div>
        </div>
      </div>
    </ImageContext.Provider >
  );
}

export default App;
