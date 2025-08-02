const express = require("express");
const routes = require("./routes/captureRoutes");

const app = express();
const port = 3000;

app.use(express.json());
app.use("/capture", routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});