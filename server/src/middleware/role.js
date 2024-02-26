const jwt = require('jsonwebtoken');

function role(roles) {
    return (req, res ,next) => {
        if (Array.isArray(roles)) {     
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({message: "Non autorisé"})
            }
        }else{
            return res.status(403).json({message: "Non autorisé"})
        }


        next();
    }
}

module.exports = role;