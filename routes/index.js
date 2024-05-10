const {
  generateShortenedURL,
  sendMessageWithRetry
} = require("../modules/url.module");
const urlRepository = require("../repositories/url.repository");

const baseUrl = "http://localhost:3000";

module.exports = function (app, wss) {
  app.post("/url", async (req, res) => {
    const { url } = req.body;
    const shortenedURL = generateShortenedURL(baseUrl);
    // Inserting the original and shortened URLs into the repository
    await urlRepository.insert(shortenedURL, url);

    sendMessageWithRetry(wss, { shortenedURL });

    res.sendStatus(200);
  });

  app.get("/:code", async (req, res) => {
    const { code } = req.params;

    // Getting the original URL corresponding to the shortened code
    const originalURL = await urlRepository.findByCode(`${baseUrl}/${code}`);
    if (originalURL) {
      res.json({ url: originalURL });
    } else {
      res.status(404).json({ error: "URL not found" });
    }
  });
};
