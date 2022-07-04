const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const homeRoutes = require("./routes/home");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

app.use(favicon(path.join(__dirname, "public", "img", "favicon.ico")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(homeRoutes);
app.use(authRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
  res.status(404).render("errors/404.ejs", {
    pageTitle: "Error",
  });
});

mongoose
  .connect(`${process.env.MONGO_DB_URI}`)
  .then(() => {
    console.log("Connected");
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log("Couldn't Connetct:", err));
