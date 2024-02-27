const db = require('../models/index.js');
const Posts = db.posts;
const Users = db.users;



// 1. add new post

const addPost = async (req, res) => {
    try {

        const { email } = req.body;

        const user = await Users.findOne({ email });
        console.log(user._id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        let newpost = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            userId: user._id,
        }
        const post = await Posts.create(newpost);

        return res.status(201).json({
            success: true,
            message: 'Post created successfully',
            post: post
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

// 2. update post by there id
// 3. soft delete   
// 4. hard delete
// 5. get post by id
// 6. get all post

const getAllRequest = async (req, res) => {
    try {
        // const page = parseInt(req.query.page) || 1;
        // const pageSize = parseInt(req.query.pageSize) || 5;

        // const offset = (page - 1) * pageSize;

        // const posts = await Posts.findAll({ offset: offset, limit: 5, order: [[Sequelize.fn('CHAR_LENGTH', Sequelize.col('title')), 'ASC']] });
        // const posts = await Posts.findAll({ offset: offset, limit: 5, order: [['updatedAt', 'DESC']] });
        // const posts =await Posts.findAll({where : {status:"Active"}});

        const posts = await Posts.find();

        if (posts && posts.length > 0) {
            res.status(200).send(posts);
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error occurred while fetching posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
// 7. get post data with user info
// 8. upload files into database



module.exports = {
    getAllRequest,
    addPost
}