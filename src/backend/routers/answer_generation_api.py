from fastapi import APIRouter

from settings import BASE_DIR, model_settings
from schema.models import Message
from answer_generator.model import QueryFinder

router = APIRouter(
    prefix='/api/v1',
    tags=['Persons'],
)

@router.post(
    '/message',
)
async def handle_message(msg: Message):
    
    model = QueryFinder(**model_settings)
    
    return {
        "body": model.find_query(msg.body, msg.category),
    }

@router.get(
    '/get-categories'
)
async def get_categories():
    
    with open(f'{BASE_DIR}/answer_generator/available_categories.txt') as f:
        categories = list(map(lambda el: el.strip(), f.readlines()))
        
    return {
        'body': categories
    }