const passport = require('passport');
const {Strategy} = require('passport-local').Strategy;
const {User, Role} = require('../models');
const md5 = require('md5');

//called on authenticate to test user credentials
async function verifyUser(username, password, done){
    //fetching user from database
    const user = await User.findOne({
        where: {
            email: username,
            password: md5(password)
        }
    });
    //failure message if failed
    if (!user) {
        return done(null, false, {message: 'Incorrect email or password.'});
    }
    //passed
    return done(false, {
        id: user.id,
    });
}

passport.use(
    new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        verifyUser
    )
);

//turns user object into an object that can be passed into a cookie
passport.serializeUser(function(user, done) {
    process.nextTick(function () {
        done(null, {id: user.id});
    });
});

//turn serialized object back into an object
passport.deserializeUser(async function (user, done) {
    const userModel = await User.findByPk(user.id, {
        include: [
            'role'
        ]
    });
    process.nextTick(function () {
        return done(null, userModel);
    });
});

module.exports.passport = passport;