import React, { useEffect, useState } from 'react'
import ImgView from '../component/ImgView'
import axios from 'axios';
import ImgInfo from '../component/ImgInfo';
import ImgLog from '../component/ImgLog';

const Home = () => {
  const [data, setData] = useState([]);
  const [selectImage, setSelectImage] = useState(null);
  const [selectLog,setSelectLog] = useState(false)

  // 데이터 가져오는곳
  useEffect(() => {
    axios.get('http://localhost:8800/')
      .then((res) => {
        console.log(res.data);
        setData(res.data)
      })
      .catch((err) => console.log(err));
  }, [])

  if (data.length === 0) {
    return <div>데이터를 불러오는 중이거나 데이터가 없습니다.</div>;
  }

  return (
    <div >
      <ImgView data={data} setSelectImage={setSelectImage} selectImage={selectImage}/>
      {selectImage &&
        <ImgInfo selectImage={selectImage} selectLog={selectLog} setSelectLog={setSelectLog}/>}
      {selectLog && <ImgLog selectImage={selectImage}/>}
    </div>
  );
}


export default Home

