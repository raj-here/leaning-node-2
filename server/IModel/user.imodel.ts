import mongoose from "mongoose";

export interface IUserModel extends mongoose.Document {
    username: string,
    name: string,
    createdAt: Date,
    updatedAt: Date
}