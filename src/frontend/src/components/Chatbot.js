import React, { useState, useEffect } from 'react';
import './Chatbot.css';
import config from "../settings";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); // Выбранная категория
  const [errorMessage, setErrorMessage] = useState(''); // Сообщение об ошибке
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = config["apiEndpointsMap"];
  const backendURI = config['backendURI'];

  // useEffect(() => {
  //   // Асинхронная функция для загрузки категорий
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000" + api['getCategories']); // Замените на реальный эндпоинт
  //       if (!response.ok) {
  //         throw new Error('Ошибка при загрузке категорий');
  //       }
  //       const data = await response.json();
  //       setCategories(data.body); // Предполагается, что API возвращает массив категорий
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchCategories();
  // }, [backendURI, api]);

  setCategories(['ЛК', 'поддержка', 'табель', 'отпуск', 'удаленная работа', 'увольнение', 'моя карьера', 'БиР', 'Другое'])

  const handleSendMessage = async () => {
    if (!selectedCategory) {
      // Если категория не выбрана, показываем сообщение об ошибке
      setErrorMessage('Пожалуйста, выберите категорию перед отправкой сообщения.');
      return;
    }

    if (userInput.trim() !== '') {
      const newMessages = [...messages, { sender: 'user', text: `${selectedCategory}: ${userInput}` }];
      setMessages(newMessages);
      setUserInput('');
      setSelectedCategory(null); // После отправки сообщения сбрасываем выбор категории
      setErrorMessage(''); // Очищаем сообщение об ошибке после успешной отправки

      try {
        // Отправка сообщения на бэкенд вместе с выбранной категорией
        const response = await fetch(backendURI + api['sendMessage'], {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            body: userInput,
            category: selectedCategory // Передаем выбранную категорию на бэкенд
          }),
        });

        const data = await response.json();
        const botResponse = data.body;

        // Добавление ответа бота в чат
        setMessages([...newMessages, { sender: 'bot', text: botResponse }]);
      } catch (err) {
        setErrorMessage('Ошибка при отправке сообщения');
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Чат-бот</h2>
      </div>
      <div className="chat-box">
        {/* Сообщения */}
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>

      {/* Поле ввода сообщения */}
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

      {/* Список категорий в виде кнопок под полем ввода */}
      <div className="category-buttons">
        {categories.slice(0, 8).map((category, index) => (
          <button
            key={index}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(category);
              setErrorMessage(''); // Сбрасываем сообщение об ошибке при выборе категории
            }}
          >
            {category}
          </button>
        ))}
        {categories.length > 8 && (
          <button
            className="category-button more"
            onClick={() => {
              // Показываем следующие 8 категорий
              setCategories(prevCategories => [
                ...prevCategories.slice(8),
                ...prevCategories.slice(0, 8)
              ]);
            }}
          >
            Другое
          </button>
        )}
      </div>

      {/* Сообщение об ошибке при отсутствии выбранной категории */}
      {errorMessage && <div className="notification">{errorMessage}</div>}
    </div>
  );
}

export default Chatbot;