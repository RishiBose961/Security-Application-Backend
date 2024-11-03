import jwt from "jsonwebtoken";

// Function to generate a JWT and set it as a cookie
const generateToken = (res, userId) => {
  try {
    // Generate the token with a 30-day expiration
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Set the token as a cookie
    res.cookie("jwt", token, {
      httpOnly: true, // Makes the cookie inaccessible via JavaScript
      secure: process.env.NODE_ENV === "production", // Ensures secure cookies in production
      sameSite: "strict", // Ensures cookie is only sent to same-site requests
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    });
  } catch (error) {
    console.error("Error generating token:", error);
    res.status(500).json({ message: "Failed to generate token" });
  }
};

export default generateToken;