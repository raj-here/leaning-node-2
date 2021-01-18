import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: { type: String, required: true, unique: true },
    name: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date }
}, { versionKey: false });

export const UserModel = mongoose.model('user', UserSchema);