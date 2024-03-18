import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios import
import './ImgInfo.css'

const ImgInfo = ({ selectImage }) => {
    const [label, setLabel] = useState(selectImage.label);
    const [fname, setFname] = useState(selectImage.fname);
    const [isedit, setIsedit] = useState(selectImage.isedit);
    
    useEffect(()=>{
        setLabel(selectImage.label);
        setFname(selectImage.fname);
        setIsedit(selectImage.isedit);
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

    return (
        <div className="ImgInfo">
            <span>Label</span>
            <input
                type="text"
                value={label}
                onChange={e => setLabel(e.target.value)}
                placeholder="info"
            />
            <span>FileName</span>
            <input
                type="text"
                value={fname}
                readOnly
            />
            <span>isEdit</span>
            <input
                type="checkbox"
                checked={isedit}
                readOnly
            />
            <button onClick={handleUpdate}>편집</button>
        </div>
    );
}

export default ImgInfo;
