// POST register (post becouse GET should get data and don't change anything)
// POST login (post becouse GET should get data and don't change anything - when we create token, we save something, so this should be post)
// GET tasks

// Mongo + Mongoose
// Password: (instead of salt will be secret:) secret + hash
// Access token

// This what is under often will be written earlier, I write it for practise

const express = require("express");
// cors helps to secure our site from attack like 500 requests in second etc
const cors = require("cors");
const mongoose = require("mongoose");
const routerApi = require("./api");
// Mayby this is not necessery, but is in script. If mongoose won't have definied promise, use global promise
mongoose.Promise = global.Promise;

// setting up dotenv
require("dotenv").config();
const uriDb = process.env.DB_HOST;

// connection to Mongo. Added aditional options - useNewUrlParser () and useCreateIndex ()
const connection = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  // useCreateIndex: true
  // ,
  //   useUnifiedTopology: true,
});

// log that I am connected:
connection
  .then(() => {
    console.log("connected to MongoDb");
  })
  .catch((e) => console.error(e));

const app = express();

//MiddleWare
app.use(express.json());
app.use(cors());

// I need this becouse later is used config password and in this there is no export, so it is just used so I need to import this
require("./config/config-passport");

app.use("/api", routerApi);

// my callbacks when something wrong:
// when bad url
// jeśli masz error w aplikacji, tj z poziomu JSa: czy to problem w mongo (zly login), czy mongoose (brak pola required), czy w jsie (promise rzucił błąd), czy w dowolny inny sposób: to masz middleware z 4 zmiennymi, którą pierwszą jest "err"
// natomiast jeśli nie masz błędu, a chcesz napisać zwykły middleware to masz 3 zmienne
// app.use((_, res, __) => {
//   res.status(404).json({
//     status: "error",
//     code: 404,
//     message: "You need to use /api route",
//     data: "Nothing found",
//   });});
// ten kawałek kodu to zwykły middleware, bo w sumie nic złego się nie zadziało w samym JSie - wszystko wyszło dobrze, ale nie znaleźliśmy routingu, więc sami wpisujemy "błąd"
// stąd przy 404 mamy app.use((_, res, __) => {
app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "You need to use /api route",
    data: "Nothing found",
  });
});

// a przy 500 mamy app.use((err, _, res, __) => {
app.use((err, _, res, __) => {
  console.error(err.stack);

  res.status(500).json({
    status: "fail",
    code: 500,
    message: err.message,
    dat: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is running on port ", PORT);
});
