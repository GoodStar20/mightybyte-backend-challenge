const WebSocket = require("ws");
const { generateRandomCode } = require("../utils");

function generateShortenedURL(url) {
  const code = generateRandomCode();
  return `${url}/${code}`;
}

function sendMessageWithRetry(wss, message) {
  const clients = wss.clients;
  const messageJSON = JSON.stringify(message);

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(messageJSON, (error) => {
        if (error) {
          setTimeout(() => {
            sendMessageWithRetry(wss, message);
          }, 5000);
          // or we can implement function to send email to client in here
        }
      });
    }
  });
}

module.exports = { generateShortenedURL, sendMessageWithRetry };
