import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios import
import './ImgInfo.css'

const ImgInfo = ({ selectImage }) => {
    const [data,setData] = useState({
        label : "",
        fname : "",
        isedit : "",
    })
    // const [label, setLabel] = useState(selectImage.label);
    // const [fname, setFname] = useState(selectImage.fname);
    // const [isedit, setIsedit] = useState(selectImage.isedit);
    const [prevValue,setPrevValue] = useState();
    const [newValue,setNewValue] = useState();
    const [editTime,setEditTime] = useState();

    useEffect(()=>{
        // setLabel(selectImage.label);
        // setFname(selectImage.fname);
        // setIsedit(selectImage.isedit);
        setData({
            label : selectImage.label,
            fname : selectImage.fname,
            isedit : selectImage.isedit,
        })
    },[selectImage])

    const handleUpdate = () => {
        axios.post('http://localhost:8800/update', { fname, label, isedit : true })
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.error('UpdateError:', error);
            });
    };
        console.log(selectImage);
    return (
        <div className="ImgInfo">
            <span>Label</span>
            <input
                type="text"
                value={data.label}
                onChange={e => setLabel(e.target.value)}
                placeholder="info"
            />
            <span>FileName</span>
            <input
                type="text"
                value={data.fname}
                readOnly
            />
            <span>isEdit</span>
            <input
                type="checkbox"
                checked={data.isedit}
                readOnly
            />
            <button onClick={handleUpdate}>편집</button>
        </div>
    );
}

export default ImgInfo;
