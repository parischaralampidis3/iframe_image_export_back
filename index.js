const cors = require("cors");
const express = require("express");
const routes = require("./routes/captureRoutes");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/capture", routes);

app.use(cors(
  {
    origin: "http://localhost:5500",
    credentials: true
  }
))


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});