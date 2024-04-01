import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCircleUp, faCommentDots, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children }) {

  const [isScrollVisible, setIsVisible] = useState(false);
  const [isChatVisible, setChatVisible] = useState(false);

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

  // open/close chat pop up
  const openChat = () => {
    if (isChatVisible) {
      closeChat();
    } else {
      setChatVisible(true);
    }
  };

  const closeChat = () => {
    setChatVisible(false);
  };

  const [chatMessages, setChatMessages] = useState([]);
  const [ws, setWs] = useState(null);
  // const chatRef = useRef(null);

  // useEffect(() => {
  //   const newWs = new WebSocket('ws://127.0.0.1:8000/dashboard/chat');

  //   newWs.onopen = () => {
  //     console.log('WebSocket connected');
  //     setWs(newWs);
  //   };

  //   newWs.onmessage = (event) => {
  //     const message = event.data;
  //     setChatMessages(prevMessages => [...prevMessages, message]);
  //     scrollChatBox();
  //   };

  //   return () => {
  //     newWs.close();
  //   };
  // }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    const message = e.target.elements.chat.value.trim();
    if (message !== "") {
      if (ws) {
        ws.send(message);
      }
      setChatMessages([...chatMessages, message]);
      e.target.reset();
    }
  };

  useEffect(() => {
    scrollChatBox();
  }, [chatMessages]);

  function scrollChatBox() {
    const chatBox = document.getElementById('chat-box');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  return (
    <div>
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="w-full flex justify-center">
        <div className="w-full">
          {children}
        </div>
      </div>

      {/* Open Chat Button */}
      <button className="chat-button" onClick={openChat}>
        <FontAwesomeIcon icon={faCommentDots} className="chat-icon" />
      </button>

      {/* Chat Popup */}
      {isChatVisible && (
        <div className="chat-popup" ref={chatRef}>
          <div className="relative">
            <div className="chat-header">
              <img className='chat-logo' src='/favico.png' alt="Chat Logo" />
              <h1>Chatbox</h1>
              <button className="close-chat-btn" onClick={closeChat}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            </div>

            <div className="chat-content chat-box" id="chat-box">
              {chatMessages.map((message, index) => (
                <div key={index} className="chat-message">
                  <p>{message}</p>
                </div>
              ))}
            </div>

            <div className="w-full h-20">
              <form className="flex chat-form w-full h-full" onSubmit={handleSendMessage}>
                <input type="text" placeholder="Chat here..." className="w-10/12" name="chat" id="chat" required autoComplete="off" />
                <button type="submit"><FontAwesomeIcon icon={faPaperPlane} /></button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      <div>
        {isScrollVisible && (
          <button onClick={scrollToTop} className="scroll-to-top-button">
            <FontAwesomeIcon icon={faCircleUp} className="scroll-icon" />
          </button>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
