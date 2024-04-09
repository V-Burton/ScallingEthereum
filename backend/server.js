const express = require("express");
require("dotenv").config();
const workoutRoutes = require("./routes/workout");
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

app.use(express);

//routes
app.use("/api/workouts", workoutRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for request
    app.listen(process.env.PORT, () => {
      console.log(`connected to db and listening on port ${process.env.PORT}`);
    });
  })
  .catch((e) => {
    console.error(e);
  });
