import Notification from "../models/notification.medel.js";
import User from "../models/user.model.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notification = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImg",
    });

    await Notification.updateMany({ read: true });
    res.status(200).json(notification);
  } catch (error) {
    console.log("Error in getNotifications controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    await Notification.deleteMany({ to: userId });
    res.status(200).json({ message: "Notification deleted Successfully" });
  } catch (error) {
    console.log("Error in deleteNotifications controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const deleteNotification = async (req, res) => {
  try {
    const userId = req.user._id;
    const notificationId = req.params.id;
    const notification = await Notification.findById({ notificationId });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (notification.to.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ error: "You are not allowed to delete this notification" });
    }

    await Notification.findByIdAndDelete(notificationId);
    res.status(200).json({ message: "Notification deleted Successfully" });
  } catch (error) {
    console.log("Error in deleteNotification controller", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
