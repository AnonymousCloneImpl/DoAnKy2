import Header from "@/components/header/header";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUp, faPhoneVolume} from "@fortawesome/free-solid-svg-icons";
export default function Layout({ children }) {

    // scrollToTop
    const [isScrollVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div>
            <Header/>
            <div className="pt-38 w-full flex justify-center">
                <div className="w-10/12">
                    {children}
                </div>
            </div>

            {/* Scroll and Call button */}
            <button className="call-button">
                <a href="tel:+84123456789" className="info-menu2-li-a">
                    <FontAwesomeIcon icon={faPhoneVolume}/>
                </a>
            </button>

            <div>
                {isScrollVisible && (
                    <button onClick={scrollToTop} className="scroll-to-top-button">
                        <FontAwesomeIcon icon={faCircleUp} className="scroll-icon"/>
                    </button>
                )}
            </div>
        </div>
    )
}