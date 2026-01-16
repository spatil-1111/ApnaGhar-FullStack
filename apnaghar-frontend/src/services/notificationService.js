import api from "./api";

export const getMyNotifications = () => {
  return api.get("/notifications/my");
};

export const markNotificationRead = (id) => {
  return api.put(`/notifications/${id}/read`);
};

export const getUnreadCount = () => {
  return api.get("/notifications/unread-count");
};

export const markAllRead = () => {
  return api.put("/notifications/read-all");
};
