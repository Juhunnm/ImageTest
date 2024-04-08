import React, { useEffect, useState } from 'react'
import ImgView from '../component/ImgView'
import ImgInfo from '../component/ImgInfo';
import ImgLog from '../component/ImgLog';
// context data import
import { useImages } from '../App';

const Home = () => {
  const {data,setData,selectImage,setSelectImage,selectLog,setSelectLog,fetchData} = useImages();
  return (
    <div >
      <ImgView data={data} setSelectImage={setSelectImage} selectImage={selectImage} />
      {selectImage &&
        <ImgInfo selectImage={selectImage} selectLog={selectLog} setSelectLog={setSelectLog} fetchData={fetchData}/>}
    </div>    
  );
}


export default Home

