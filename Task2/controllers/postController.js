const db = require('../models/index.js');
const uploadFile = require('../middleware/postFileUpload.js');
const Posts = db.posts;
const Users = db.users;


// 1. add new post

const addPost = async (req, res) => {
    try {
        let newpost = {
            postId: req.body.postId,
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            userId: req.body.userId
        }
        const post = await Posts.create(newpost);

        res.status(201).json({
            success: true,
            message: 'Post created successfully',
            post: post
        })

    } catch (error) {
        // console.error('Error adding user:', error.errors[0].message);
        // console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

// 2. update post by there id

const updatePost = async (req, res) => {
    try {
        const id = req.params.id;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: "Invalid id format. Please provide an integer value." });
        }
        const updatedPosts = await Posts.update(req.body, { where: { postId: id, status: "Active" } });

        if (updatedPosts > 0) {
            res.status(200).json({
                success: true,
                message: "Post updated succefully",
                post: updatedPosts[0]
            })
        }
        else {
            res.status(404).json({ error: "Post not found" })
        }
    } catch (error) {
        console.error("Error occurred while processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// 3. soft delete   

const postSoftDelete = async (req, res) => {
    try {
        const id = req.params.id;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: "Invalid id format. Please provide an integer value." });
        }
        const softDeletePost = await Posts.update({ status: "Deleted" }, { where: { postId: id, status: "Active" } });

        if (softDeletePost > 0) {
            console.log(softDeletePost);
            res.status(200).json({
                success: true,
                message: 'Post soft deleted successfully',
                user: softDeletePost[0]
            });
        } else {
            res.status(404).json({ error: "Post not found" });
        }

    } catch (error) {
        console.error("Error occurred while processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// 4. hard delete

const postHardDelete = async (req, res) => {
    try {
        const id = req.params.id;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: "Invalid id format. Please provide an integer value." });
        }

        const hardDeletePost = await Posts.destroy({ where: { postId: id } });
        if (hardDeletePost > 0) {
            console.log(hardDeletePost);
            res.status(200).json({
                status: true,
                message: 'Post deleted successfully',
                count: hardDeletePost
            })
        }
        else {
            res.status(404).json({ error: "Post not found" });
        }

    } catch (error) {
        console.error("Error occurred while processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// 5. get post by id

const getPostById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: "Invalid id format. Please provide an integer value." });
        }
        const post = await Posts.findOne({ attributes: ['postId', 'title', 'description'], where: { postId: id, status: "Active" } });
        if (post) {
            res.status(200).send(post);
        }
        else {
            res.status(404).json({ error: "Post not found." })
        }

    } catch (error) {
        console.error("Error occurred while fetching user post:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


// 6. get all post

const getAllRequest = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 5;

        const offset = (page - 1) * pageSize;

        // const posts = await Posts.findAll({ offset: offset, limit: 5, order: [[Sequelize.fn('CHAR_LENGTH', Sequelize.col('title')), 'ASC']] });
        const posts = await Posts.findAll({ offset: offset, limit: 5, order: [['updatedAt', 'DESC']] });
        // const posts =await Posts.findAll({where : {status:"Active"}});
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

const getPostWithUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: "Invalid id format. Please provide an integer value." });
        }
        const post = await Posts.findOne(
            {
                attributes: ['postId', 'title', 'description'],
                include: [{
                    model: Users,
                    as: 'userDetails',
                    attributes: ['id', 'name', 'email', 'phone']
                }],
                where: { postId: id, status: "Active" }
            }
        );
        if (post) {
            res.status(200).send(post);
        }
        else {
            res.status(404).json({ error: "Post not found." })
        }
    }
    catch (error) {
        console.error("Error occurred while fetching posts:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// 8. upload files into database

const uploadFiles = async (req, res) => {
    try {
        const files = req.files;
        console.log(files);
        const id = Number(req.body.id);
        const filePaths = files.map(file => file.path);
        const postfiles = {
            "Files": filePaths
        }
        const fileSending = await Posts.update({ filepath: postfiles }, { where: { postId: id } });
        if (fileSending > 0) {
            res.status(200).json({ message: 'File uploaded successfully', file: fileSending });
        }
        else {
            res.status(404).json({ error: "Post not found." });
        }
    } catch (error) {
        console.error("Error occurred while sending files:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    addPost,
    getAllRequest,
    getPostById,
    updatePost,
    getPostWithUser,
    postSoftDelete,
    postHardDelete,
    uploadFiles
}