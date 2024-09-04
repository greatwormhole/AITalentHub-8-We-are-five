from fastapi import FastAPI

from models import Message

app = FastAPI()

@app.post(
    '/message/',
)
async def handle_message(msg: Message):
    return {'msg': msg}