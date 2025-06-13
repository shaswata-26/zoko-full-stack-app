import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { FiCheck } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { TbRepeat } from "react-icons/tb";
import { PiDog } from "react-icons/pi";
import { MdAdd } from "react-icons/md";

import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";

import { getReminders } from "../api/reminders"; // ✅ Adjust path as needed

export default function ReminderPage() {
  const navigate = useNavigate();
  const today = new Date();

  const startDate = startOfWeek(startOfMonth(today), { weekStartsOn: 1 });
  const endDate = endOfWeek(endOfMonth(today), { weekStartsOn: 1 });
  const [calendarOpen, setCalendarOpen] = useState(true);

  const [reminders, setReminders] = useState([]);

  const calendarDays = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    calendarDays.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const data = await getReminders();
        setReminders(data);
      } catch (err) {
        console.error("Failed to fetch reminders:", err);
      }
    };
    fetchReminders();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-4 pt-8 text-black font-sans relative pb-28">
      {/* Status Bar */}
      <div className="flex justify-between text-sm mb-4">
        <span className="font-semibold">{format(today, "HH:mm")}</span>
        <div className="flex items-center gap-2">
          <img src="/wifi.png" alt="wifi" className="w-5 opacity-60" />
          <img src="/tower.png" alt="tower" className="w-5 opacity-60" />
          <img src="/battery.png" alt="battery" className="w-5 opacity-60" />
        </div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">daily reminders</h1>
        <span className="text-gray-400 font-semibold">view all</span>
      </div>

      {/* Streaks */}
      <div className="text-gray-400 flex items-center gap-3 mb-2">
        <div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.66722 1.33398L2.72953 8.45922C2.49699 8.73827 2.38072 8.87779 2.37894 8.99563C2.3774 9.09806 2.42305 9.19552 2.50273 9.25991C2.59439 9.33399 2.77601 9.33399 3.13925 9.33399H8.00056L7.33389 14.6673L13.2716 7.54208C13.5041 7.26304 13.6204 7.12351 13.6222 7.00568C13.6237 6.90324 13.5781 6.80578 13.4984 6.74139C13.4067 6.66732 13.2251 6.66732 12.8619 6.66732H8.00056L8.66722 1.33398Z"
              fill="#AEAEAE"
              stroke="#3E3D45"
              stroke-width="1.17871"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div>your streaks</div>
      </div>

      {/* Calendar */}
      <div className="bg-[#00C46A] rounded-2xl p-4 mb-6 text-black">
        <h2 className="text-center font-semibold mb-4">
          {format(today, "MMMM yyyy")}
        </h2>

        <div className="flex justify-around text-sm mb-1 font-medium">
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
            <div key={d} className="w-10 text-center">
              {d}
            </div>
          ))}
        </div>

        {calendarOpen ? (
          <div className="grid grid-cols-7 gap-y-2 text-sm font-medium">
            {calendarDays.map((day, i) => {
              const isToday = isSameDay(day, today);
              const inMonth = isSameMonth(day, today);

              return (
                <div
                  key={i}
                  className={`w-10 h-10 mx-auto flex items-center justify-center rounded-full transition-all duration-300 ${
                    isToday
                      ? "bg-white text-black font-bold"
                      : inMonth
                      ? "text-black"
                      : "text-black opacity-30"
                  }`}
                >
                  {format(day, "d")}
                </div>
              );
            })}
          </div>
        ) : (
          // Collapsed View: Show current week only
          <div className="flex justify-around text-sm font-medium mt-2">
            {calendarDays
              .filter((day) => {
                const start = startOfWeek(today, { weekStartsOn: 1 });
                const end = endOfWeek(today, { weekStartsOn: 1 });
                return day >= start && day <= end;
              })
              .map((day, i) => {
                const isToday = isSameDay(day, today);
                return (
                  <div
                    key={i}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
                      isToday
                        ? "bg-white text-black font-bold"
                        : "text-black bg-[#00e676] opacity-80"
                    }`}
                  >
                    {format(day, "d")}
                  </div>
                );
              })}
          </div>
        )}
        <div
          className="flex justify-center mt-2 text-white text-xl cursor-pointer"
          onClick={() => setCalendarOpen(!calendarOpen)}
        >
          {calendarOpen ? "⌄" : "⌃"}
        </div>
      </div>
      <div className="text-gray-500 flex gap-1 items-center  mb-2">
        <div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.00391 11.3672C9.86355 11.3672 11.3711 9.85965 11.3711 8C11.3711 6.14035 9.86355 4.63281 8.00391 4.63281C6.14426 4.63281 4.63672 6.14035 4.63672 8C4.63672 9.85965 6.14426 11.3672 8.00391 11.3672Z"
              fill="#AEAEAE"
              stroke="#3E3D45"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.00391 2.25V1"
              stroke="#3E3D45"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.93857 3.93466L3.05469 3.05078"
              stroke="#3E3D45"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.25391 8H1.00391"
              stroke="#3E3D45"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.93857 12.0664L3.05469 12.9503"
              stroke="#3E3D45"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.00391 13.75V15"
              stroke="#3E3D45"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.0664 12.0664L12.9503 12.9503"
              stroke="#3E3D45"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.7539 8H15.0039"
              stroke="#3E3D45"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12.0664 3.93466L12.9503 3.05078"
              stroke="#3E3D45"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <p> afternoon</p>
      </div>

      {/* Reminder Cards */}
      {reminders.map((reminder) => (
        <div
          key={reminder._id}
          onClick={() => navigate(`/edit/${reminder._id}`)}
          className="cursor-pointer bg-white rounded-xl shadow-sm p-4 mb-3 flex flex-col gap-2"
        >
          <div className="flex justify-between font-bold text-lg">
            <span>{reminder.title}</span>
            <span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.4">
                  <path
                    d="M8.88889 7.11111L12 4M12 4H9.33333M12 4V6.66667M7.11111 8.88889L4 12M4 12H6.66667M4 12L4 9.33333"
                    stroke="#171717"
                    stroke-width="1.33333"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            </span>
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <PiDog className="text-xl" />
            <span>For {reminder.pet}</span>
            <AiOutlineClockCircle className="text-xl" />
            <span>At {reminder.time}</span>
            <TbRepeat className="text-xl" />
            <span>{reminder.frequency}</span>
          </div>
        </div>
      ))}

      <p className="text-gray-500 mt-6 mb-2">pending goals</p>
      <div className="bg-white rounded-xl p-4 mb-6 text-gray-400 ">
        morning walk
      </div>

      <p className="text-gray-500 mt-6 mb-2">Completed goals</p>
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-gray-300 rounded-xl p-3 flex justify-between items-center text-gray-600 line-through">
          morning walk
          <FiCheck />
        </div>
      </div>

      <button
        onClick={() => navigate("/add")}
        className="fixed bottom-20 right-5 w-12 h-12 bg-[#00C46A] rounded-xl text-white text-2xl flex items-center justify-center shadow-lg z-50"
      >
        <IoMdAdd />
      </button>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-around items-center border-t z-40">
        <img src="/navitem1.png" alt="home" className="w-6" />
        <img src="/navitem3.png" alt="like" className="w-6" />
        <div className="bg-black flex gap-1 text-white rounded-xl px-4 py-2 text-sm font-semibold">
          <div>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.7924 16.1278L15.2109 19.2012L20.6566 13.7366"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <rect
                x="1.13281"
                y="1.49805"
                width="7.67188"
                height="7.67578"
                rx="3"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
              />
              <rect
                x="1.13281"
                y="12.4961"
                width="7.67188"
                height="7.67578"
                rx="3"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
              />
              <rect
                x="12.1875"
                y="1.49805"
                width="7.67188"
                height="7.67578"
                rx="3"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <p>reminders</p>
        </div>
        <img src="/navitem4.png" alt="dog" className="w-6" />
      </div>
    </div>
  );
}
