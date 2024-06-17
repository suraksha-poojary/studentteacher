import express from "express";
const router=express.Router();


import register from "./register.js";
import login from "./login.js";

router.use("/register",register);
router.use("/login",login);

export default router;