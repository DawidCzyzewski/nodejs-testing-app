// first install npm install express

const express = require("express");
// express is not only object but it is also class, so I can (and must) call it
const app = express();

// Now I comment all app.get, app.post becouse I want to use router
const myRouter = require("./router");
app.use("/api", myRouter);

// it is something like app.all(). I can use it also like middleware. To taki wewnętrzny middleware, który się wykona zawsze na wszystkie metody, w sensie jesli wejdę teraz na postmana, który w poprzednich przypadkach wywalał błąd jeśli ustawiłem post zamist get a nie miałem go napisanego, to teraz co prawda wywali w body błąd, ale u mnie w terminalu się wykona i pokaże todos
app.all("/todos", (req, res, next) => {
  console.log("todos");
  next();
});

app.get("/todos", (req, res, next) => {
  res.send("Todosssss!");
});

// Łańuch metod. Now in for exapmle postman I can write localhost:3000/blog and on post, get, put or delete will be this methods
const someFunc = (req, res) => {
  res.send("Get my list!");
};

app
  .route("/blog")
  .get(someFunc)
  .post((req, res) => {
    res.send("add something");
  })
  .put((req, res) => {
    res.send("updated something");
  })
  .delete((req, res) => {
    res.send("deleted something!");
  });

// If I will send data in json, I should write:
app.use(express.json());

//Now I will write some kind of middlware. I write app.use. It should be abrove all app.get becouse it is first thing to do by app:
// I have no route, so I write request, response and next without it
app.use((request, response, next) => {
  console.log("hej hej, middleware!");
  // If I want everyone can get to backend I write next(), becouse next dont't stop user:
  // next();
  // If it will be any next, it will be infinite loop, becouse app can't get to backend. I can show it by setTimeout:
  // setTimeout(() => {
  next();
  // }, 4000);
});

// app has many func (later about some), even http (get, path, push, delete, post). For now most important will be get.
// first arg is route, second is callback with 3 args
// app.METHOD(PATH, HANDLER);

app.get("/", (request, response, next) => {
  response.send("hej hej, witamy");
});

// if I have got no nodeamon, I must reset app to it working.

// If I want to have next thing here, I write:

// app.get("/user", (request, response, next) => {
//   // if I use here some function, I should have return (return what it returns to me), if not I mustn't have it
//   //  somefunction()
//   // if I console.log something, in browser in console will be nothing, becouse it is backend app. But it console.log here, in terminal under. It's important, becouse I have info about it but user don't:
//   // console.log({ request });
//   // request.body give me undefinied, becouse when I use method get (app.get) I have no body
//   // console.log(request.body);
//   // It will also be empty now, but I can write app.get('/user*', ...) and in browser write for example localhost:3000/user/5?test=12?:
//   // console.log(request.params);
//   // I can write also +, * or ?

//   // console.log(request.qu);
//   // and now on localhost:3000/user I have:
//   response.send("hej, Dawid");
//   // next();
// });

// app.get("/user/:userId", (request, response, _) => {
//   // now I can write in browser: http://localhost:3000/user/tomek
//   // response.send(`hej ${request.params.userId}`);
//   // If I need more params: http://localhost:3000/user/Wojtek?skip=5&limit=20
//   // response.send(
//   //   `hej ${request.params.userId}. Skip: ${request.query.skip}, limit: ${request.query.limit}`
//   // );

//   // I send data from front-end by json, so in header I should have "Content-Type": "application/json"
//   console.log(request.headers);

//   // sent as object:
//   response.send({
//     userId: request.params.userId,
//     skip: request.query.skip,
//     limit: request.query.limit,
//   });
// });

// // At now moment if I want to use post in postman, I need to write app.post
// app.post("/user/:userId", (req, res) => {
//   res.send(req.body);
// });

// app.use((request, response, next) => {
//   if (request.url.includes("/user")) {
//     console.log("no siema, user!");
//   }
//   console.log("middleware2");
//   next();
// });

// app has got many function, for example app.listen(). First argument is port, second is func (callback)

app.listen(3000, () => {
  console.log("example app is working on port 3000");
});
// now in terminal node app.js

// Symbol ? w ścieżce definiuje, że poprzedni znak może wystąpić 1 raz lub być całkiem nieobecny. Zdefiniowana poniżej ścieżka obsługuje zarówno /cotact jak i /contact

// app.get('/con?tact', (req, res) => {
//   res.send('<h1>Contact page</h1>');
// });

// Symbol + definiuje, że poprzedzający go znak może wystąpić jeden raz lub więcej. Ta ścieżka obsługuje: /contact, /conntact, /connntact i tak dalej.

// app.get('/con+tact', (req, res) => {
//   res.send('<h1>Contact page</h1>');
// });

// Symbol * definiuje, że na miejscu tego symbolu może znajdować się dowolna ilość innych znaków. Ta ścieżka obsługuje /contact, /conxtact, /con123tact i tak dalej.

// app.get('/con*tact', (req, res) => {
//   res.send('<h1>Contact page</h1>');
// });

// Warto zauważyć, że choć jest taka możliwość, lepiej wybierać określone ścieżki bez korzystania z symboli jeśli nie ma takiej potrzeby.
