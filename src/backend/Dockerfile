FROM python:3.12
ARG BACKEND_PORT
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

RUN python model_setup.py

EXPOSE ${BACKEND_PORT}
CMD ["python", "main.py"]