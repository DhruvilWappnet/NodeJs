const postControllers = require('../controllers/postController.js');
const uploadFileMiddleware = require('../middleware/postFileUpload.js');
const router = require('express').Router();

router.get('/', postControllers.getAllRequest);
router.post('/', postControllers.addPost);


router.get('/get/:id', postControllers.getPostWithUser)
router.patch('/softDelete/:id', postControllers.postSoftDelete)
router.delete('/hardDelete/:id', postControllers.postHardDelete)
router.patch('/upload/:id', uploadFileMiddleware, postControllers.uploadFiles);

router.get('/:id', postControllers.getPostById);
router.patch('/:id', postControllers.updatePost);

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