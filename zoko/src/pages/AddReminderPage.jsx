import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createReminder } from "../api/reminders";
import toast from "react-hot-toast";
const petOptions = [
  { label: "Browny", value: "Browny", img: "/dog-avtar.png" },
  { label: "Charlie", value: "Charlie", img: "/dog2.jpg" },
  { label: "Max", value: "Max", img: "/dog3.jpg" },
];

const categoryOptions = [
  { label: "General", value: "General", img: "/pill-icon.png" },
  { label: " Lifestyle", value: "Lifestyle", img: "/lifestyle.png" },
  { label: "Health", value: "Health", img: "/healthcare.png" },
];

export default function AddReminderPage() {
  const navigate = useNavigate();
  const [showEndDate, setShowEndDate] = useState(false);
  const [showTextarea, setShowTextarea] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    pet: "Browny",
    category: "General",
    time: "",
    notes: "",
    frequency: "Everyday",
  });
  const [showPetDropdown, setShowPetDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const handleSave = async () => {
    try {
      await createReminder(formData);
      toast.success("Reminder saved successfully!");

      navigate("/"); // Go back to homepage
    } catch (err) {
      toast.error("Failed to save reminder.");

      console.error("Error creating reminder:", err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 pt-6 text-black font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => navigate(-1)} className="text-2xl">
          ←
        </button>
        <h1 className="text-lg font-semibold">Add Reminder</h1>
        <button className="text-green-600 font-semibold" onClick={handleSave}>
          Save
        </button>
      </div>

      {/* Select Pet & Category */}
      <div className="flex justify-between mb-4">
        {/* Pet selector */}
        <div className="relative">
          <p className="text-gray-400 font-semibold text-xs">Select Pet</p>
          <div
            onClick={() => setShowPetDropdown((prev) => !prev)}
            className="bg-white rounded-lg p-3 w-40 flex items-center justify-between mt-1 cursor-pointer"
          >
            <img
              src={petOptions.find((p) => p.value === formData.pet)?.img}
              alt={formData.pet}
              className="w-6 h-6 rounded-full"
            />
            <span className="font-semibold">{formData.pet}</span>
            <span>▼</span>
          </div>
          {showPetDropdown && (
            <div className="absolute z-10 bg-white rounded-lg shadow-lg mt-1 w-40">
              {petOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setFormData({ ...formData, pet: option.value });
                    setShowPetDropdown(false);
                  }}
                >
                  <img
                    src={option.img}
                    alt={option.label}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="ml-2">{option.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category selector */}
        <div className="relative">
          <p className="text-gray-400 font-semibold text-xs">Select Category</p>
          <div
            onClick={() => setShowCategoryDropdown((prev) => !prev)}
            className="bg-white rounded-lg p-3 w-40 flex items-center justify-between mt-1 cursor-pointer"
          >
            <img
              src={
                categoryOptions.find((c) => c.value === formData.category)?.img
              }
              alt={formData.category}
              className="w-6 h-6"
            />
            <span className="font-semibold">{formData.category}</span>
            <span>▼</span>
          </div>
          {showCategoryDropdown && (
            <div className="absolute z-10 bg-white rounded-lg shadow-lg mt-1 w-40">
              {categoryOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setFormData({ ...formData, category: option.value });
                    setShowCategoryDropdown(false);
                  }}
                >
                  <img
                    src={option.img}
                    alt={option.label}
                    className="w-6 h-6"
                  />
                  <span className="ml-2">{option.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reminder Info */}
      <div className="bg-white rounded-lg text-black mb-4 overflow-hidden">
        {/* Black Header */}
        <div className="bg-black text-white p-4">
          <h2 className="font-bold">Reminder Info</h2>
        </div>

        {/* White Content */}
        <div className="p-4">
          <b className="mb-3 text-xl">Set a reminder for…</b>
          <input
            className="w-full p-3 rounded-lg text-black border border-gray-300 bg-[#F6F6F6]"
            placeholder="Type here..."
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <div className="flex justify-between items-center mt-4">
            <b className="text-xl">Add Notes (Optional)</b>
            <button
              className="text-[#00C46A] font-semibold"
              onClick={() => setShowTextarea(true)}
            >
              Add
            </button>
          </div>

          {showTextarea && (
            <textarea
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
              rows="4"
              placeholder="Write your notes here..."
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          )}
        </div>
      </div>

      {/* Reminder Settings */}
      <div className="bg-white rounded-lg text-black  overflow-hidden">
        <div className="bg-black text-white p-4">
          {" "}
          <h2 className="font-bold mb-3">Reminder Settings</h2>
        </div>
        <div className="p-4">
          <div className="mb-4">
            <b className="mb-1 text-xl">Start Date</b>
            <input
              type="date"
              className="w-full p-3 text-black rounded-lg  bg-[#F6F6F6]"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
            />
          </div>
          {/* Button to show End Date */}
          {!showEndDate && (
            <button
              className="text-xl text-[#171717] opacity-50  mb-4"
              onClick={() => setShowEndDate(true)}
            >
              + Add End Date
            </button>
          )}
          {/* End Date Field */}
          {showEndDate && (
            <div className="mb-4">
              <p className="mb-1">End Date</p>
              <input
                type="date"
                className="w-full p-3 text-black rounded-lg bg-[#F6F6F6]"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>
          )}

          <hr className="border-gray-300 mb-4" />

          <div className="mb-4">
            <b className="mb-1 text-xl">Reminder Time</b>
            <input
              type="time"
              className="w-full p-3 text-black rounded-lg  bg-[#F6F6F6]"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
            />
          </div>
          <hr className="border-gray-300 mb-4" />

          <div className="mb-2">
            <b className="mb-1 text-xl">Reminder Frequency</b>
            <p className="mb-2 text-[#171717] ">
              How often should this reminder repeat?
            </p>
            <select
              className="w-full p-3 text-black rounded-lg  bg-[#F6F6F6]"
              value={formData.frequency}
              onChange={(e) =>
                setFormData({ ...formData, frequency: e.target.value })
              }
            >
              <option>Everyday</option>
              <option>Weekly</option>
              <option>Custom</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
