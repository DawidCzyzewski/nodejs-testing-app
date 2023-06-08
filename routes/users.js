// Teraz w pliku routingu user.js dodamy następujący obiekt z kontaktami:

const express = require("express");
const router = express.Router();
const users = [
  { id: "1", name: "Rafał", email: "felix@test.com" },
  { id: "2", name: "Marcin", email: "sonya@test.com" },
  { id: "3", name: "Tomasz", email: "conan@test.com" },
];
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json(users);
});

// można też nasłuchiwać jednego użytkownika a nie wszystkich
router.get("/:id", (req, res, next) => {
  // ta nazwa musi się zgadzać z tą na początku po get
  const { id } = req.params;
  const user = users.filter((us) => us.id === id);
  // Można tu zwrócić błąd w przypadku nieodnalezienia użytkownika, choć 404 nie jest najlepszy w tym przypadku
  // res.status(404).json(user);
  // res.status(200).json(user);

  res.json(user);
});

module.exports = router;

// Jeżeli zwrócimy się po ścieżce /users, serwer powinien odesłać nam JSON z tablicą kontaktów.

// metody bezpieczne, idenpotentne (zwracające zawsze to samo)
// GET
// PUT i PATCH
// {id:2, name: 'oki'}
// za każdym razem dostaniemy ten sam wynik, bo nadpisze, ale zwróci to samo
// dla id=2 zmień name = "abba"
// DELETE również
// POST NIE JEST IDENPOTENTNY
