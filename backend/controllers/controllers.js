import User from "../database/Schema.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../genratetoken/gentoken.js";
export async function SignUp(req, res) {
  // Implement signup functionality here
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    console.log(`Searching for user with email: ${email}`);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const existingUserByUsername = await User.findOne({ username: username });

    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
      email,
      password: hashedPassword,
      username,
      image,
    });
    generateToken(newUser._id, res);

    await newUser.save();
    res
      .status(201)
      .json({ success: true, user: { ...newUser._doc, password: "" } });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
export async function Login(req, res) {
  // Implement login functionality here
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log(`User not found with email: ${email}`);
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const incorrectpassword = await bcryptjs.compare(password, user.password);
    if (!incorrectpassword) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }
    generateToken(User._id, res);
    res.status(200).json({ success: true, user: user });
    } catch (error) {
    console.error("Error in login controller", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function LogOut(req, res) {
  // Implement logout functionality here
  try {
   res.clearCookie("netflix_cookie");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
export async function authCheck(req, res) {
try {
  const user = await User.findOne(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  res.status(200).json({ success: true, user});
} catch (error) {
  console.log("error in authcheck controller", error.message);
  res.status(500).json({ success: false, message: "Internal server error" });
}
}