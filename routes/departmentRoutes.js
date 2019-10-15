var express = require('express');
var router = express.Router();
const passport = require('passport');
const departmentController = require('../controllers/departmentsController');

// To Check and verify the token if exist 
router.use(passport.authenticate('jwt', { session : false }))

router.post('/addDepartment', departmentController.addDepartment);


module.exports = router;
