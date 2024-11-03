import User from "../model/user.model.js";
import asyncHandler from "express-async-handler";
import { randomBytes } from "crypto";
import { hashPassword } from "../utils/hashpassword.util.js";
import generateToken from "../utils/generateToken.js";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json("User already exists");
  }

  const salt = randomBytes(16).toString("hex");

  const hashedPassword = await hashPassword(password, salt);

  const user = await User.create({
    name,
    email,
    salt,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json("User Not Found");
  }

  const hashedPassword = await hashPassword(password, user.salt);

  if (user.twoFactorEnabled) {
    // If 2FA is enabled, return a message indicating that a 2FA token is required
    return res.json({ message: "2FA token required", userId: user._id });
  }

  if (hashedPassword === user.password) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      twoFactorEnabled: user.twoFactorEnabled,
      email: user.email,
      message: "Login successful",
    });
  } else {
    res.status(400).json({ error: "Invalid email or password" });
  }
});


export const generate2faSecret = asyncHandler(async (req, res) => {
    const { userId } = req.body;

    // Generate a secret for the user
    const secret = speakeasy.generateSecret({ name: 'YourAppName' });
  
    // Generate a QR code for easier setup with 2FA apps
    const qrCodeDataURL = await QRCode.toDataURL(secret.otpauth_url);
  
    // Save the secret in the database temporarily for verification
    await User.findByIdAndUpdate(userId, { twoFactorSecret: secret.base32 });
  
    res.json({ qrCodeDataURL });
})


export const enabled2fa = asyncHandler(async (req, res) => {
  const { userId, token } = req.body;

  const user = await User.findById(userId);

  if (!user || !user.twoFactorSecret) {
    return res.status(400).json({ message: "2FA setup not initialized" });
  }

  // Verify the token using the secret stored in the database
  const isVerified = speakeasy.totp.verify({
    secret: user.twoFactorSecret,
    encoding: "base32",
    token,
    window: 1,
  });

  if (isVerified) {
    // Enable 2FA for the user if verification succeeds
    user.twoFactorEnabled = true;
    await user.save();
    res.json({ message: "2FA enabled successfully" });
  } else {
    res.status(400).json({ message: "Invalid token" });
  }
});
