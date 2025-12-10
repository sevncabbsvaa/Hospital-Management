import { useEffect, useState } from "react";
import "./Appointments.scss";
import AppointmentList from "./AppointmentList";
import CreateAppointment from "./CreateAppointment";

import {
  getAppointments,
  getTodayAppointments,
} from "../../Services/appointmentsService";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("all"); // "all" | "today"
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [tab]);

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const data =
        tab === "today"
          ? await getTodayAppointments()
          : await getAppointments();

      setAppointments(data || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Məlumatı yükləmək alınmadı");
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = appointments.filter((a) =>
    a?.patientName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="appointments-page">
      {/* LEFT LIST */}
      <div className="left">
        <div className="page-title">Appointments</div>

        <div className="tabs">
          <button
            className={tab === "all" ? "active" : ""}
            onClick={() => setTab("all")}
          >
            All Appointments
          </button>

          <button
            className={tab === "today" ? "active" : ""}
            onClick={() => setTab("today")}
          >
            Today’s
          </button>

          <input
            className="search-input"
            type="text"
            placeholder="Search appointment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <AppointmentList
          loading={loading}
          error={error}
          appointments={filtered}
          refresh={fetchData}
        />
      </div>

      {/* RIGHT CREATE PANEL */}
      <div className="right">
        <CreateAppointment refresh={fetchData} />
      </div>
    </div>
  );
}
