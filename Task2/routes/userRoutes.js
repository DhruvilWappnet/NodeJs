const userControllers = require('../controllers/userController.js');

const router = require('express').Router();

router.get('/', userControllers.getAllUser);                     
router.post('/', userControllers.addUser);
router.patch('/:id', userControllers.updateUser);
router.get('/:id', userControllers.getUserByid);

router.get('/get/:id', userControllers.viewUserPostById);

router.patch('/softDelete/:id', userControllers.userSoftDelete);
router.delete('/hardDelete/:id', userControllers.userHardDelete);

module.exports = router;





/*
{
    "email":"dhruvildweqwe@email.com",
    "name":"Dhruvil",
    "phone":1234567890,
    "status":"Active"
}
*/