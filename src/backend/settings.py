import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

server_settings = {
    'app': 'app:app',
    'host': '0.0.0.0',
    'port': int(os.environ['BACKEND_PORT']),
    'reload': True,
}

model_settings = {
    'model_path': f'{BASE_DIR}/all-mpnet-base-v2',
    'embeddings_base_path': f'{BASE_DIR}/answer_generator/data',
    'answer_corpus_base_path': f'{BASE_DIR}/answer_generator/data',
}