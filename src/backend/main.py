import uvicorn

from settings import server_settings

if __name__ == '__main__':
    uvicorn.run(**server_settings)