import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getReminders, updateReminder, deleteReminder } from "../api/reminders";

export default function EditReminderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reminder, setReminder] = useState(null);

  useEffect(() => {
    const fetchReminder = async () => {
      const all = await getReminders();
      const r = all.find((r) => r._id === id);
      if (r) setReminder(r);
      else navigate("/");
    };
    fetchReminder();
  }, [id]);

  const handleChange = (e) => {
    setReminder({ ...reminder, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateReminder(id, reminder);
      toast.success("Reminder updated!");
      navigate("/");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteReminder(id);
      toast.success("Reminder deleted");
      navigate("/");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (!reminder) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => navigate(-1)}>← Back</button>
        <h1 className="font-bold text-lg">Edit Reminder</h1>
        <button onClick={handleUpdate} className="text-green-600 font-bold">
          Save
        </button>
      </div>

      <div className="bg-white rounded-lg p-4 flex flex-col gap-3">
        <input
          name="title"
          value={reminder.title}
          onChange={handleChange}
          placeholder="Reminder Title"
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="startDate"
          value={reminder.startDate?.slice(0, 10)}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="endDate"
          value={reminder.endDate?.slice(0, 10) || ""}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="time"
          name="time"
          value={reminder.time}
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <select
          name="frequency"
          value={reminder.frequency}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option>Everyday</option>
          <option>Weekly</option>
          <option>Custom</option>
        </select>
        <input
          name="pet"
          value={reminder.pet}
          onChange={handleChange}
          placeholder="Pet"
          className="p-2 border rounded"
        />
        <input
          name="category"
          value={reminder.category}
          onChange={handleChange}
          placeholder="Category"
          className="p-2 border rounded"
        />
        <textarea
          name="notes"
          value={reminder.notes}
          onChange={handleChange}
          placeholder="Notes"
          className="p-2 border rounded"
        />

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 mt-4 rounded"
        >
          Delete Reminder
        </button>
      </div>
    </div>
  );
}
