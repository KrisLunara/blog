module.exports = function(role){
    return function(req,res,next){
        if(!req.user.is(role)){
            res.redirect('/login');
            return;
        }

        next();
    }
}