const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

/**
 * Handles user registration
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Promise<void>}
 */
const registerUser = async (req, res) => {
  req.body.type = req.body.type.toLowerCase();
  const { fullName, email, password, type } = req.body;
  const lowerCaseType = type.toLowerCase();

  const userSchema = z.object({
    fullName: z.string().min(1, "Name is required").max(50),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    type: z
      .enum(["admin", "creator", "student"])
      .transform((val) => val.toLowerCase()),
  });
  const validatedData = userSchema.parse(req.body);

  if (!validatedData) {
    return res.status(400).json({
      message: "Invalid data",
    });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(401).json({
      message: " Email already exists",
    });
  }
  try {
    const newUser = new User({
      fullName,
      email,
      passwordHash: password,
      type: lowerCaseType,
    });

    const accessToken = newUser.generateAccessToken();
    const refreshToken = newUser.generateRefreshToken();

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * Handles user login
 * @param {Object} req The request object
 * @param {Object} res The response object
 * @returns {Promise<void>}
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email }).select("+passwordHash");
    if (!existingUser) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    console.log(existingUser);

    const isPasswordValid = await existingUser.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const accessToken = existingUser.generateAccessToken();
    const refreshToken = existingUser.generateRefreshToken();
    res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
