import React, { useEffect, useState } from 'react';
import './css/ChatAnimation.css';

const ChatAnimation = ({ messages }) => {
  const [displayedText, setDisplayedText] = useState('');
  const lastSystemMessage = messages.find((message) => message.role === 'system');

  useEffect(() => {
    let animationInterval;

    if (lastSystemMessage) {
      const words = lastSystemMessage.content.split(' ');

      let currentWordIndex = 0;
      animationInterval = setInterval(() => {
        setDisplayedText((prevText) => prevText + ' ' + words[currentWordIndex] || "");
        currentWordIndex++;

        if (currentWordIndex === words.length) {
          clearInterval(animationInterval);
        }
      }, 200); // Adjust the delay as needed
    }

    return () => {
      clearInterval(animationInterval);
    };
  }, [lastSystemMessage]);

  return (
    <div className="chat-container">
      {messages.map((message, index) => (
        <div
          className={`chat-bubble ${message.role === 'system' ? 'chat-bubble--left' : 'chat-bubble--right'}`}
          key={index}
        >
          <span className="chat-text">
            {/* {message.role === 'system' && message === lastSystemMessage ? displayedText : message.content} */}
            {message.content}
          </span>
        </div>
      ))}
    </div>
  );
};

export default React.memo(ChatAnimation);
