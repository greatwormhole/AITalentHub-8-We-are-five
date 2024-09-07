from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-mpnet-base-v2')
model.save('all-mpnet-base-v2')