// Nie łączymy aplikacji frontend i backend tak jak w tym przykładzie, zawsze tworzymy dwie osobne aplikacje

// template installed by npx express-generator --view=ejs simple-express
// npx - narzędzie, które jest już w systemie, jeśli zainstalowany został Node.js w wersji wyższej niż 8.x. Pozwala ono wykonywać polecenia innych narzędzi, nie instalując ich globalnie w systemie.

// Dalej wskazujemy, że chcemy wykorzystać szablony ejs parametrem --view=ejs

// Jako ostatni parametr wskazujemy nazwę aplikacji (i folderu) simple-express.
require("dotenv").config(); //npm install dotenv
// Aplikacja znajduje się w pliku app.js. Pierwsze, co powinniśmy zrobić, to zmienić const na const w całej aplikacji. Po tej operacji plik app.js powinien wyglądać następująco:

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Na początku podłączone są wszystkie niezbędne pakiety, potrzebne do działania aplikacji.

// Następnie zażądane są moduły zawierające routing.
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

// Później tworzymy egzemplarz aplikacji i ustawiamy wykorzystanie szablonów ejs.
const app = express();
// view engine setup Jak wejdziemy do views to mamy to w podglądzie ??
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Następnie pojawią się podłączenia middleware.
// Podłącza się logger, który będzie logować inforamcje,  ,
app.use(logger("dev"));
// opracowywanie JSON
app.use(express.json());
// i danych z formularzy
app.use(express.urlencoded({ extended: false }));
// a na koniec moduł do pracy z cookie.
app.use(cookieParser());

// Dalej dodawane jest opracowywanie zasobów statycznych z folderu public:
app.use(express.static(path.join(__dirname, "public")));

// Następnie mamy podłączenie routerów w aplikacji:
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Pamiętaj, że porządek podłączanego programu pośredniczącego ma znaczenie. Na końcu aplikacji pojawia się opracowywanie błędów. Najpierw zachodzi opracowywanie nieistniejącej ścieżki czyli klasyczny błąd 404.
// catch 404 and forward to error handler. Funkcja obsługująca błąd. Jeśli nigdzie nie zostanie zatrzymane to wpadnie tutaj i poniżej jest przechwycenie
app.use(function (req, res, next) {
  next(createError(404));
});

// Następnie z kolei mamy handler błędów które zostaną ”wyrzucone” podczas obsługi ścieżek. Tutaj zachodzi opracowywanie błędu. Podajemy zmienne message i error do szablonu error.ejs i renderujemy go.
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

// Wewnątrz folderu z naszą aplikacją trzeba zainstalować wszystkie pakiety z pliku package.json poprzez polecenie:

// npm i

// Teraz dla ułatwienia sobie pracy zainstalujemy pakiet nodemon. Pozwala on wykonywać live reload serwera w trakcie pracy nad kodem. Dodamy wymaganą zależność do devDependencies:

// npm i nodemon -D

// Następnie w pliku package.json dla uruchomienia aplikacji w trybie deweloperskim dodajemy skrypt start:dev:

// "scripts": {
//   "start": "node ./bin/www",
//   "start:dev": "nodemon ./bin/www"
// },

// Uruchomienie aplikacji w trybie deweloperskim będzie następowało przez polecenie:

// npm run start:dev

// Po uruchomieniu, aplikacja powinna wyglądać następująco po przejściu na adres [localhost:3000](http://localhost:3000) w przeglądarce:

// Aplikacja wykonuje renderowanie swojego jedynego szablonu. Samo renderowanie wykonuje się w pliku routingu routes/index.js.

// router.get('/', (req, res, next) => {
//   res.render('index', { title: 'Express' });
// });

// użycie .dev
// process.env.SECRET_KEY;
// process.env.NODE_ENV;
