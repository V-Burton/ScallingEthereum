const express = require("express");
require("dotenv").config();
const routes = require("./routes/mainRoutes");
const app = express();
const mongoose = require("mongoose");

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
  res.on("finish", () => {
    console.log(res.statusCode);
  });
});

app.use(express.json());

// routes
app.use("/", routes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log(`connected to db and listening on port ${process.env.PORT}`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
