// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import './ImgLog.css';
// const ImgLog = ({ selectImage }) => {
//   console.log('selectimage');
//   console.log(selectImage);

//   const [data, setData] = useState([]);

//   console.log(data);
//   // console.log(data[0].)
//   useEffect(() => {
//     axios.get("http://localhost:8800/imglog",)
//       .then(res => {
//         console.log("log");
//         console.log(res.data);
//         setData(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, [selectImage])



//   return (
//     <div className='ImgLog-container'>
//     {data.map((it, index) => (
//       <div key={index} className='ImgLog-table'>
//         <div>
//           <span>prev_value</span>
//           <input type='text' name='prev_value' defaultValue={it.prev_value} />
//         </div>
//         <div>
//           <span>new_value</span>
//           <input type='text' name='new_value' defaultValue={it.new_value} />
//         </div>
//         <div>
//           <span>edit_time</span>
//           <input type='text' name='edit_time' defaultValue={it.edit_time} />
//         </div>
//       </div>
//     ))}
//   </div>
  
//   )
// }

// export default ImgLog
