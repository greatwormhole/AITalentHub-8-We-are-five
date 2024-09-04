from os import environ
from uvicorn import Config

server_settings = Config(
    app='app:app',
    host=environ['HOST'],
    port=environ['PORT'],
    reload=True,
)