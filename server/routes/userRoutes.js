import express from "express";
import { clerkWebhooks, userCrdeits } from "../controllers/userController.js";
import authUser from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post('/webhooks', clerkWebhooks)
userRouter.get('/credits', authUser, userCrdeits)

export default userRouter