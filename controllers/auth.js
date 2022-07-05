const bcrypt = require("bcryptjs");

const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login.ejs", {
    pageTitle: "Login",
    isLogged: false,
  });
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.redirect("/login");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save((err) => {
            if (err) {
                console.log("Could not save session due: ", err);
            }
          res.redirect("/");
        });
      }
      res.redirect("/login");
  } catch (error) {
    console.log(error);
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
  });
};

exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.redirect("/signup");
    }
    const hashedPW = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPW,
      itenList: [],
    });
    await user.save();
    return res.redirect("/login");
  } catch (error) {
    console.log("Could not register due: ", error);
  }
};