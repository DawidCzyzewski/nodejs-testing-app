// Instead of writing everything like in app.js (app.use, app.use, app.post, app.get etc.) I can use router:
// It is better becouse often like in react I want to have routes in other folder
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hej, hej router główna");
});

router.get("/tasks", (req, res) => {
  res.send("hej, hej router tasks");
});

// http://localhost:3000/api/tasks

module.exports = router;

// Now I must comment all app.get in app.js
