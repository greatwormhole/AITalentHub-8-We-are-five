#!bin/bash
rm available_categories.txt
touch available_categories.txt
cd data/query_corpus_embeddings_by_category
for FILE in *.pt
do
    echo ${FILE:24:-3} >> ../../available_categories.txt
done