import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import ImgView from '../component/ImgView'
import axios from 'axios';
import ImgInfo from '../component/ImgInfo';

const Home = () => {
  const [data, setData] = useState([]);
  const [selectImage, setSelectImage] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8800/')
      .then((res) => {
        console.log('home')
        console.log(res.data);
        setData(res.data)
      })
      .catch((err) => console.log(err));
  }, [])

  if (data.length === 0) {
    return <div>데이터를 불러오는 중이거나 데이터가 없습니다.</div>;
  }

  return (
    <div>
      <Header />
      <ImgView data={data} setSelectImage={setSelectImage} />
      {selectImage &&
        <ImgInfo selectImage={selectImage} />}
    </div>
  );
}


export default Home

