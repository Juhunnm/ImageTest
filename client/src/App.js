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
    // 선택된 이미지의 로그 정보를 가져옵니다.
    axios.get(`http://localhost:8800/imglog/${selectImage.cid}`)
      .then(res => {
        setLogs(res.data); // 응답을 logs 상태에 저장합니다.
      })
      .catch((err) => console.log(err));
  }
}, [selectImage])

  
  if (data.length === 0) {
    return <div>데이터를 불러오는 중이거나 데이터가 없습니다.</div>;
  }
  return (
    <ImageContext.Provider value={{ data, setData, selectImage, setSelectImage, selectLog, setSelectLog,fetchData}}>
      <div className="App">
        <Header />
        <div className="flexContainer">
          <div className="leftSidebar">왼쪽</div>

          <div className="mainContent">
            <RoutPage />
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
