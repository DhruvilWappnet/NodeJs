const db = require('../models/index');
const { generatOtp } = require('../services/otpGenerator.js');
const Users = db.users;
const Posts = db.posts;

// 1. Add user

const addUser = async (req, res) => {
    try {
        let newuser = {
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
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            err: error
        });
    }
}

// 2. update user

const updateUser = async (req, res) => {
    try {
        const email = req.session.email;
        const updateData = req.body;
        const updatedUser = await Users.findOneAndUpdate({ email: email }, updateData, { new: true });
        if (updatedUser) {
            // console.log(updatedUser);
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                user: updatedUser
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
        const email = req.session.email;
        const softDeleteUser = await Users.findOneAndUpdate({ email: email, status: "Active" }, { status: "Deleted" }, { new: true });
        if (softDeleteUser) {
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
        const email = req.session.email;
        const hardDeleteUser = await Users.deleteOne({ email: email });
        if (hardDeleteUser) {
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
        // const email = req.session.email;

        const users = await Users.find();
        if (users) {
            res.status(200).send(users);
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
        // res.status(200).json({
        //     status: true,
        //     email: email,
        //     data: req.sessionID
        // })

    } catch (error) {
        console.error("Error occurred while fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// 6. view user by email

const getUserByemail = async (req, res) => {
    try {

        const email = req.session.email;
        const user = await Users.findOne({ email: email }).select("-_id email name phone status");

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
        const email = req.session.email;
        console.log(email);
        const data = {
            user: "",
            post: ""
        }
        data.user = await Users.findOne({ email: email }).select("email name phone status");
        console.log(data.user);
        if (!data.user) {
            return res.status(404).json({ error: "User not found" });
        }
        data.post = await Posts.find({ userId: data.user._id }).select("-_id title description");
        res.status(200).json({ data });
    }
    catch (error) {
        console.error("Error occurred while fetching user's post:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// 8. upload files by id

// 9. Register user

const userRegister = async (req, res) => {
    try {
        let newuser = {
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            status: req.body.status
        }
        const user = await Users.exists({ email: newuser.email });
        // console.log(user);
        if (user) {
            return res.status(404).json({ error: "User already preset." });
        }

        const createdUser = await Users.create(newuser);

        return res.status(201).json({
            success: true,
            message: 'User registed successfully.',
            user: createdUser
        });

    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
}

// 10. Login user 

const userLogin = async (req, res) => {
    try {
        const email = req.body.email;
        req.session.email = email;
        const user = await Users.findOne({ email: email });
        console.log(user._id.ObjectId);
        const sessionID = req.sessionID;
        res.status(200).json({
            status: true,
            email: email,
            message: "User is logged in and session is created.",
            sessionID: sessionID
        })
    } catch (error) {
        console.error("Error occurred while fetching user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const sendOtp = async (req, res) => {
    try {
        const email = req.body.email;
        const user = await Users.exists({ email: email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const otp = await generatOtp(email);
        return res.status(200).json({
            status: true,
            message: "Otp is generated for given email.",
            otp: otp
        })

    } catch (error) {
        console.error("Error occurred while fetching user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


// 14 . logout

const logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.clearCookie('connect.sid', { path: '/' });
            res.status(200).json({
                status: true,
                message: "User is logged out."
            });
        }
    });
}

module.exports = {
    getAllUser,
    addUser,
    getUserByemail,
    updateUser,
    userSoftDelete,
    sendOtp,
    userLogin,
    logout,
    userRegister,
    userHardDelete,
    viewUserPostById
}


// 11. change password
// 12. forgot password
// 13. resetPassword using otp and session