//helper function to make sure that a valid user is logged in to access different api endpoints
//checks for the existance of a req.user property from the apiRouter middleware
function requireUser(req, res, next) {
    //if there is no user in the req body then display an error
    if(!req.user) {
        next({
            name: 'MissingUserError',
            message: 'You must be logged in to perform this action'
        });
    }

    //otherwise move on to the next matching middleware
    next();
}


function requireActiveUser(req, res, next) {

}


function requireAdmin(req, res, next) {

}

module.exports = {
    requireUser,
    requireActiveUser,
    requireAdmin
}