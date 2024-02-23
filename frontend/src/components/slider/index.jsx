import { useState } from 'react';

const AnimationCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(2); // Set the default active slide index

    const image = [
        'https://file.hstatic.net/200000837185/file/qua_to__li_xi_lon_fbab64d4b78749a59cf1c922bccf0342_1024x1024.jpg',
        'https://file.hstatic.net/200000837185/file/tuong_lai_hien_huu_3e97ee550a7a4c918f06e540fd85086c_1024x1024.jpg',
        'https://file.hstatic.net/200000837185/file/mua_nitro_nhan_qua_vip_acd7256e232c4ac4906b68c298220820_1024x1024.jpg',
        'https://file.hstatic.net/200000837185/file/fix_banner_hero_57554a8f26e84d3b89f459584574b15a_1024x1024.png',
        'https://file.hstatic.net/200000837185/file/mua_nitro_nhan_qua_vip_acd7256e232c4ac4906b68c298220820_1024x1024.jpg',
    ];

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % image.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + image.length) % image.length);
    };

    return (
        <div id="animation-carousel" className="relative w-full" data-carousel="static">
            {/* Carousel wrapper */}
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {/* Render the slides */}
                {image.map((imageUrl, index) => (
                    <div
                        key={index}
                        className={`${
                            index === currentSlide
                                ? 'duration-200 ease-linear block'
                                : 'hidden duration-200 ease-linear'
                        }`}
                        data-carousel-item={index === 2 ? 'active' : ''}
                    >
                        <img
                            src={imageUrl}
                            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                            alt={`Slide ${index + 1}`}
                        />
                    </div>
                ))}
            </div>
            {/* Slider controls */}
            <button
                type="button"
                className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={prevSlide}
                data-carousel-prev
            >
                {/* Previous button content */}
            </button>
            <button
                type="button"
                className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                onClick={nextSlide}
                data-carousel-next
            >
                {/* Next button content */}
            </button>
        </div>
    );
};

export default AnimationCarousel;
