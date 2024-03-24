import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCircleUp, faCommentDots } from "@fortawesome/free-solid-svg-icons";
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
    if (window.scrollY > 500) {
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


  // Open/Close chat----------------------------------------------------------------------------------------------
  const [isChatVisible, setChatVisible] = useState(false);
  const chatRef = useRef(null);

  const openChat = () => {
    setChatVisible(true);
  };

  const closeChat = () => {
    setChatVisible(false);
  };


  return (
    <div>
      <Header />
      <div className="w-full flex justify-center">
        <div className="w-full">
          {children}
        </div>
      </div>
      {/* Scroll and Call button */}
      <button
        className="call-button"
        onClick={openChat}>
        <FontAwesomeIcon icon={faCommentDots} />
      </button>


      {/* FORM ORDER */}
      {isChatVisible && (
        <>
          <div className="chat-popup" ref={chatRef}>
            <div className="chat-header">
              <img className='chat-logo' src='/favico.png'></img>
              <h1>Chatbox</h1>
            </div>

            <div className="chat-content">
              <button className="close-chat-btn" onClick={closeChat}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>

              <form className="chat-form">
                <input type="text"
                  placeholder="Chat here..."
                  className="chat"
                  name="chat"
                  id="chat" required>
                </input>
              </form>
            </div>
          </div>
        </>
      )}

      <div>
        {isScrollVisible && (
          <button onClick={scrollToTop} className="scroll-to-top-button">
            <FontAwesomeIcon icon={faCircleUp} className="scroll-icon" />
          </button>
        )}
      </div>
      <Footer />
    </div>
  )
}
