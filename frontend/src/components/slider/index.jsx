import { useState, useEffect } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

const HomePageSlider = () => {
    const images = [
        'https://dlcdnwebimgs.asus.com/gain/045A87EA-7742-4E19-831D-241AD480C9AA/fwebp',
        'https://dlcdnwebimgs.asus.com/gain/3A741DEF-79EF-4AFE-A629-162B07681B9F/fwebp',
        'https://dlcdnwebimgs.asus.com/gain/9A43E212-11DA-417A-80F9-94115EB08655/fwebp',
        'https://dlcdnwebimgs.asus.com/gain/49231ED7-2035-40DD-A31D-DDC8EE55B0CF/fwebp',
        'https://dlcdnwebimgs.asus.com/gain/045A87EA-7742-4E19-831D-241AD480C9AA/fwebp'
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 3000);

        return () => clearInterval(intervalId);
    }, [currentSlide, images.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-full slider overflow-hidden">
            {images.map((imageUrl, index) => (
                <div
                    key={index}
                    className={`absolute w-full h-full ${
                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                    } transition-opacity duration-1000 ease-in-out`}
                >
                    <img src={imageUrl} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                </div>
            ))}

            <div className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-between w-full">
                <button onClick={prevSlide} className="text-white focus:outline-none h-20 w-20">
                    <FontAwesomeIcon icon={faChevronLeft} className="text-5xl"/>
                </button>
                <button onClick={nextSlide} className="text-white focus:outline-none h-20 w-20">
                    <FontAwesomeIcon icon={faChevronRight} className="text-5xl"/>
                </button>
            </div>

            <div className="absolute bottom-0 left-1/2 -translate-y-3/4 -translate-x-1/2">
                <div className="flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-4 h-4 rounded-full bg-white ${index === currentSlide ? 'opacity-100' : 'opacity-50'}`}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePageSlider;
