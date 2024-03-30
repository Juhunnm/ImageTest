import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ImgInfo.css';

const ImgInfo = ({ selectImage, setSelectLog,selectLog }) => {
    const [data, setData] = useState({
        cid: "",
        label: "",
        fname: "",
        isedit: false,
    });
    const [prevValue, setPrevValue] = useState("");
    const [editTime, setEditTime] = useState("");

    useEffect(() => {
        setData({
            cid: selectImage.cid,
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

    const handleLog = () => {
        console.log("test")
        setSelectLog(!selectLog)
    }

    return (
        <div className="ImgInfo-container">
            <div className='ImgInfo-box'>
                <span>Label</span>
                <input
                    type="text"
                    value={data.label}
                    onChange={e => setData({ ...data, label: e.target.value })}
                    placeholder="info"
                />
            </div>

            <div className='ImgInfo-box'>
                <span>FileName</span>
                <input
                    type="text"
                    value={data.fname}
                    readOnly
                />
            </div>
            <button onClick={handleUpdate}>편집</button>
            {Boolean(data.isedit) && <button onClick={handleLog}>수정 내역</button>}
        </div>
    );
};

export default ImgInfo;
