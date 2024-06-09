import express from "express";
import authMiddleware from "../middleware/auth.js"
import { listOrders, placeOrder, updatStatus, userOrders, verifyOrder } from "../controllers/ordercontroller.js";


const orderRouter = express.Router();


orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userOrders", authMiddleware, userOrders);
orderRouter.get("/list", listOrders)
orderRouter.post("/status", updatStatus)
export default orderRouter;