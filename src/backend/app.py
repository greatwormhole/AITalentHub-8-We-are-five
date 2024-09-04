from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import Message

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post(
    '/message/',
)
async def handle_message(msg: Message):
    return msg

@app.get('/')
async def dummy():
    return 'Works!'