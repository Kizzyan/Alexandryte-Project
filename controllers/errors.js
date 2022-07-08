exports.get404 = (req, res, next) => {
  res.status(404).render("errors/404.ejs", {
    pageTitle: "Error",
    isLogged: req.session.isLoggedIn,
  });
};

exports.get500 = (req, res, next) => {
  res.status(500).render("errors/500.ejs", {
    pageTitle: "Error",
    isLogged: req.session.isLoggedIn,
  });
};
