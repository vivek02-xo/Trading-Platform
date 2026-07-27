const {model} = require("mongoose");

const UsersSchema =  require("../schemas/UsersSchema");

const UserModel = model("User" , UsersSchema);

module.exports = UserModel;