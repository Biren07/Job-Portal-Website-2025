import {
  registerUser,
  loginUser,
  updateUserProfile,
} from "../services/userServices.js";

export const register = async (req, res) => {
  try {
    const result = await registerUser(req.body, req.file);
    return res.status(201).json({ ...result, success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { token, user, message } = await loginUser(req.body);
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, 
        httpOnly: true,
        secure: true, 
        sameSite: "none",
      })
      .json({ message, user, success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { maxAge: 0 })
    .json({ message: "Logged out successfully", success: true });
};

export const updateProfile = async (req, res) => {
  try {
    const result = await updateUserProfile(req.id, req.body, req.file);
    return res.status(200).json({ ...result, success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
