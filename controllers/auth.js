exports.getLogin = (req,res,next) => {
    res.render('auth/login.ejs', {
        pageTitle: 'Login'
    })
}

exports.getSignup = (req,res,next) => {
    res.render('auth/signup.ejs', {
        pageTitle: 'Signup'
    })
}