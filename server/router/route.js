const {Router} = require("express");
const router = Router();

const controllers  = require("../controllers/appController.js");
const auth = require("../middleware/auth.js");
const mail = require("../controllers/mailer.js");
//post
router.route('/register').post(controllers.register);

router.route('/registerMail').post(mail.registerMail);

router.route('/authenticate').post(controllers.verifyUser, (req, res) => res.end());

router.route('/login').post(controllers.verifyUser, controllers.login)

//get
router.route('user/:username').get(controllers.getUser);

router.route('/generateOTP').get( controllers.verifyUser, auth.localVariables, controllers.generateOTP);

router.route('/verifyOTP').get(controllers.verifyUser, controllers.verifyOTP)

router.route('/createResetSession').get(controllers.createResetSession)

//PUT
router.route('/updateUser').put(auth.verifyToken, controllers.updateUser)

router.route('/resetPassword').put(controllers.verifyUser, controllers.resetPassword)

module.exports = router;