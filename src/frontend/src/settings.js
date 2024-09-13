const conf = {
    "backendURI": "http://" + process.env.REACT_APP_BACKEND_HOST + ":" + process.env.REACT_APP_BACKEND_PORT,
    "apiEndpointsMap": {
        "sendMessage": "/api/v1/message",
        "getCategories": "/api/v1/get-categories"
    },
}

export default conf;