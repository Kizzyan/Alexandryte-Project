const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csurf = require("csurf");
require("dotenv").config();

const User = require("./models/user");

const app = express();
const store = new MongoDBStore({
  uri: `${process.env.MONGO_DB_URI}`,
  collection: "sessions",
});

const csrfProtection = csurf();

app.set("view engine", "ejs");
app.set("views", "views");

const homeRoutes = require("./routes/home");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, "public", "img", "favicon.ico")));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isLogged = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(homeRoutes);
app.use(authRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
  res.status(404).render("errors/404.ejs", {
    pageTitle: "Error",
    isLogged: req.session.isLoggedIn,
  });
});

mongoose
  .connect(`${process.env.MONGO_DB_URI}`)
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => console.log("Couldn't Connetct:", err));
