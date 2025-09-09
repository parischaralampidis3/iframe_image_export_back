const cors = require("cors");
const express = require("express");
const routes = require("./routes/captureRoutes");

const app = express();
const port = process.env.PORT || 10000;

// Enable CORS for your Netlify frontend
app.use(cors({
  origin: "https://iframeparser.netlify.app",
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());
app.use("/capture", routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});