const User = require("../Model/UsersModel");

// requiring secret token 
const {createSecretToken} = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");

// Signup code -> taking email , username , password , createdAt from user (req.body)... checking if user existing or not if not then crating new user , giving cookie
module.exports.Signup = async (req , res , next) => {
    try{
        const {email , username , password , createdAt} = req.body;

        const existingUser = await User.findOne({email});
        // checking user exist
        if(existingUser){
            return res.json({message : "User already exists"});
        }
        // creating new user
        const user = await User.create({email , username , password , createdAt});

        // create token
        const token = createSecretToken(user._id);

        // resposing cookie
        res.cookie("token" , token , {
            httpOnly : false,
            sameSite: "lax",
            secure: false,
        })
        res.status(201).json({message : "User signed in successfully" , success: true, user});
        next();

    }catch(error){
        console.error(error);
    }
};

// Login code -> taking email and password from user (req.body)..checking we got info then checking user found or not checking bcrypt password and match... if correct then creating new token and givin as a res cookie
module.exports.Login = async (req, res, next) => {
  try {
    // geting info
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    //checking user exist or not
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    // matching bcrypt password 
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
    // if all details matched then creating new token and sending cookie
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: true,
     });
     res.status(201).json({ message: "User logged in successfully", success: true });
     next()
  } catch (error) {
    console.error(error);
  }
}

// Logout -> for logout i just have to clear that cookie user logedin...so i use clearcookie and clear token
module.exports.Logout = (req, res) => {
  // clearing existing cookie
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.json({
    success: true,
    message: "Logged out successfully",
  });
}


