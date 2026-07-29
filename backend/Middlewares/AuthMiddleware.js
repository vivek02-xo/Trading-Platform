const User = require("../model/UsersModel");
require("dotenv").config();

const jwt = require("jsonwebtoken");

// userVerification -> geting token from user...checking token exist if yes then verify it that token is correct or not if error then res false...if that user data exist in databse then res true with his username..else respose false...
module.exports.userVerification = (req,res) =>{
    const token = req.cookies.token;
    if(!token){
        return res.json({status: false});
    }

    // verifing token
    jwt.verify(token , process.env.TOKEN_KEY, async (err, data) => {
        if(err){
            return res.json({status : false});
        }else{
            const user = await User.findById(data.id);
            if(user){
                return res.json({status: true, user});
            }else{
                return res.json({status:false});
            }
        }
    });
}