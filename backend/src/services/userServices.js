import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../config/cloudinary.js";

export const registerUser = async (data, file) => {
    const { fullname, email, phoneNumber, password, role } = data;

    if (!fullname || !email || !phoneNumber || !password || !role) {
        throw new Error("All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("User already exists with this email");

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        fullname,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
        profile: {
            profilePhoto: cloudResponse.secure_url
        }
    });

    return { message: "Account created successfully" };
};

export const loginUser = async (data) => {
    const { email, password, role } = data;
    if (!email || !password || !role) throw new Error("All fields are required");

    let user = await User.findOne({ email });
    if (!user) throw new Error("Incorrect email or password");

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) throw new Error("Incorrect email or password");

    if (role !== user.role) throw new Error("Account doesn't exist with current role");

    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

    return {
        token,
        user: {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        },
        message: `Welcome back ${user.fullname}`
    };
};

export const updateUserProfile = async (userId, data, file) => {
    const { fullname, email, phoneNumber, bio, skills } = data;
    if (!fullname || !email || !phoneNumber || !bio || !skills) {
        throw new Error("All fields are required");
    }

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const skillsArray = skills.split(",");
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    user.fullname = fullname;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.profile.bio = bio;
    user.profile.skills = skillsArray;

    user.profile.resume = cloudResponse.secure_url;
    user.profile.resumeOriginalName = file.originalname;

    await user.save();

    return {
        message: "Profile updated successfully.",
        user: {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
    };
};
