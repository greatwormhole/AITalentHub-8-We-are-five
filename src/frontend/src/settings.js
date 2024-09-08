const conf = {
    "backendURI": "http://" + process.env.REACT_APP_BACKEND_HOST + ":" + process.env.REACT_APP_BACKEND_PORT,
    "apiEndpointsMap": {
        "sendMessage": "/api/message",
        "getCategories": "/api/get-categories"
    },
}

export default conf;