import { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';

const Banners = ( { banners } ) => {
    const [index, setIndex] = useState(0);

    const carouselItemStyle = {
		height: '400px',
	};

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Carousel activeIndex={index} onSelect={handleSelect} data-bs-theme="dark">
                        {banners.map((image, index) => (
                        <Carousel.Item style={carouselItemStyle}>
                            <div className="banner" key={index}>
                                <img src={image.banner_image.url} alt={image.banner_image.alt} className="img-fluid d-block w-100"/>
                            </div>
                            <Carousel.Caption>
                            <h3>{image.banner_heading}</h3>
                            <p>{image.banner_sub_heading}</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        ))}
                        
                    </Carousel>
                </div>
            </div>
        </div>

        
    )
}

export default Banners;