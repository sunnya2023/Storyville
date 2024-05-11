import exporess from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  deleteNotifications,
  getNotifications,
  deleteNotification,
} from "../controllers/notification.controller.js";

const router = exporess.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);
router.delete("/:id", protectRoute, deleteNotification);

export default router;
