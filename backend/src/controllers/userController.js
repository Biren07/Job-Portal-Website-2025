import {
  registerUser,
  loginUser,
  logoutUser,
  updateUserProfile,
} from "../services/userServices.js";

export const register = async (req, res) => {
  try {
    await registerUser(req.body, req.file);
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { user, token } = await loginUser(req.body);

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "development",
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profile: user.profile,
        },
        success: true,
      });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const logout = async (req, res) => {
  try {
    await logoutUser();
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await updateUserProfile(req.id, req.body, req.file);

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
