const express = require("express");
const sqlite3 = require("better-sqlite3");
const nunjucks = require("nunjucks");
const session = require("express-session");
const path = require("path");
const app = express();
const Functions = require("./models/dbModel");
const paymentCalculator = require("./models/paymentCalculator")
const countryList = require("./models/countryList").countryList
const isAdmin = (req, res, next) => {
  if (!req.session?.role.includes("Admin")) {
    return res.status(401).send("You cannot view this page.");
  }
  next();
};
const isCustomer = (req, res, next) => {
  if (!req.session?.role.includes("Customer")) {
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
    saveUninitialized: true
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

app.get("/packages",isLoggedIn,isCustomer, (req, res) => {
  console.log(req.session)
  res.render(path.resolve(__dirname, "views/customerpage.html"), { packages: Functions.getSenderPackages(req.session.ssn),userSSN: req.session.ssn });
});

app.get("/user/sentPackages/:Customer_SSN",isLoggedIn, isCustomer, (req, res) => {
  var Packages = Functions.getSenderPackages(req.params.Customer_SSN);
  res.send(JSON.stringify(Packages));
});
app.get("/user/incomingPackages/:Customer_SSN",isLoggedIn,isCustomer, (req, res) => {
  var Packages = Functions.getIncomingPackages(req.params.Customer_SSN);
  res.send(JSON.stringify(Packages));
});
app.get("/admin/packageInfo/:Package_number", (req, res) => {
  var Packages = Functions.getPackagesInfoByNumber(req.params.Package_number);
  res.send(JSON.stringify(Packages));
});
app.post("/admin/updatePackageInfo/:Package_number", (req, res) => {
  var Package = Functions.updatePackageInfo(req.body);
  res.send(JSON.stringify(Package));
});

app.post("/admin/addPackage/", (req, res) => {
  var Package = Functions.addPackage(req.body);
  res.send(JSON.stringify(Package));
});

app.post("/admin/deletePackage/:Package_number", (req, res) => {
  var Package = Functions.deletePackage(req.params.Package_number);
  res.send(JSON.stringify(Package));
});

app.get("/pay/:package_number", (req, res) => {
  console.log("payed");
  var Packages = Functions.updatePay(req.params.package_number);
  res.end();
});

app.get("/Track/:Package_number", (req, res) => {
  var Packages = Functions.TrackPackage(req.params.Package_number);
  res.send(JSON.stringify(Packages));
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

app.get("/admin",isLoggedIn, isAdmin, (req, res) => {
  // res.render(path.resolve(__dirname,'views/adminMainPage.html'));
});

app.get("/admin/reports",isLoggedIn,isAdmin, (req, res) => {
  res.render(path.resolve(__dirname, "views/adminReportsPage.html"));
});

app.get("/admin/packages",isLoggedIn,isAdmin, (req, res) => {
  console.log(Functions.getPackagesInfo());
  res.render(path.resolve(__dirname, "views/adminPackagesPage.html"), { packages: Functions.getPackagesInfo() });
});

app.get("/admin/users",isLoggedIn, isAdmin, (req, res) => {
  // res.render(path.resolve(__dirname,'views/adminUsersPage.html'));
});
app.get("/account", isLoggedIn,isCustomer, (req,res)=>{
  
  let userInfo = Functions.getCompleteUserInformation(req.session.username)
  console.log(userInfo)
  res.render(path.resolve(__dirname,"views/userProfile.njk"), { countryList: countryList, userInfo: userInfo})
})
app.post("/signup", (req,res)=>{
  console.log(req.body)
  try{
    Functions.addNewAccount(req.body)
    res.redirect("/login")
  }catch(e){
    res.sendStatus(500)
  }
});

app.post("/login", (req,res)=>{
  let username = req.body.Username
  let password = req.body.Password 
  console.log(password)
  let dbPassword = Functions.getUserPassword(username)
  console.log(dbPassword)
  if(dbPassword==null){
    res.sendStatus(403)
    return;
  }
  if(password===dbPassword.Password){
    let userSSN = Functions.getUserSSN(username)
    let userRoles = Functions.getUserRole(username)
    req.session.username = username
    req.session.ssn = userSSN
    req.session.role = userRoles
    console.log(req.session)
    if(userRoles.includes("Admin")){
      res.redirect('/admin/reports')
    }else{
      res.redirect('/packages')
    }
  }else{
    res.sendStatus(403)
  }
})

app.post("/logout", (req,res)=>{
  req.session.destroy();
  res.redirect('/')
})

app.post("/account", isLoggedIn,isCustomer, (req,res)=>{
  try{
    let userData = req.body
    userData.SSN = req.session.ssn
    userData.Username = req.session.username
    console.log(userData)
    Functions.updateCompleteUserInformation(userData)
    res.redirect("/account")
  }catch(e){
    console.log(e)
    res.sendStatus(500)
  }
})

app.post("/admin/reports/:type", isLoggedIn, isAdmin, (req,res)=>{
  let type = req.params.type
  if(type==="payments"){
    let completed_payments = Functions.getCompletedPayments()
    let data = []
    completed_payments.forEach(element => {
      let payment = paymentCalculator.calculatePayment(element)
      data.push({
        Package_number: element.Package_number,
        Payment: payment
      })
    });
    res.send(JSON.stringify(data))
  }else if(type==="packagedates"){
    let dates = req.body
    let packages = Functions.getPackagesBetweenDates(dates.Time1, dates.Time2)
    let data = []
    packages.forEach(element => {
      let payment = paymentCalculator.calculatePayment(element)
      data.push({
        Package_number: element.Package_number,
        Payment: payment
      })
    });
    res.send(JSON.stringify(data))
  }else if(type==="packagetypes"){
    let dates = req.body
    let packages = Functions.getPackagesBetweenDatesCountedCategory(dates.Time1, dates.Time2)
    res.send(JSON.stringify(packages))
  }
})

app.use((req, res) => {
  res.status(404).send("404 not found");
});

app.listen(3000, "localhost", () => {
  console.log("listening to http://localhost:3000");
});
