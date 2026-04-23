import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { boolean } from 'zod';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email must be unique'],
      trim: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please fill a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long']
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    isVerified: {
      type: boolean,
      required: true
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function () {
  if (!this.isModified('password')) return;

  const salt = bcrypt.genSaltSync(11);
  this.password = bcrypt.hashSync(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
