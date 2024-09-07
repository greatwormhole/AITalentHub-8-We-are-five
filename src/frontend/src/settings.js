backendHost = "0.0.0.0";
backendPort = 8000;
backendURI = "http://" + backendHost + ":" + backendPort + "/";

const conf = {
    "backendHost": backendHost,
    "backendPort": backendPort,
    "backendURI": backendURI,
    "apiEndpointsMap": {
        "sendMessage": "api/message",
    },
}

export default conf;