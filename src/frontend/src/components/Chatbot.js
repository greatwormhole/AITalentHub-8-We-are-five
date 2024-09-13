import React, { useState, useEffect } from 'react';
import './Chatbot.css';
import config from "../settings";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [waitingForFeedback, setWaitingForFeedback] = useState(false);

  const api = config["apiEndpointsMap"];
  const backendURI = config['backendURI'];

  useEffect(() => {
    setCategories(['ЛК', 'поддержка', 'табель', 'отпуск', 'удаленная работа', 'увольнение', 'моя карьера', 'БиР', 'Другое']);
  }, [backendURI, api]);

  const handleSendMessage = async () => {
    const category = selectedCategory || "Другое";

    if (userInput.trim() !== '') {
      const newMessages = [...messages, { sender: 'user', text: `${category}: ${userInput}` }];
      setMessages(newMessages);
      setUserInput('');
      setErrorMessage('');

      try {
        const response = await fetch(backendURI + api['sendMessage'], {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body: userInput,
            category: category,
          }),
        });

        const data = await response.json();
        const botResponse = data.body;

        // Check if the response is asking to reformulate the question
        const isReformulateRequest = botResponse === "Пожалуйста, переформулируйте свой вопрос";

        setMessages([...newMessages,
          { sender: 'bot', text: botResponse, showSpecialistButton: isReformulateRequest, showFeedbackButtons: !isReformulateRequest, feedbackGiven: false }
        ]);

        if (!isReformulateRequest) {
          setWaitingForFeedback(true);
        }
      } catch (err) {
        setErrorMessage('Ошибка при отправке сообщения');
      }

      setSelectedCategory(null);
    }
  };

  const handleFeedback = (index, feedback) => {
    const newMessages = [...messages];
    newMessages[index].feedbackGiven = true;
    newMessages[index].selectedFeedback = feedback;
    setMessages(newMessages);

    if (feedback === 'Нет') {
      setMessages([...newMessages, { sender: 'bot', text: 'Извините, что ответ Вас не устроил. Специалист скоро с Вами свяжется.' }]);
    }

    setWaitingForFeedback(false);
  };

  const handleSpecialistRequest = (index) => {
    const newMessages = [...messages];
    newMessages[index].feedbackGiven = true;
    setMessages([...newMessages, { sender: 'bot', text: 'Специалист скоро с Вами свяжется.' }]);
    setWaitingForFeedback(false);
  };

  const messagesToHideFeedback = ["Извините, что ответ Вас не устроил. Специалист скоро с Вами свяжется.", "Специалист скоро с Вами свяжется."];

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Чат-бот</h2>
      </div>
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
            {message.sender === 'bot' && !message.feedbackGiven && !messagesToHideFeedback.includes(message.text) && (
              <div className="feedback-buttons">
                {message.showSpecialistButton ? (
                  <button onClick={() => handleSpecialistRequest(index)}>
                    Вызвать специалиста
                  </button>
                ) : (
                  <>
                    <p>Ваc устраивает ответ?</p>
                    <button
                      className={message.selectedFeedback === 'Да' ? 'selected' : ''}
                      onClick={() => handleFeedback(index, 'Да')}
                    >
                      Да
                    </button>
                    <button
                      className={message.selectedFeedback === 'Нет' ? 'selected' : ''}
                      onClick={() => handleFeedback(index, 'Нет')}
                    >
                      Нет, позови специалиста
                    </button>
                  </>
                )}
              </div>
            )}
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

      <div className="category-buttons">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(category);
              setErrorMessage('');
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {errorMessage && <div className="notification">{errorMessage}</div>}
    </div>
  );
}

export default Chatbot;