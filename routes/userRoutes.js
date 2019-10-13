var express = require('express');
var router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController.js');
const userController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');
const validatorMiddleware = require('../middlewares/validatorMiddleware');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup',validatorMiddleware.checkEmailValidation,validatorMiddleware.checkEmptyPhone, authController.signup);

router.post('/login', authController.login);

// To Check and verify the token if exist 
router.use(passport.authenticate('jwt', { session : false }))

router.post('/addEmployee',validatorMiddleware.checkEmailValidation,validatorMiddleware.checkEmptyPhone,authMiddleware.isAdmin, userController.addEmployee);

router.post('/deleteEmployee',authMiddleware.isAdmin, userController.deleteEmployee);

router.post('/updateEmployee', userController.updateEmployee);

router.get('/getAllEmployees',authMiddleware.isAdmin, userController.getAllEmployees);

router.post('/getEmployeeByID',authMiddleware.isAdmin, userController.getEmployeeByID);

module.exports = router;
