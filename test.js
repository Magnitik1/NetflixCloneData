let express = require("express");
let app = express();
// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
let data = [
  {
    name: "Jhon",
    email: "jhon@gmail.com",
    password: "123456",
    plan: "a",
    myList: [
      "Film1", 
      "Film2",
      "Film3",
    ],
  },
  {
    name: "Mike",
    email: "mike@gmail.com",
    password: "123456",
    plan: "a",
    myList: [
      "Film1", 
      "Film2",
      "Film3",
    ],
  },
  {
    name: "Tom",
    email: "tom@gmail.com",
    password: "123456",
    plan: "b",
    myList: [
      "Film1", 
      "Film2",
      "Film3",
    ],
  },
  {
    name: "Anny",
    email: "anny@gmail.com",
    password: "123456",
    plan: "b",
    myList: [
      "Film1", 
      "Film2",
      "Film3",
    ],
  },
  {
    name: "Alex",
    email: "alex@gmail.com",
    password: "123456",
    plan: "c",
    myList: [
      "Film1", 
      "Film2",
      "Film3",
    ],
  },
];
app.use(express.static(`main`));
app.use(express.json());

app.post("/process_post", function (request, response) {
  data.push(request.body);
  // console.log(request.body)
  console.log(data); // your JSON
});

app.post("/process_remove", function (request, response) {
  data.splice(((_) => (_ > -1 ? _ : Infinity))(data.findIndex((_) => _.name == request.body.name)), 1);
  console.log(data); // your JSON
});

app.get("/api", function (req, res) {
  res.json(data); //also tried to do it through .send, but there data only on window in browser
});
app.listen(3000);
