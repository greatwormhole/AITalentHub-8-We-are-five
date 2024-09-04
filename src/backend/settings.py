from uvicorn import Config

server_settings = Config(
    app='app:app',
    host='localhost',
    port=5000,
)