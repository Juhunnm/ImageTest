import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './page/Home'
import FileUpload from './page/Upload'

const RoutPage = () => {
  return (
    <div style={{
      width : '960px',
      margin:'0 auto'}}
  >
      <Routes>
        {/* 메인 페이지 */}
        <Route path="/" element={<Home />} />
        {/* 업로드 페이지 */}
        <Route path='/upload' element={<FileUpload />} />
      </Routes>
    </div>
  )
}

export default RoutPage
