import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './ImgInfo.css';

const ImgInfo = ({ selectImage }) => {
    const [data, setData] = useState({
        cid : "",
        label: "",
        fname: "",
        isedit: false,
    });
    const [prevValue, setPrevValue] = useState("");
    const [editTime, setEditTime] = useState("");

    useEffect(() => {
        setData({
            cid  : selectImage.cid,
            label: selectImage.label,
            fname: selectImage.fname,
            isedit: selectImage.isedit,
        });
        setPrevValue(selectImage.label); 
    }, [selectImage]);

    const handleUpdate = () => {

        const updateTime = new Date().toISOString().replace('Z', '').split('.')[0];
        setEditTime(updateTime);

        axios.post('http://localhost:8800/update', {
            ...data,
            isedit: true,
            prev_value: prevValue,
            new_value: data.label, 
            edit_time: updateTime,
        })
        .then(res => {
            console.log(res.data);
            setPrevValue(data.label);
            alert("편집 완료");
        })
        .catch(error => {
            console.error('UpdateError:', error);
        });

    };

    return (
        <div className="container">
            <span>Label</span>
            <input
                type="text"
                value={data.label}
                onChange={e => setData({ ...data, label: e.target.value })}
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
};

export default ImgInfo;
