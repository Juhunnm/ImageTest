import React, { useEffect, useState } from 'react';
import axios, { isCancel } from 'axios';
import './ImgInfo.css';

const ImgInfo = ({ selectImage, setSelectLog, selectLog }) => {
    const [data, setData] = useState({
        cid: "",
        label: "",
        fname: "",
        isedit: false,
    });
    const [prevValue, setPrevValue] = useState("");
    const [editTime, setEditTime] = useState("");
    // lable의 상태 변화
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        setData({
            cid: selectImage.cid,
            label: selectImage.label,
            fname: selectImage.fname,
            isedit: selectImage.isedit,
        });
        setPrevValue(selectImage.label);
        setIsChanged(false);
    }, [selectImage]);
    
    const handleUpdate = () => {
        if(!isChanged){
            alert("변경된 값이 없습니다")
            return;
        }
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
                setData({...data,isedit : true})// 수정내역 바로 렌더링 되도록
                setPrevValue(data.label);
                alert("편집 완료");
                setIsChanged(false);
            })
            .catch(error => {
                console.error('UpdateError:', error);
            });

    };

    const handleInputChange = (e) =>{
        setData({ ...data, label: e.target.value });
        setIsChanged(e.target.value !== prevValue && e.target.value !== selectImage.label)
    }
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
                    onChange={ handleInputChange}
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
