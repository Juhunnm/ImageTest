import axios from 'axios';
import React, { useEffect } from 'react'

const ImgLog = ({selectImage}) => {
  console.log('selectimage');
  console.log(selectImage);
  useEffect(()=>{
    axios.get("http://localhost:8800")
  })
  return (
    <div>
      로그 정보
    </div>
  )
}

export default ImgLog
