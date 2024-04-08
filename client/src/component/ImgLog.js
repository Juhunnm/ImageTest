import React from 'react'

import './ImgLog.css';

const ImgLog = ({ log }) => {
  return (
    <div className='ImgLog-container'>
      <div className='ImgLog-table'>
        <div className='ImgLog-box'>
          <span>prev_value</span>
          <input type='text' name='prev_value' defaultValue={log.prev_value} />
        </div>
        <div className='ImgLog-box'>
          <span>new_value</span>
          <input type='text' name='new_value' defaultValue={log.new_value} />
        </div>
        <div>
          {log.edit_time}
          
        </div>
      </div>
  </div>
  );
}

export default ImgLog
