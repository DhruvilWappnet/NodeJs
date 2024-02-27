const otpGenerator = require('otp-generator');
const otpStore = new Map();

const generatOtp = async (email) => {
    const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, upperCase: false, specialChars: false });
    const timestamp = Date.now();
    const validity = 5 * 60 * 1000; // 5 minutes in milliseconds
    const expirationTime = timestamp + validity;
    otpStore.set(otp, { email, expirationTime });
    return otp;
}

const getUser = (otp) => {
    const storedData = otpStore.get(otp);
    if (!storedData) {
        return null;
    }
    if (Date.now() > storedData.expirationTime) {
        otpStore.delete(otp);
        return null;
    }
    return storedData.email;
}


// console.log(generatOtp("hello1@gmail.com"));
// console.log(getUser("751730"));


module.exports = { generatOtp, getUser };

// const demo= new Map();
// demo.set("hello","Dhruvil");

// let name=demo.get("hello");
// console.log(name);
