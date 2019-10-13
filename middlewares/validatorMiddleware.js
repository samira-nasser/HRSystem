var validator = require('validator');

exports.checkEmailValidation = (req, res, next) => {
    let Email = req.body.Email || '';
    if (validator.isEmpty(Email)) {
        return res.status(500).json({
            message: 'Validation error: Email is required !'
        });
    } else {
        if (!validator.isEmail(Email)) {
            return res.status(500).json({
                message: 'Validation error: Please Enter Valid Email !'
            });
        }
        else
            next();
    }

};

exports.checkEmptyPhone = (req, res, next) => {
    let Phone = req.body.Phone || '';
    if (validator.isEmpty(Phone)) {
        return res.status(500).json({
            message: 'Validation error: Please Enter valid Phone !'
        });
    } else
        next();

};