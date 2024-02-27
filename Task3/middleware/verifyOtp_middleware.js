const { getUser } = require('../services/otpGenerator');

const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const getEmail = getUser(otp);
        if (getEmail === email) {
            next();
        }
        else {
            res.status(401).json({
                "error": 'Invalid OTP'
            })
        }

    } catch (error) {
        console.error("Error occurred while fetching user:", error);
        res.status(500).json({ error: "Internal middleware Error" });
    }
}

module.exports = verifyOtp;