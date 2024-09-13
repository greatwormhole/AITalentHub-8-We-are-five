import sys
import os
import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from app import app

client = TestClient(app)

mock_categories = ['ЛК', 'поддержка', 'табель', 'отпуск']

@pytest.fixture
def mock_query_finder():
    with patch('main.QueryFinder') as MockQueryFinder:
        instance = MockQueryFinder.return_value
        instance.find_query.return_value = "Mocked response"
        yield instance

def test_handle_message(mock_query_finder):
    response = client.post(
        "/api/message/",
        json={
            "body": "Пример вопроса",
            "category": "поддержка"
        }
    )
    assert response.status_code == 200
    assert response.json() == {"body": "Mocked response"}
    mock_query_finder.find_query.assert_called_once_with("Пример вопроса", "поддержка")

@pytest.fixture
def mock_open_categories_file():
    with patch("builtins.open", pytest.mock_open(read_data="ЛК\nподдержка\nтабель\nотпуск")):
        yield

def test_get_categories(mock_open_categories_file):
    response = client.get("/api/get-categories")
    assert response.status_code == 200
    assert response.json() == {"body": mock_categories}