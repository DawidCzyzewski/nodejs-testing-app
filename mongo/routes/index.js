// Przyszedł czas na zmianę naszej aplikacji – dodamy formularz, abyśmy mogli przyjąć dane od użytkownika. Plik index.ejs powinien teraz wyglądać tak:

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// Teraz w pliku routingu dodamy program opracowywania ścieżki /login. Można w osobnym pliku o nazwie np login ale można tu

router.post("/login", (req, res, next) => {
  // nazwa email oraz password jest z formularza i wzięte z tego "name". To trochę jak propsy
  const { email, password } = req.body;
  // "response" musi się zgadzać z plikiem, w tym przypadku response.ejs
  res.render("response", { title: "You are logged in", email, password });
});

module.exports = router;

// Dodajmy program opracowywania dla otrzymania konkretnego użytkownika zgodnie z jego identyfikatorem:

// router.get("/:id", function (req, res, next) {
//   const { id } = req.params;
//   const contact = contacts.filter((el) => el.id === id);
//   res.json(contact);
// });
