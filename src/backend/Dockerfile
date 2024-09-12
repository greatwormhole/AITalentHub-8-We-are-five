FROM python:3.12
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

RUN python model_setup.py

EXPOSE 8000
CMD ["python", "main.py"]