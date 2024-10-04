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
	const { fullname, email, password } = req.body;
9
    const userSchema = z.object({
        fullName: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        type: z.enum(["admin", "Creator", "student"]),
    });
    const validatedData = userSchema.parse(req.body);

    if(!validatedData){
        return res.status(400).json({
            message: "Invalid data",
        })
    }

	const existingUser = await User.findOne({ email });

	if (existingUser) {
		return res.status(401).json({
			message: " Email already exists",
		});
	}
	try {
		const newUser = new User({
			fullname,
			email,
			password,
		});
		await newUser.save();

        const accessToken = newUser.generateAccessToken();
        const refreshToken = newUser.generateRefreshToken();

        return res.status(201).json({
            message: "User registered successfully",
            accessToken,
            refreshToken,
        });

	} catch (error) {
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
		const existingUser = await User.findOne({ email });
		if (!existingUser) {
			return res.status(401).json({
				message: "Invalid credentials",
			});
		}
		const isPasswordValid = await existingUser.isPasswordCorrect(password);

		if (!isPasswordValid) {
			return res.status(401).json({
				message: "Invalid credentials",
			});
		}
		const accessToken = existingUser.generateAccessToken();
        res.status(200).json({ result: existingUser, accessToken,refreshToken });

	} catch (error) {
		res.status(500).json({ message: "Something went wrong" });
	}
};



module.exports = {
    registerUser,
    loginUser,
};
