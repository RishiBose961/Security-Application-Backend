import express from "express";
const router = express.Router();    

import {
    enabled2fa,
    generate2faSecret,
    generateQrLogin,
    loginUser,
    qrLogin,
    registerUser,
  } from "../controller/user.controller.js";


  router.post("/register", registerUser); 
  router.post("/login", loginUser);
  router.post("/generate-2fa",generate2faSecret)
  router.post("/enable-2fa",enabled2fa)
  router.post("/generate-qr/:userId",generateQrLogin)
  router.post("/generate-login",qrLogin)

  export default router;
