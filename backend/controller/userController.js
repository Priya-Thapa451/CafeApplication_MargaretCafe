import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import crypto from "crypto";

const prisma = new PrismaClient();
dotenv.config();
console.log("EMAIL_USER", process.env.EMAIL_USER);
console.log("EMAIL_PASS", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Change based on your email provider
  port: 587, // Use 465 for secure (SSL), 587 for STARTTLS
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your app-specific password
  },
});

const customerRegister = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !password || !email) {
    return res.status(400).json({ message: "Please fill all fields." });
  }
  try {
    // Check if the email already exists
    let existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const verificationToken = uuidv4();
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        verificationToken,
      },
    });

    // Prepare verification email
    const verificationLink = `http://localhost:3000/verify-email/${verificationToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email",
      text: `Click on this link to verify your email: ${verificationLink}`,
    });

    // Create JWT token (use environment variable for secret)
    const token = jwt.sign({ user }, "casdkjfqheiru23", { expiresIn: "1h" });

    // Send response with token and user info
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production", // Set secure cookie in production
      })
      .json({
        message: "Registration successful! Check your email for verification",
        user,
      });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

// Verify Email
const verifyEmail = async (req, res) => {
  const { token } = req.params; // Extract token from the URL

  console.log("Received token:", token); // Log the received token for debugging
  try {
    // Find the user by verificationToken
    const matchingUser = await prisma.user.findFirst({
      where: {
        verificationToken: token, // Look for the user with the given token
        isVerified: false, // Ensure they are not already verified
      },
    });

    if (!matchingUser) {
      console.log("No matching user found.");
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    console.log("Matching user found:", matchingUser);

    // Update user as verified
    const user = await prisma.user.update({
      where: { id: matchingUser.id },
      data: { isVerified: true, verificationToken: null },
    });

    console.log("User verified successfully:", user);
    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Error during verification:", error);
    res
      .status(500)
      .json({ message: "Verification failed. Please try again later." });
  }
};

//Send Reset Password Email
const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a secure token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // Set expiry time to 1 hour from now (in milliseconds)
    // Save token to the database
    await prisma.user.update({
      where: { email },
      data: {
        resetPasswordToken: hashedToken,
        resetPasswordTokenExpiry: resetTokenExpiry, // Pass Date object
      },
    });

    const resetURL = `http://localhost:3000/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `<p>Click the link below to reset your password:</p>
             <a href="${resetURL}">${resetURL}</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    console.error("Error sending reset email:", error);
    res.status(500).json({ message: "Failed to send password reset email." });
  }
};

// Reset Password
//reset the password
const resetPassword = async (req, res) => {
  const { newPassword } = req.body; // Extract new password from the request body
  const { token } = req.params; // Extract token from the request parameters

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token and new password are required." });
  }

  try {
    // Hash the token from the request
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    // Get the current time as a Date object
    const currentDateTime = new Date();

    // Find the user with the matching reset token and valid expiry time
    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordTokenExpiry: {
          gt: currentDateTime, // Ensure token has not expired
        },
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and clear the reset token
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordTokenExpiry: null,
      },
    });

    res.status(200).json({ message: "Password reset successfully!" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const customerLogin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields." });
  }

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if user exists and is a STAFF member
    if (!user || user.role !== "USER") {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare input password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.REFRESH_TOKEN_SECRET, // Use environment variable
      { expiresIn: "1h" }
    );

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
      },
    });

    // Send response with token as a cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ message: "Logged in successfully", token: refreshToken });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const staffLogin = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields." });
  }

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if user exists and is a STAFF member
    if (!user || user.role !== "STAFF") {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare input password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "default_secret", // Use environment variable
      { expiresIn: "1h" }
    );

    // Send response with token as a cookie
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true, // Prevents client-side access
        secure: process.env.NODE_ENV === "production", // Secure only in production
        sameSite: "Strict",
      })
      .json({
        message: "User logged in successfully",
        user: { id: user.id, email: user.email, role: user.role },
        token,
      });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const staffRegister = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !password || !email) {
    return res.status(400).json({ message: "Please fill all fields." });
  }
  try {
    // Check if the email already exists
    let existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const verificationToken = uuidv4();
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "STAFF",
      },
    });

    // Create JWT token (use environment variable for secret)
    const token = jwt.sign({ user }, "casdkjfqheiru23", { expiresIn: "1h" });

    // Send response with token and user info
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production", // Set secure cookie in production
      })
      .json({
        message: "Registration successful! Check your email for verification",
        user,
      });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  try {
    const user = await prisma.admin.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ user }, "casdkjfqheiru23", { expiresIn: "1h" });
    return res
      .status(200)
      .json({ message: "User logged in successfully", user, token });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "User not found", error: error.message });
  }
};

const adminRegister = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const user = await prisma.admin.create({
      data: {
        name,
        email,
        password,
      },
    });
    if (!user) {
      return res.status(400).json({ message: "User not created" });
    }
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "User not created", error: error.message });
  }
};

export {
  customerLogin,
  customerRegister,
  staffLogin,
  staffRegister,
  adminLogin,
  adminRegister,
  verifyEmail,
  sendResetPasswordEmail,
  resetPassword,
};