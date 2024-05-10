const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const bodyParser = require("body-parser");

const routes = require("./routes");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(bodyParser.json());

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log("received: %s", message);
  });
});

routes(app, wss);

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
