from uvicorn import Config

server_settings = Config(
    app='app:app',
    host='0.0.0.0',
    port=8000,
    reload=True,
)