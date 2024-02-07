const jwt = require('jsonwebtoken');

function role(role) {
    return (req, res ,next) => {
        if(req.user.role !== role){
            return res.status(403).json({message: "Non autorisé"})
        }

        next();
    }
}

module.exports = role;