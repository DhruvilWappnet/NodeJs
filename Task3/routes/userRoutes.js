const userControllers = require('../controllers/userControllers.js');
const verifyOtp = require('../middleware/verifyOtp_middleware.js')
const checkSession = require('../middleware/sessionAuth.js');
const schemas = require('../validators/userSchemas.js')
const dataValidation = require('../validators/userValidator.js')
const router = require('express').Router();


router.get('/', checkSession, userControllers.getAllUser);
router.post('/', userControllers.addUser);


router.post('/login', verifyOtp, userControllers.userLogin);
router.post('/register', dataValidation(schemas.userRegister), userControllers.userRegister);

// router.get('/verify', authenticateUpdatePassUser, userControllers.verifytoken); 
// router.patch('/changePass',authenticateUser,userControllers.changePassword);
// router.post('/forgotPass',userControllers.forgotPassword);
// router.patch('/resetPass',authenticateUpdatePassUser,userControllers.resetPassword); 

// router.patch('/upload', uploadFileMiddleware,authenticateUser, userControllers.uploadFiles);
router.get('/getPost', checkSession, userControllers.viewUserPostById);

router.patch('/softDelete', checkSession, userControllers.userSoftDelete);
router.delete('/hardDelete', checkSession, userControllers.userHardDelete);


router.post('/logout', checkSession, userControllers.logout);
router.post('/sendOtp', userControllers.sendOtp);

router.get('/:email', checkSession, userControllers.getUserByemail);
router.patch('/:email', checkSession, userControllers.updateUser);


module.exports = router;

