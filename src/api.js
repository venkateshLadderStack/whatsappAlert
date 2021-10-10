const express = require("express");
const serverless = require("serverless-http");
const dotenv = require("dotenv");

dotenv.config();

const accountSid = "AC3152b54238ecf3f8344faa3aef1c6044";
const authToken = process.env.API_KEY;
const client = require("twilio")(accountSid, authToken);

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "hi!",
  });
});

router.post("/", async (req, res) => {
  await client.messages
    .create({
      body: req.body,
      from: "whatsapp:+14155238886",
      to: `whatsapp:+917731012637`,
    })
    .then((message) => console.log(message.sid))
    .done();

  res.send(req.body);
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
