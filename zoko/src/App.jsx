import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReminderPage from "./pages/ReminderPage";
import AddReminderPage from "./pages/AddReminderPage";
import EditReminderPage from "./pages/EditReminderPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ReminderPage />} />
        <Route path="/add" element={<AddReminderPage />} />
        <Route path="/edit/:id" element={<EditReminderPage />} />

      </Routes>
    </Router>
  );
}
