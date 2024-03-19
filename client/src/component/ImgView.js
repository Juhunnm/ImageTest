import React from 'react';
import Slider from "react-slick";

const ImgView = ({ data, setSelectImage }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    };

    return (
        <div className="ImgView">
            <Slider {...settings}>
                {data.map((it, index) => (
                    <div key={index} onClick={() => setSelectImage(it)}>
                        <img src={`http://localhost:8800/images/${it.fname}`} alt='' />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default ImgView;
