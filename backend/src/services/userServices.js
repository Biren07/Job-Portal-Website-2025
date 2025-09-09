import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const registerUser = async (data, file) => {
  const { fullname, email, phoneNumber, password, role } = data;

  if (!fullname || !email || !phoneNumber || !password || !role) {
    throw new Error("Something is missing");
  }

  const fileUri = getDataUri(file);
  const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exist with this email.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return User.create({
    fullname,
    email,
    phoneNumber,
    password: hashedPassword,
    role,
    profile: {
      profilePhoto: cloudResponse.secure_url,
    },
  });
};

export const loginUser = async (data) => {
  const { email, password, role } = data;

  if (!email || !password || !role) {
    throw new Error("Something is missing");
  }

  let user = await User.findOne({ email });
  if (!user) throw new Error("Incorrect email or password.");

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) throw new Error("Incorrect email or password.");

  if (role !== user.role) {
    throw new Error("Account doesn't exist with current role.");
  }

  const tokenData = { userId: user._id };
  const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return { user, token };
};

export const logoutUser = async () => {
  return true;
};

export const updateUserProfile = async (userId, data, file) => {
  const { fullname, email, phoneNumber, bio, skills } = data;
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found.");

  if (fullname) user.fullname = fullname;
  if (email) user.email = email;
  if (phoneNumber) user.phoneNumber = phoneNumber;
  if (bio) user.profile.bio = bio;
  if (skills) user.profile.skills = skills.split(",");

  if (file) {
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    user.profile.resume = cloudResponse.secure_url;
    user.profile.resumeOriginalName = file.originalname;
  }

  await user.save();
  return user;
};
