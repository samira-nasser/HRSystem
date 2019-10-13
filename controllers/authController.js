const UserModel = require('../models/Users');
const jwt = require('jsonwebtoken');

//Create a passport middleware to handle user registration
exports.signup = async (req, res) => {
    try {
        let user = await UserModel.create(req.body);
        user = JSON.parse(JSON.stringify(user))
        user.Password = undefined;
        delete user.Password;

        const body = { id: user.id, Email: user.Email, isAdmin: user.IsAdmin };
        // let response = Object.assign({}, user);
        user.token = jwt.sign({ user: body }, 'top_secret');
        return res.status(200).json({
            message: 'New User Added Successfully',
            data: user
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });

    }
}

//Create a passport middleware to handle User login
exports.login = async (req, res) => {
    const Email = req.body.Email ;
    const Password = req.body.Password ;
    try {

        let user = await UserModel.findOne({ where: { Email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const validate = await user.isValidPassword(Password);

        if (!validate) {
            return res.status(400).json({ message: 'Wrong Password' });
        }
        user = JSON.parse(JSON.stringify(user))
        user.Password = undefined;
        delete user.Password;

        const body = { id: user.id, Email: user.Email, isAdmin: user.IsAdmin };
        // let response = Object.assign({}, user);
        user.token = jwt.sign({ user: body }, 'top_secret');
        
        return res.status(200).json({
            message:"User is logged in Successfully" ,
            data : user
        });

    } catch (error) {
        return res.status(400).json({
            message : error.message
        });
    }
};


