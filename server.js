const express = require("express");
const sqlite3 = require("better-sqlite3");
const nunjucks = require("nunjucks");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
nunjucks.configure("views", { express: app });

app.get("/", (req, res) => {
  res.render("C:/Users/xmxm7/Desktop/GitHub/ICS-321_Project/views/packagesView.html");
});

app.use((req, res) => {
  res.status(404).send("404 not found");
});

app.listen(3000, "localhost", () => {
  console.log("listining to http://localhost:3000");
});
