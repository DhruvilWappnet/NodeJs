const userControllers = require('../controllers/userController.js');
const uploadFileMiddleware = require('../middleware/userFileUpload.js');
const { authenticateUser } = require('../middleware/auth.js');
const userValidator = require('../validators/userValidator.js')
const router = require('express').Router();

router.get('/', userControllers.getAllUser);
router.post('/', userControllers.addUser);


// user login - signup
router.get('/login', userControllers.userLogin);
router.post('/register', userValidator, userControllers.userRegister);
router.get('/verify', authenticateUser, userControllers.verifytoken);


router.get('/getPost/:id', authenticateUser, userControllers.viewUserPostById);
router.patch('/softDelete/:id', authenticateUser, userControllers.userSoftDelete);
router.delete('/hardDelete/:id', authenticateUser, userControllers.userHardDelete);
router.patch('/upload/:id', uploadFileMiddleware, userControllers.uploadFiles);

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