
import Slideshow from "./slideshow/slideshow.jsx";
import PopularItem from "./popular-items/popularItem.jsx";
import './Home.css'
import { useEffect } from "react";
// import IMG1D36OFE9MK0FW0X5 from '../../assets/product/1D36OFE9MK0FW0X5.jpg'
// import IMG8IXY4B8S3GU73WIO from '../../assets/product/8IXY4B8S3GU73WIO.jpg'
// import IMG41T81V4BZZQH0FOY from '../../assets/product/41T81V4BZZQH0FOY.jpg'
// import IMGA98DB973KWL8XP1L from '../../assets/product/A98DB973KWL8XP1L.jpg'
// import IMGVJKZIMV2HQH8R65P from '../../assets/product/VJKZIMV2HQH8R65P.jpg'

function Home() {

useEffect(()=> {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}, [])

    // const slides = [
    //     IMG1D36OFE9MK0FW0X5,
    //     IMG8IXY4B8S3GU73WIO,
    //     IMG41T81V4BZZQH0FOY,
    //     IMGA98DB973KWL8XP1L,
    //     IMGVJKZIMV2HQH8R65P
    // ];

    return (
        <>
            <div className="body-slideshow-container">
                <Slideshow />
            </div>
            <PopularItem />
        </>
    );
}

export default Home;