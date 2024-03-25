import React from 'react';
import Slider from "react-slick";
import './ImgView.css'

const ImgView = ({ data, setSelectImage,selectImage }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };
    
    return (
        <div className="ImgView">
            <Slider {...settings}>
                {data.map((it, index) => (
                    <div key={index} onClick={() => setSelectImage(it)}
                        className={`image-container ${selectImage &&selectImage.fname === it.fname ? 'on' : "off"}`}
                    >
                        <img src={`http://localhost:8800/images/${it.fname}`} alt='' />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ImgView;
