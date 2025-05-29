const {User, Role} = require('../models');
const md5 = require('md5');
const passport = require('passport');

module.exports.renderRegistrationForm = async function(req,res){
    const roles = await Role.findAll();
    console.log(roles);
    res.render('users/register', {roles});
}
//17
module.exports.register = async function(req,res){
    await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: md5(req.body.password),
        role_id: req.body.role
    });
    res.redirect('/login')
}

module.exports.renderLogin = function(req,res){
    res.render('users/login');
}

module.exports.loginUser = passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
});

module.exports.logout = function(req, res,next){
    req.logout(function (err){
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    })
}