const express = require("express");
const serverless = require("serverless-http");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const accountSid = "AC3152b54238ecf3f8344faa3aef1c6044";
const authToken = process.env.API_KEY;
const client = require("twilio")(accountSid, authToken);

const app = express();
app.use(cors());
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "JAFFA",
  });
});

router.post("/", async (req, res) => {
  await client.messages
    .create({
      body: req.body,
      from: "whatsapp:+14155238886",
      to: `whatsapp:+919381951938`,
    })
    .then((message) => res.send(message.sid))
    .done();
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
