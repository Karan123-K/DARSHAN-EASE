const bcrypt = require('bcryptjs');
const User = require('../models/users');
const generateToken = require('../utils/generateToken');

// register new user
const registerUser = async (req, res) => {
    const { name, email, password, role} = req.body;
    const user = await User.create({
        name: name,
        email: email,
        password: bcrypt.hashSync(password, 10),
        role: role
    });

    res.json(generateToken(user));
};

module.exports = registerUser;