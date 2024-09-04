import unittest
import requests

from settings import server_settings

class TestMessageEndpoint(unittest.TestCase):

    endpoint = 'message'
    
    def setUp(self):
        self.url = 'http://' + server_settings.host + ':' + str(server_settings.port) + '/' + self.endpoint
        self.headers = {"Content-Type": "application/json"}
        self.payload = {
            "body": "Dummy",
        }

    def test_post_msg(self):
        response = requests.post(self.url, json=self.payload, headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), self.payload)