const User = require('../models/User')
const jwt = require('jsonwebtoken');

const authController = {
    login: async(req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email })
            .populate('role');

            if (!user) {
              return res.status(401).json({email: "Adresse email incorrecte"});
            }

            const isPasswordValid = await user.comparePassword(password);
            
            if (!isPasswordValid) {
              return res.status(401).json({ password: 'Mot de passe incorrecte' });
            }
            const token = jwt.sign({
                id: user._id,
                role: user.role.name
            }, process.env.SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({ token })
          } catch (error) {
            return res.status(500).json({ error: "Echec d'authentification.", errorText: error });
        }
    }
}

module.exports = authController