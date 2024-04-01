import React from 'react';
import Slider from "react-slick";
import './ImgView.css'

const ImgView = ({ data, setSelectImage, selectImage }) => {
    const settings = {
        dots: true, // 슬라이더 하단의 점 표시
        infinite: false, // 사진이 끝나면 뒤에 반복할것인가
        speed: 500, 
        slidesToShow: 21,
        slidesToScroll: 1,
        arrows : true, // 화살표 유무
        autoplay : true, 
    };

    return (
        <div className="ImgView">
            <Slider {...settings}>
                {data.map((it, index) => (
                    <div key={index} onClick={() => setSelectImage(it)}
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
