const db = require('../models/index.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createToken } = require('../middleware/auth.js');
// const { tokenManager } = require('../middleware/auth.js');
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
        const id = req.body.id;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: "Invalid id format. Please provide an integer value. 1" });
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
        const id = req.body.id;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: "Invalid id format. Please provide an integer value. 2" });
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
        const id = req.body.id;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: "Invalid id format. Please provide an integer value. 3" });
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
        const id = req.body.id;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: "Invalid id format. Please provide an integer value. 4" });
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
        const id = req.body.id;
        if (!Number.isInteger(Number(id))) {
            return res.status(400).json({ error: "Invalid id format. Please provide an integer value. 5" });
        }

        const data = await Users.findOne({
            attributes: ['id', 'name', 'email', 'phone'],
            include: [{
                model: Posts,
                as: 'postDetails',
                attributes: ['postId', 'title', 'description', 'status']
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

// 8. upload files by id

const uploadFiles = async (req, res) => {
    try {
        const files = req.file;
        const id = Number(req.body.id);
        const filePath = files.path;
        const fileSending = await Users.update({ filepath: filePath }, { where: { id: id } });
        if (fileSending > 0) {
            res.status(200).json({ message: 'File uploaded successfully', file: fileSending });
        }
        else {
            res.status(404).json({ error: "User not found." });
        }
    } catch (error) {
        console.error("Error occurred while sending files:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// 9. Register user

const userRegister = async (req, res) => {
    try {
        const password = req.body.password;
        const encrptPassword = await bcrypt.hash(password, 10);
        let newuser = {
            id: req.body.id,
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            status: req.body.status,
            password: encrptPassword
        }
        // console.log(newuser);
        const existingUser = await Users.findOne({ where: { id: newuser.id } });
        if (existingUser) {
            return res.status(400).json({ error: "User already exits" });
        }
        const user = await Users.create(newuser);

        res.status(201).json({
            success: true,
            message: 'User registed successfully.',
            user: {
                "id": user.id,
                "name": user.name,
                "email": user.email
            }
        });
    } catch (error) {
        // console.error('Error adding user:', error.errors[0].message);
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

// 10. Login user 

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // const email=req.body.email;
        console.log(email);
        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Password invalid." });
        }
        const data = {
            "email": user.email,
            "id": user.id
        }
        const token = createToken(data);

        res.status(200).json({
            status: true,
            message: "User loged in succefully",
            token: token
        })
    }
    catch (error) {
        console.error('Error occurred while logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const verifytoken = async (req, res) => {
    try {
        console.log("Body:");
        console.log(req.body);
        res.status(200).json(
            {
                status: true,
                message: "Token is verified"
            }
        );
    } catch (error) {
        // console.error('Error occurred while logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



module.exports = {
    addUser,
    updateUser,
    getAllUser,
    getUserByid,
    userSoftDelete,
    userHardDelete,
    viewUserPostById,
    uploadFiles,
    userRegister,
    userLogin,
    verifytoken
}


