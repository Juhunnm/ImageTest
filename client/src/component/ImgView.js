import React from 'react';
import Slider from "react-slick";
import axios from 'axios';
import './ImgView.css'

const ImgView = ({ data, setSelectImage, selectImage }) => {
    const settings = {
        dots: true, // 슬라이더 하단의 점 표시
        infinite: false, // 사진이 끝나면 뒤에 반복할것인가
        speed: 500, 
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows : true, // 화살표 유무
        autoplay : true, 
    };
    
    const handleSelectImage = (image) =>{
        axios.get(`http://localhost:8800/img/${image.cid}`)
        .then((res)=>{
            // const imageData = res.data ? res.data : {image};
            // setSelectImage(imageData);
            setSelectImage(image);
            console.log('상세 정보 : ',res.data);
        })
        .catch((err)=>console.log(err));
    }
    return (
        <div className="ImgView">
            <Slider {...settings}>
                {data.map((it, index) => (
                    <div key={index} onClick={()=> handleSelectImage(it)}
                        className={`ImgView-container ${selectImage && selectImage.fname === it.fname ? 'on' : "off"}`}
                    >
                        <img src={`http://localhost:8800/images/${it.fname}`} alt='' />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ImgView;
