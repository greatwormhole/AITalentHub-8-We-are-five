import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers.answer_generation_api import router as answer_router

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

app.include_router(answer_router)