import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleSendMessage = async () => {
    if (userInput.trim() !== '') {
      const newMessages = [...messages, { sender: 'user', text: userInput }];
      setMessages(newMessages);
      setUserInput('');

      // Отправка сообщения на бэкенд
      const response = await fetch("http://0.0.0.0:8000/message/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({body: userInput }),
      });

      const data = await response.json();
      const botResponse = data.body;

      // Добавление ответа бота в чат
      setMessages([...newMessages, { sender: 'bot', text: botResponse }]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Чат-бот</h2>
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