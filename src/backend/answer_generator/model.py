import json
import pickle
import torch
from sentence_transformers import SentenceTransformer, util

class QueryFinder:
    def __init__(self, model_path: str, embeddings_base_path: str, answer_corpus_base_path: str, closest_n: int = 1):
        """
        Initialize the QueryFinder with paths to the model, embeddings, and answer corpuses.

        :param model_path: Path to the SentenceTransformer model.
        :param embeddings_base_path: Base path to the query corpus embeddings.
        :param answer_corpus_base_path: Base path to the answer corpuses.
        :param closest_n: The number of closest matches to return.
        """
        self.model = SentenceTransformer(model_path).to('cpu')
        self.embeddings_base_path = embeddings_base_path
        self.answer_corpus_base_path = answer_corpus_base_path
        self.closest_n = closest_n

    def _load_embeddings(self, category: str):
        """
        Load the query corpus embeddings for a specific category or for all categories.

        :param category: The category to load embeddings for.
        :return: Loaded embeddings tensor.
        """
        if category == 'Другое':
            path = f'{self.embeddings_base_path}/query_corpus_embeddings.pt'
        else:
            path = f'{self.embeddings_base_path}/query_corpus_embeddings_by_category/query_corpus_embeddings_{category}.pt'
        return torch.load(path, map_location=torch.device('cpu'))

    def _load_answer_corpus(self, category: str):
        """
        Load the answer corpus for a specific category or for all categories.

        :param category: The category to load the answer corpus for.
        :return: Loaded answer corpus (either a list or dict depending on the category).
        """
        if category == 'Другое':
            with open(f'{self.answer_corpus_base_path}/answer_corpus.pkl', 'rb') as f:
                return pickle.load(f)
        else:
            with open(f'{self.answer_corpus_base_path}/answer_corpus_dict.json', 'rb') as f:
                answer_corpus = json.load(f)
                return answer_corpus[f'answer_corpus_{category}']

    def find_query(self, query: str, category: str) -> str:
        """
        Find the closest query match for a given input query and category.

        :param query: The input query to search for.
        :param category: The category to search within.
        :return: The best-matching answer from the answer corpus.
        """
        query_embedding = self.model.encode(query, convert_to_tensor=True)
        query_corpus_embeddings = self._load_embeddings(category)

        # Compute cosine similarity between the query and the corpus
        distances = util.pytorch_cos_sim(query_embedding, query_corpus_embeddings)[0]
        best_matches = distances.topk(self.closest_n)

        # Load the relevant answer corpus
        answer_corpus = self._load_answer_corpus(category)
        return answer_corpus[best_matches[1][0].item()]