import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


const userSchema = Schema(
    {
       username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        index: true
       },

       email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
       },

       fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
       },

       password: {
        type: String,
        required: [true, "Password is required"]

       },

       avatar: {
        type: String,
        required: true

       },

       coverImage: {
        type: String
       },

       refreshToken : {
        type: String
       },

       watchHistory: [
        {
        type:Schema.Types.ObjectId,
        ref:'Video'
        }
      ]


    }, {timestamps: true});

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
})    


userSchema.methods.isPassword 

export const User = mongoose.model("User", userSchema )