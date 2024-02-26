const userControllers = require('../controllers/userController.js');
const uploadFileMiddleware = require('../middleware/userFileUpload.js');
const { authenticateUser } = require('../middleware/auth.js');
const dataValidation = require('../validators/userValidator.js');
const schemas = require('../validators/userSchemas.js');
const router = require('express').Router();

const {authenticateUpdatePassUser} = require('../middleware/auth_forgotPassword.js');

router.get('/', userControllers.getAllUser);
router.post('/', userControllers.addUser);


router.post('/login', userControllers.userLogin);
router.post('/register', dataValidation(schemas.userRegister), userControllers.userRegister);
router.get('/verify', authenticateUpdatePassUser, userControllers.verifytoken); ///

router.patch('/changePass',authenticateUser,userControllers.changePassword);
router.post('/forgotPass',userControllers.forgotPassword);
router.patch('/resetPass',authenticateUpdatePassUser,userControllers.resetPassword);

router.patch('/upload', uploadFileMiddleware,authenticateUser, userControllers.uploadFiles);
router.get('/getPost/:id', authenticateUser, userControllers.viewUserPostById);
router.patch('/softDelete/:id', authenticateUser, userControllers.userSoftDelete);
router.delete('/hardDelete/:id', authenticateUser, userControllers.userHardDelete);

router.get('/id', authenticateUser, userControllers.getUserByid);
router.patch('/:id', authenticateUser, userControllers.updateUser);


module.exports = router;





/*
{
    "email":"dhruvildweqwe@email.com",
    "name":"Dhruvil",
    "phone":1234567890,
    "status":"Active"
}
*/