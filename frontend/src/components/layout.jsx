import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp, faCircleXmark, faCommentDots, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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
    window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // chat-----------------------------------------------------------------------------------------------------
  const [chatMessages, setChatMessages] = useState([]);
  const ws = useRef(null);

  const openChat = () => {
    // connectWebSocket();
    isChatVisible ? closeChat() : setChatVisible(true);
  };

  const closeChat = () => {
    setChatVisible(false);
    if (ws.current) {
      ws.current.disconnect();
    }
  };

  // const connectWebSocket = () => {
  //   ws.current = Stomp.over(() => new WebSocket('ws://localhost:8080/chat'));
  //   ws.current.connect({}, () => {
  //     console.log("connecting WebSocket")
  //     ws.current.subscribe('/topic/messages', (message) => {
  //       setChatMessages([...chatMessages, message.body]);
  //       scrollChatBox();
  //     });
  //   });
  // };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const message = e.target.elements.chat.value.trim();
    if (message !== "") {
      // if (ws.current && ws.current.connected) {
      //   ws.current.send('/chat', {}, message);
      // }
      setChatMessages([...chatMessages, message]);
      e.target.reset();
      console.log(message);
    }
  };

  useEffect(() => {
    scrollChatBox();
  }, [chatMessages]);

  const scrollChatBox = () => {
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
        <div className="chat-popup">
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
                <input type="text" placeholder="Chat here..." className="w-10/12" name="chat" id="chat"
                  required autoComplete="off" />
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
