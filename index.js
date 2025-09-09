const cors = require("cors");
const express = require("express");
const routes = require("./routes/captureRoutes");

const app = express();
const port = process.env.PORT || 10000;

app.use(cors(
  {
    origin: "https://iframeparser.netlify.app/",
    credentials: true
  }
))

app.use(express.json());

app.use("/capture", routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});