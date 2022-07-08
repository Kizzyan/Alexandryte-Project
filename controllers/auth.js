const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("../models/user");
const { err } = require("../util/errorHandle");

exports.getLogin = (req, res, next) => {
  res.render("auth/login.ejs", {
    pageTitle: "Login",
    isLogged: false,
    valErrors: [],
    oldInput: {
      email: "",
      password: "",
    },
    errorMessage: req.flash("error"),
  });
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login.ejs", {
      pageTitle: "Login",
      isLogged: false,
      valErrors: errors.array(),
      oldInput: {
        email: email,
        password: password,
      },
      errorMessage: errors.array()[0].msg,
    });
  }

  try {
    const user = await User.findOne({ email: email });
    // if (!user) {
    //   req.flash('error', 'Email not found')
    //   return res.redirect("/login");
    // }
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (isMatch) {
    req.session.isLoggedIn = true;
    req.session.user = user;
    return req.session.save((err) => {
      if (err) {
        console.log("Could not save session due: ", err);
      }
      res.redirect("/");
    });
    // }
  } catch (error) {
    err(500, error, next);
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Could not logout due: ", err);
    }
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup.ejs", {
    pageTitle: "Signup",
    isLogged: false,
    valErrors: [],
    oldInput: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    errorMessage: req.flash("error"),
  });
};

exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render("auth/signup.ejs", {
      pageTitle: "Signup",
      isLogged: false,
      valErrors: errors.array(),
      oldInput: {
        email: email,
        password: password,
        confirmPassword: "",
      },
      errorMessage: errors.array()[0].msg,
    });
  }

  try {
    const hashedPW = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPW,
      itenList: [],
    });
    await user.save();
    return res.redirect("/login");
  } catch (error) {
    err(500, error, next);
  }
};
