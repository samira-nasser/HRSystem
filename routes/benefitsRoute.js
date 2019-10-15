var express = require('express');
var router = express.Router();
const passport = require('passport');
const benefitsController = require('../controllers/benefitsController');
const authMiddleware = require('../middlewares/authMiddleware');

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// To Check and verify the token if exist 
router.use(passport.authenticate('jwt', { session : false }))

router.post('/addBenefits',authMiddleware.isAdmin,benefitsController.addBenefits);

router.post('/updateBenefits',authMiddleware.isAdmin, benefitsController.updateBenefits);

router.get('/deleteBenefits',authMiddleware.isAdmin, benefitsController.deleteBenefits);

router.post('/Search', benefitsController.searchForBenefits);

router.get('/getAllBenefits' , benefitsController.getAllBenefits);


module.exports = router;
