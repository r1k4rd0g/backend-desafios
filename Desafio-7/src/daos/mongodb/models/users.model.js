import { Schema, model } from "mongoose";

export const userCollection = 'userCollection'
export const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: "usuario",
    },
    isGithub: {// para identificar que usuario vino por git
        type: Boolean,
        default: false
    }
})

export const UserModel = model(
    'userCollection',
    userSchema
);