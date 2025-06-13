import { axiosInstance } from "../lib/axios";

// Get all reminders
export const getReminders = async () => {
  const res = await axiosInstance.get("/reminders");
  return res.data;
};

// Create a reminder
export const createReminder = async (data) => {
  const res = await axiosInstance.post("/reminders", data);
  return res.data;
};

// Update a reminder
export const updateReminder = async (id, data) => {
  const res = await axiosInstance.put(`/reminders/${id}`, data);
  return res.data;
};

// Delete a reminder
export const deleteReminder = async (id) => {
  const res = await axiosInstance.delete(`/reminders/${id}`);
  return res.data;
};
