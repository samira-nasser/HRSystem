const UserModel = require('../models/Users');
const departmentModel = require('../models/Departments');
const jwt = require('jsonwebtoken');
require('dotenv').config();
require('dotenv').config({ path: __dirname + '/.env' });
const JWT_SECRET = process.env.JWT_SECRET;

//Create a passport middleware to handle user registration
exports.signup = async (req, res) => {
    try {
        let userData = req.body;
        let departmentID = userData.DepartmentID;
        let department = await departmentModel.find({ where: { id: departmentID } });
        if (department) {
            let user = await UserModel.create(userData);
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
        }
        else {
            return res.status(404).json({
                message: 'Department ID Is Not Supported , Department for this user not found!'
            });
        }

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });

    }
}

//Create a passport middleware to handle User login
exports.login = async (req, res) => {
    const Email = req.body.Email;
    const Password = req.body.Password;
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
        user.token = jwt.sign({ user: body }, JWT_SECRET);

        return res.status(200).json({
            message: "User is logged in Successfully",
            data: user
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};


