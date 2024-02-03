const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

//@desc get all users
//@route get /api/users
//@access public

const registerUser = asyncHandler( async (req, res) => {
    
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const userAvailable = await User.findOne({email}); 
    if(userAvailable){
        res.status(400);
        throw new Error("Email already register");
    }
    const hashedPassword =  bcrypt.hashSync(password);

    const user = await User.create({
        username, 
        email, 
        password : hashedPassword
    }); 

    // res.status(201).json({message : req.body});
    res.status(201).json(user);
});

const loginuser = asyncHandler( async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const user = await User.findOne({email});
    if(!user){
        res.status(404);
        throw new Error("User Not Found");
    }

    if(user && ( bcrypt.compareSync(password, user.password))){
        const accessToken = jwt.sign(
            {
                user:{
                    username: user.username,
                    email: user.email,
                    id: user.id,
                }
            },
            process.env.ACCESS_TOKEN,
            {expiresIn: '10m'}
        );
        res.status(200).json({accessToken});
    } else {
        res.status(404).json('credentials not match');
    }



    // res.status(200).json(user);
});

const currentUsers = asyncHandler( async (req, res) => {
    

    res.status(200).json(req.user);
});

module.exports = { 
    registerUser,
    loginuser,
    currentUsers,
};

