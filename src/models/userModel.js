import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPassordToken: {
        type: String
    },
    forgotPassordTokenExpiry: {
        type: Date,
    },
    verifyToken: {
        type: String
    },
    verifyTokenExpiry: {
        type: Date,
    },

})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;