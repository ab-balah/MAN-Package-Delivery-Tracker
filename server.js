const express = require("express");
const sqlite3 = require("better-sqlite3");
const nunjucks = require("nunjucks");
const session = require("express-session");
const path = require("path");
const app = express();
const Functions = require('./models/dbModel')
const isAdmin = (req, res, next) => {
  if (req.session?.roles !== 100) {
    return res.status(401).send("You cannot view this page.");
  }
  next();
};
const isLoggedIn = (req, res, next) => {
  if (!req.session?.username) {
    return res.redirect("/login");
  }
  next();
};

app.use(express.static("public"));
app.use("/admin", express.static("public"));
app.use("/packages", express.static("public"));
app.use("/packages", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
nunjucks.configure("views", { express: app });

app.use(
  session({
    secret: "a very strong secret",
    resave: false,
    saveUninitialized: true,
  })
);

const dummyPackages = {
  data: [
    {
      Package_number: 123456789,
      Destination: "Dammam",
      Value: 500,
      Sender_SSN: 1021263619,
      Receiver_SSN: 1120267677,
      RC_ID: 1,
      Time: "2021-05-01 12:00:00",
    },
    {
      Package_number: 987654321,
      Destination: "Riyadh",
      Value: 200,
      Sender_SSN: 1111111111,
      Receiver_SSN: 2222222222,
      RC_ID: 1,
      Time: "2020-04-01 12:00:00",
    },
  ],
};

app.get("/", (req, res) => {
  res.render(path.resolve(__dirname, "views/mainPage.html"));
});

app.get("/about", (req, res) => {
  // res.render(path.resolve(__dirname,'views/aboutPage.html'));
});

app.get("/packages", (req, res) => {
  
  res.render(path.resolve(__dirname, "views/customerpage.html"),{packages:Functions.getSenderPackages('1')});
 });

app.get("/user/sentPackages/:Customer_SSN",(req, res) => {
    var Packages = Functions.getSenderPackages(req.params.Customer_SSN)
    res.send(JSON.stringify(Packages))
 
 });
 app.get("/user/incomingPackages/:Customer_SSN",(req, res) => {
  var Packages = Functions.getIncomingPackages(req.params.Customer_SSN)
  res.send(JSON.stringify(Packages))

});
app.get("/pay/:package_number",(req, res) => {
  console.log('payed')
  var Packages = Functions.updatePay(req.params.package_number)
  res.end()
});

app.get("/package/:id", (req, res) => {
  // res.render(path.resolve(__dirname,'views/packageInfoPage.html'));
});

app.get("/login", (req, res) => {
  res.render(path.resolve(__dirname, "views/loginPage.html"));
});

app.get("/signup", (req, res) => {
  res.render(path.resolve(__dirname, "views/signupPage.html"));
});

app.get("/admin", (req, res) => {
  // res.render(path.resolve(__dirname,'views/adminMainPage.html'));
});

app.get("/admin/reports", (req, res) => {
  res.render(path.resolve(__dirname, "views/adminReportsPage.html"));
});

app.get("/admin/packages", (req, res) => {
  res.render(
    path.resolve(__dirname, "views/adminPackagesPage.html"),
    dummyPackages
  );
});

app.get("/admin/users", (req, res) => {
  // res.render(path.resolve(__dirname,'views/adminUsersPage.html'));
});

app.post("/signup", (req,res)=>{
  console.log(req.body)
  try{
    Functions.addNewAccount(req.body)
  }catch(e){
    res.sendStatus(500)
  }
})

app.use((req, res) => {
  res.status(404).send("404 not found");
});

app.listen(3000, "localhost", () => {
  console.log("listening to http://localhost:3000");
});
