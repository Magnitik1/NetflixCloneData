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
    email: "",
    password: "",
    plan: "",
    users: [
      {
        name: "",
        imgSrc:
          "https://media.istockphoto.com/id/1393750072/vector/flat-white-icon-man-for-web-design-silhouette-flat-illustration-vector-illustration-stock.jpg?s=612x612&w=0&k=20&c=s9hO4SpyvrDIfELozPpiB_WtzQV9KhoMUP9R9gVohoU=",
        autoPlaySettings: [false, false],
        language: "English",
        myList: [],
      },
    ],
  },
  {
    email: "johnsfamily@gmail.com",
    password: "123456",
    plan: "b",
    users: [
      {
        name: "John",
        imgSrc:
          "https://screenanarchy.com/assets/2023/03/john_wick_chapter_4-Crop860.jpg",
        autoPlaySettings: [true, false],
        language: "English",
        myList: [" ", " ", " "],
      },
      {
        name: "John's Mom",
        imgSrc:
          "https://c.ndtvimg.com/2022-07/nrne792_liz-truss-reuters_625x300_11_July_22.jpg",
        autoPlaySettings: [true, false],
        language: "English",
        myList: ["Film4", " ", "Film5"],
      },
      {
        name: "John's Dad",
        imgSrc:
          "https://i.pinimg.com/originals/9f/04/99/9f0499b79b6302a48c8c3ba41c3195cf.jpg",
        autoPlaySettings: [true, false],
        language: "Українська",
        myList: [" ", "Film7", "Film4"],
      },
    ],
  },
  {
    email: "tyler@gmail.com",
    password: "123456",
    plan: "a",
    users: [
      {
        name: "Tyler",
        imgSrc:
          "https://i1.sndcdn.com/artworks-aTq4Lvypyud6O100-zb2Cug-t500x500.jpg",
        autoPlaySettings: [true, false],
        language: "English",
        myList: [" ", " ", "Film4"],
      },
    ],
  },
  {
    email: "11",
    password: "11",
    plan: "d",
    users: [
      {
        name: "Alex",
        imgSrc: "10",
        autoPlaySettings: [true, false],
        language: "Українська",
        myList: [
          { name: "The Walking Dead", liked: false },
          { name: "Rick and Morty", liked: true },
          { name: "Аdolescence", liked: false },
          { name: "Oldboy", liked: false },
        ],
      },
      {
        name: "Also Alex",
        imgSrc: "6",
        autoPlaySettings: [true, false],
        language: "English",
        myList: [
          { name: "Fight club", liked: false },
          { name: "Almost Famous", liked: true },
          { name: "Аdolescence", liked: false },
          { name: "Shawshank redemption", liked: false },
        ],
      },
      {
        name: "Cool Alex",
        imgSrc: "15",
        autoPlaySettings: [true, true],
        language: "Українська",
        myList: [
          { name: "The Good Doctor", liked: false },
          { name: "Mad Max: Fury Road", liked: true },
          { name: "Murderer", liked: false },
          { name: "Leviathan", liked: false },
        ],
      },
      {
        name: "No Alex",
        imgSrc: "13",
        autoPlaySettings: [false, false],
        language: "English",
        myList: [
          { name: "The Walking Dead", liked: true },
          { name: "Mad Max: Fury Road", liked: true },
          { name: "Murderer", liked: false },
          { name: "Rick and Morty", liked: true },
          { name: "Leviathan", liked: false },
          { name: "Shawshank redemption", liked: false },
          { name: "Fight club", liked: true },
          { name: "Mulholland Drive", liked: false },
          { name: "Аdolescence", liked: false },
          { name: "Oldboy", liked: true },
        ],
      },
    ],
  },
];

app.use(express.json());

app.post("/process_post", function (request, response) {
  //need: {email, password, plan, users[]}
  data.push(request.body);
  response.json(data[data.length - 1]);
  console.log(data[data.length - 1]);
});

app.post("/process_post_profile", function (request, response) {
  //need: {email, profile{name, language, autoPlaySettings, imgSrc, myList[]}}
  let temp = ((_) => (_ > -1 ? _ : Infinity))(
    data.findIndex((_) => _.email == request.body.email)
  );
  data[temp].users.push(request.body.profile);
  response.json(data[temp]);
  console.log(data[temp]);
});

app.post("/process_remove_profile", function (request, response) {
  //need: {email, name}

  let account = ((_) => (_ > -1 ? _ : Infinity))(
    data.findIndex((_) => _.email == request.body.email)
  );
  console.log(data);
  console.log(account);
  data[account].users.splice(
    ((_) => (_ > -1 ? _ : Infinity))(
      data[account].users.findIndex((_) => _.name == request.body.name)
    ),
    1
  );
  console.log(data[account]); // your JSON
});

app.post("/process_edit_profile", function (request, response) {
  //need: {email, (oldName and newName) or name}
  if (!request.body.oldName) {
    request.body.oldName = request.body.name;
  }

  let account = data.findIndex((_) => _.email == request.body.email);
  if (account === -1) {
    console.log("account: -1");
    return;
  }
  let prof = data[account].users.findIndex(
    (_) => _.name == request.body.oldName
  );

  if (prof === -1) {
    console.log("prof: -1");
    return;
  }
  console.log(request.body);
  console.log(data[account].users[prof].myList);

  if (request.body.newName)
    data[account].users[prof].name = request.body.newName;
  if (request.body.language)
    data[account].users[prof].language = request.body.language;
  if (request.body.autoPlaySettings)
    data[account].users[prof].autoPlaySettings = request.body.autoPlaySettings;
  if (request.body.myList)
    data[account].users[prof].myList = request.body.myList;
  if (request.body.imgSrc)
    data[account].users[prof].imgSrc = request.body.imgSrc;
  console.log("---------------------------------------------");
  console.log(data[account].users[prof].myList);
});

app.post("/process_remove", function (request, response) {
  //need: {email}
  try {
    data.splice(
      ((_) => (_ > -1 ? _ : Infinity))(
        data.findIndex((_) => _.email == request.body.email)
      ),
      1
    );
  } catch (e) {
    console.log("errrrror" + e);
  }
  console.log(data); // your JSON
});

app.get("/api", function (request, response) {
  // let temp = data.map((e) => {
  //   return { email: e.email, password: e.password };
  // });
  response.json(data);
});

app.post("/api_account", function (request, response) {
  //need: {email}

  response.json(
    data.find((e) => {
      if (e.email === request.body.email) return e;
    })
  );
});

app.post("/api_profile", function (request, response) {
  //need: {email, name}
  if (request.body.name == "" || request.body.email == "") {
    response.json(data[0].users[0]);
    return;
  }
  response.json(
    data
      .find((e) => {
        if (e.email === request.body.email) return e;
      })
      .users.find((_) => {
        if (_.name === request.body.name) return _;
      })
  );
});

app.listen(3000);
