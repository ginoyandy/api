import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import 'dotenv';

export interface UserDocument extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  // toJSON(): {username: string, email:string},
  generateToken(): string;
}

const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        username: { type: String, required: true, unique:true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

UserSchema.pre('save', async function (next: mongoose.HookNextFunction) {
    const user = this as UserDocument;

    // Hash the password when it is new or modified
    if (!user.isModified('password')) return next();

    // Hash config
    const saltRounds: number = parseInt(process.env.SALT_WORK_FACTOR as string) ;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;
    return next();
});

UserSchema.methods.comparePassword = async function (
    candidatePassword: string
):Promise<boolean> {
    const user = this as UserDocument;
    const result = await bcrypt.compare(candidatePassword, user.password);
    return result;
};

UserSchema.methods.toJSON = function () {
    const user = this as UserDocument;
    return {
        username: user.username,
        email: user.email,
    };
};

UserSchema.methods.generateToken = async function () {
    const user = this as UserDocument;
    const userToTokenize = {
        id: user._id,
        username: user.username, 
        email: user.email,
        date: new Date().toISOString(),
    };

    if(process.env.SECRET_TOKEN){
        const token = await sign(userToTokenize, process.env.SECRET_TOKEN);
        return token;
    }else{
        throw new Error('Not valid secret token');
    }

};

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;