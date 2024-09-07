from os import environ
from uvicorn import Config

server_settings = Config(
    app='app:app',
    host=environ['BACKEND_HOST'],
    port=int(environ['BACKEND_PORT']),
    reload=True,
)