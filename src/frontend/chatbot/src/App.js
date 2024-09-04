import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = () => {
    if (userInput.trim() !== '') {
      const newMessages = [...messages, { sender: 'user', text: userInput }];
      setMessages(newMessages);
      setUserInput('');

      // Simulate a bot response
      setTimeout(() => {
        const botResponse = getBotResponse(userInput);
        setMessages([...newMessages, { sender: 'bot', text: botResponse }]);
      }, 1000);
    }
  };

  const getBotResponse = (input) => {
    return 'Я не знаю ответа на данный вопрос.';
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Чатбот</h2>
      </div>
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Введите свой вопрос..."
        />
        <button onClick={handleSendMessage}>Отправить</button>
      </div>
    </div>
  );
}

export default App;