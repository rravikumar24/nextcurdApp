
import  { Schema, models, model } from 'mongoose';
 import { userType } from '@/types/userType';
const userSchema = new Schema<userType>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    age: {
        type: Number,
        required: false,
        min: 0,
    },
}, {
    timestamps: true,
});

const User = models.User || model<userType>('User', userSchema);
export default User;