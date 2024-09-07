FROM python:3.12
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "model_setup.py"] # Создание локальной модели в контейнере

EXPOSE 8000
CMD ["python", "main.py"] # Запуск сервера