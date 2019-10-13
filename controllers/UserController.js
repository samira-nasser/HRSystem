const UserModel = require('../models/Users');
const DepartmentModel = require('../models/Departments');
const jwt = require('jsonwebtoken');


exports.addEmployee = function (req, res) {
    UserModel.create(req.body)
        .then(function () {
            return res.status(200).json({
                message: "User Added Successfully"
            });
        })
        .catch(function (error) {
            return res.status(400).json({
                message: error.message
            });
        })
}

exports.deleteEmployee = function (req, res) {
    employeeID = req.body.id;
    UserModel.destroy({ where: { id: employeeID } })
        .then(function () {
            return res.status(200).json({
                message: "User is Deleted Successfully"
            });
        })
        .catch(function (error) {
            return res.status(400).json({
                message: error.message
            });
        })
}

exports.updateEmployee = function (req, res) {
    let userOBj = req.body;
    let userID;
    if (req.user.IsAdmin)
        userID = req.body.id;

    else {
        if (req.body.id)
            delete req.body.id;
        userID = req.user.id;
    }

    UserModel.update(userOBj, { where: { id: userID } })
        .then(function () {
            return res.status(200).json({
                message: "User is Updated Successfully"
            });
        })
        .catch(function (error) {
            return res.status(400).json({
                message: error.message
            });
        })
}

exports.getAllEmployees = function (req, res) {
    let query = getQuery();

    UserModel.findAll(query)

        .then(function (Employees) {
            return res.status(200).json({
                message: "All Data Retrieved Successfully",
                data: Employees
            });
        })
        .catch(function (error) {
            return res.status(400).json({
                message: error.message
            });
        })
}

exports.getEmployeeByID = function (req, res) {
    let userID = req.body.id;
    let query = getQuery();
    query.where = { id: userID };
    UserModel.findAll(query)

        .then(function (Employee) {
            return res.status(200).json({
                message: "User Data Retrieved Successfully",
                data: Employee
            });
        })
        .catch(function (error) {
            return res.status(400).json({
                message: error.message
            });
        })
}

function getQuery() {
    let query = {
        //        limit: 50, // this will retrive the last 50 rows (limit)
        //        offset: offset,
        order: [['id', 'DESC']],
        attributes: [['id', 'EmployeeID'], 'Name', 'Email', 'ManagerID', 'IsAdmin'],
        include: [
            {
                duplicating: false,
                as: 'DepartmentEmployees',
                model: DepartmentModel,
                attributes: ['id', ['Name', 'DepartmentName']],
                required: false
            }
        ]
    };
    return query;
}

