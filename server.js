const express = require("express");
const sqlite3 = require("better-sqlite3");
const nunjucks = require("nunjucks");
const session = require('express-session');
const path = require('path');
const app = express();
const isAdmin = (req, res, next) => {
  if(req.session?.roles !== 100){
    return res.status(401).send("You cannot view this page.")
  }
  next();
}
const isLoggedIn = (req, res, next) => {
  if(!req.session?.username){
    return res.redirect('/login')
  }
  next();
}

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
nunjucks.configure("views", { express: app });
app.use(session({
  secret:'a very strong secret',
  resave: false,
  saveUninitialized: true
}));

app.get("/", (req, res) => {
  res.render(path.resolve(__dirname,'views/packagesView.html'));
});

app.use((req, res) => {
  res.status(404).send("404 not found");
});

app.listen(3000, "localhost", () => {
  console.log("listening to http://localhost:3000");
});
