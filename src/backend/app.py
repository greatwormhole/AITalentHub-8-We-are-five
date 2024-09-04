from fastapi import FastAPI

app = FastAPI()

@app.post(
    '/message',
    
)
async def handle_message():
    pass