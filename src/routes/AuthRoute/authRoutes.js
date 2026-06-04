// // routes/auth.js
// import express from "express";
// import { register, login } from "../../controller/AuthController/authController.js";

// const router = express.Router();

// // POST /api/auth/register
// router.post("/register", register);

// // POST /api/auth/login
// router.post("/login", login);

// export default router;


import express from "express";
import { sendLoginOTP, verifyOTP } from "../../controller/AuthController/authController.js";

const router = express.Router();

router.post("/send-otp", sendLoginOTP);
router.post("/verify-otp", verifyOTP);

export default router;