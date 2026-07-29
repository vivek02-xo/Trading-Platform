const { Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const UsersSchema = new Schema({
    email : {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    username : {
        type : String,
        required : [true, "Your username is required"],
        unique: true,
    },
    password : {
        type : String,
        required : [true , "Your password is required"],
    },
    fund : {
        type: Number,
        required : true,
        default: 0,
    },
    createdAt : {
        type : Date,
        default : new Date(),
    },

});

UsersSchema.pre("save" , async function(){
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = UsersSchema;