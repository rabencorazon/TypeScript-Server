import { model, Schema, Model, Document } from 'mongoose';
// import User from './users.interface';
import * as jwt from 'jsonwebtoken'

export interface IUser extends Document {
    generateSessionToken(),
    email: string;
    name: string;
    password: string;
}

const userSchema: Schema = new Schema({
    email: String,
    name: String,
    password: String
});

userSchema.methods.generateSessionToken = function (this: IUser) {
    console.log("EMail : ", this.email);
    const token = jwt.sign({ _id: this._id, email: this.email }, process.env.jwt_secret, { expiresIn: 10800 });
    return token;
}

const User = model<IUser>("Users", userSchema);

export default User;