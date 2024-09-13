import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from schema.models import Message
from answer_generator.model import QueryFinder
from settings import model_settings

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        f'http://{os.environ['HOST']}:{os.environ['FRONTEND_PORT']}',
        'http://localhost:3000'
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post(
    '/api/message/',
)
async def handle_message(msg: Message):
    
    model = QueryFinder(**model_settings)
    
    return {
        "body": model.find_query(msg.body, msg.category),
    }

@app.get(
    '/api/get-categories'
)
async def get_categories():
    
    with open('./answer_generator/available_categories.txt') as f:
        categories = list(map(lambda el: el.strip(), f.readlines()))
        
    return {
        'body': categories
    }