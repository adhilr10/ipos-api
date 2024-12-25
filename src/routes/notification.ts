import express from "express";
import {
  createNotification,
  deleteNotificationById,
  getNotifications,
  updateNotificationById,
} from "../controllers/notifications";

const notificationRouter = express.Router();

notificationRouter.post("/notifications", createNotification);
notificationRouter.get("/notifications", getNotifications);
notificationRouter.put("/notifications/:id", updateNotificationById);
notificationRouter.delete("/notifications/:id", deleteNotificationById);

export default notificationRouter;
