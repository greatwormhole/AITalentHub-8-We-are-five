from answer_generator.model import QueryFinder

# Example usage
categories_to_choose = ['ЛК', 'поддержка', 'табель', 'отпуск', 'удаленная работа', 'увольнение', 'моя карьера', 'БиР', 'Другое']
model_path = './../all-mpnet-base-v2'
embeddings_base_path = './data'
answer_corpus_base_path = './data'

query_finder = QueryFinder(model_path, embeddings_base_path, answer_corpus_base_path)

# Sample query and category
query = "как внести снилс в лк"
category = "документооборот"

# Find the best match
best_answer = query_finder.find_query(query, category)
print(best_answer)