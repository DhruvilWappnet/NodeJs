const postControllers = require('../controllers/postController.js');

const router = require('express').Router();

router.get('/', postControllers.getAllRequest);
router.post('/', postControllers.addPost);
router.get('/:id', postControllers.getPostById);
router.patch('/:id', postControllers.updatePost);


router.get('/get/:id', postControllers.getPostWithUser)
router.patch('/softDelete/:id', postControllers.postSoftDelete)
router.delete('/hardDelete/:id', postControllers.postHardDelete)


module.exports = router;

/*
{
    "postId":1,
    "title":"Going home",
    "description":"Hello I am form mehsna , going home via bus form ahemdabad.",
    "status":"Active",
    "userId":2
}
*/