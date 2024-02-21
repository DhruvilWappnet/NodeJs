const db = require('../models/index.js')

const Users = db.users;
const Posts = db.posts;


// 1.adduser  -- post

const addUser = async (req, res) => {
    try {
        let newuser = {
            id: req.body.id,
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            status: req.body.status
        }

        const user = await Users.create(newuser);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: user
        })
    }
    catch (error) {
        console.error('Error adding user:', error.errors[0].message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            err: error.errors[0].message
        });
    }
}

// 2. update user

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: "Invalid id format. Please provide an integer value." });
        }
        const updatedUser = await Users.update(req.body, { where: { id: id } });
        if (updatedUser > 0) {
            console.log(updatedUser);
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                user: updatedUser[0]
            });
        } else {
            res.status(404).json({ error: "User not found" });
        }

    } catch (error) {
        console.error("Error occurred while processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

// 3. delete user - soft delete

const userSoftDelete = async (req, res) => {
    try {
        const id = req.params.id;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: "Invalid id format. Please provide an integer value." });
        }
        const softDeleteUser = await Users.update({ status: "Deleted" }, { where: { id: id, status: "Active" } });
        if (softDeleteUser > 0) {

            const softDeletePost = await Posts.update({ status: "Deleted" }, { where: { userId: id, status: "Active" } });
            console.log(softDeleteUser);
            res.status(200).json({
                success: true,
                message: 'User and associated posts soft deleted successfully',
                user: softDeleteUser[0]
            });
        } else {
            res.status(404).json({ error: "User not found" });
        }

    } catch (error) {
        console.error("Error occurred while processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// 4. delete user - hard delete

const userHardDelete = async (req, res) => {
    try {
        const id = req.params.id;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: "Invalid id format. Please provide an integer value." });
        }
        const hardDeleteUser = await Users.destroy({ where: { id: id } });
        if (hardDeleteUser > 0) {
            console.log(hardDeleteUser);
            res.status(200).json({
                success: true,
                message: 'User deleted successfully',
                count: hardDeleteUser
            });
        } else {
            res.status(404).json({ error: "User not found" });
        }

    } catch (error) {
        console.error("Error occurred while processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// 5. get users 

const getAllUser = async (req, res) => {
    try {
        const users = await Users.findAll({ where: { status: "Active" } });
        if (users) {
            res.status(200).send(users);
        }
        else {
            res.status(404).json({ error: "User not found" });
        }

    } catch (error) {
        console.error("Error occurred while fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

// 6. view user by id

const getUserByid = async (req, res) => {
    try {
        const id = req.params.id;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: "Invalid id format. Please provide an integer value." });
        }
        const user = await Users.findOne({ where: { id: id, status: "Active" } });

        if (user) {
            res.status(200).send(user);
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (error) {
        console.error("Error occurred while fetching user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// 7. all user post view by there id

const viewUserPostById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: "Invalid id format. Please provide an integer value." });
        }

        const data = await Users.findOne({
            attributes: ['id', 'name', 'email', 'phone'],
            include: [{
                model: Posts,
                as: 'postDetails',
                attributes: ['postId', 'title', 'description','status']
            }
            ],
            where: { id: id, status: "Active" }
        })
        if (data) {
            res.status(200).send(data);
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
    catch (error) {
        console.error("Error occurred while fetching user's post:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    addUser,
    updateUser,
    getAllUser,
    getUserByid,
    userSoftDelete,
    userHardDelete,
    viewUserPostById
}


