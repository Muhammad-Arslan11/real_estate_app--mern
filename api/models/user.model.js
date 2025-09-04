import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true,
      unique : true
    },
    password:{
      type: String,
      required: true
    },
    avatar:{
      type: String,
      default: "https://www.snia.org/sites/default/files/2025-07/random-user2_12.jpg"
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;