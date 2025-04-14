// import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// Contact Schema
const contactSchema = new mongoose.Schema(
  {
    Name: String,
    Mobile: String,
    Business: String,
    Email_Address: {
      type: String,
      unique: true,
      required: true,
    },
    Address1: String,
    status: Boolean,
  },
  { timestamps: true }
);

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},{timestamps:true});

export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
export const User = mongoose.models.User || mongoose.model('User', userSchema);
