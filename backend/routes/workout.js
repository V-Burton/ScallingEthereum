const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "GET all workout" });
});

router.get("/:id", (req, res) => {
  res.json({ msg: "GET one workout" });
});

router.post("/", (req, res) => {
  res.json({ msg: "POST a new workout" });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  res.json({ msg: `DELETE a workout ${id}` });
});

router.patch("/:id", (req, res) => {
  res.json({ msg: "PATCH a workout" });
});

module.exports = router;
