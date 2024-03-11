const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt=require("jsonwebtoken");
//signup
const signup = async (req, res) => {
    let { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists. Please login." });
        }
        let hashPassword = await bcryptjs.hash(password, 10);
        let newUser = await User.create({
            username,
            email,
            password: hashPassword,
        });
        await newUser.save();
        return res.status(200).json({ success: true, message: "User created successfully. Please login." });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
//login
const login = async (req, res) => {
    let { email, password } = req.body;
    try {

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found. Please sign up." });
        }

        const passwordMatch = await bcryptjs.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ success: false, message: "Incorrect password." });
        }

        const token= jwt.sign({id:user._id},process.env.JWT_SECRETKEY,{
            expiresIn:"1h",
        });

        res.cookie("token",token,{
            httpOnly:true,
            expiresIn:new Date(Date.now()+ 1000*60*60),
        });

        return res.status(200).json({ success: true, message: "Login successful.",user });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
//logout
const logout=async (req,res)=>{
        try {
            res.clearCookie('token');
            return res.status(200).json({ success: true, message: 'Logout successful.' });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
 };
//getuser
const getUser = async (req, res) => {
    let reqId = req.id;
    try {
        let user = await User.findById(reqId).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "Please sign up" });
        }
        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {signup,login,logout,getUser};
