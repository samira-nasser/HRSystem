const DepartmentModel = require('../models/Departments');
const Sequelize = require('sequelize');

exports.addDepartment = function(req,res){
    DepartmentModel.create(req.body)
    .then(function(){
        return res.status(200).json({
            message : "Department Added Successfully"
        });
    })
    .catch(function(error){
        return res.status(400).json({
            message : error.message
        });
    })
}

