import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    clerkId: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    photo: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    creditbalance: {type: Number, default: 5}
})

const userModel = mongoose.models.user || mongoose.Model("user", userSchema);

export default userModel;