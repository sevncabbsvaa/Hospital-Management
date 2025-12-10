// src/Pages/Appointments/CreateAppointment.jsx

import { useEffect, useState } from "react";
import "./CreateAppointment.scss";
import {
  checkAvailability,
  createAppointment,
} from "../../Services/appointmentsService";

const API_BASE = "https://hpis-api.up.railway.app";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : { "Content-Type": "application/json" };
}

export default function CreateAppointment({ refresh }) {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [available, setAvailable] = useState(null);
  const [loadingCheck, setLoadingCheck] = useState(false);
  const [loadingBook, setLoadingBook] = useState(false);

  // =======================================
  // LOAD PATIENTS + DOCTORS
  // =======================================
  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, dRes] = await Promise.all([
          fetch(`${API_BASE}/api/Patients`, { headers: getAuthHeaders() }),
          fetch(`${API_BASE}/api/Doctors`, { headers: getAuthHeaders() }),
        ]);

        const [pData, dData] = await Promise.all([
          pRes.json(),
          dRes.json(),
        ]);

        setPatients(pData || []);
        setDoctors(dData || []);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    load();
  }, []);

  // =======================================
  // CHECK AVAILABILITY
  // =======================================
  const handleCheck = async () => {
    if (!doctorId || !date || !time) {
      alert("Select doctor, date and time");
      return;
    }

    setLoadingCheck(true);
    setAvailable(null);

    try {
      const result = await checkAvailability({
        doctorId: Number(doctorId),
        date, // must be YYYY-MM-DD
      });

      const [h, m] = time.split(":").map(Number);

      const slot = result.find(
        (r) =>
          r.startTime.hours === h &&
          r.startTime.minutes === m
      );

      setAvailable(slot?.isAvailable ?? false);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoadingCheck(false);
    }
  };

  // =======================================
  // CREATE APPOINTMENT
  // =======================================
  const handleBook = async () => {
    if (!patientId || !doctorId || !date || !time || !available) {
      alert("Please complete all fields & check availability");
      return;
    }

    const [hours, minutes] = time.split(":").map(Number);

    const startTimeString = `${time}:00`;
    const endMinutes = minutes + 30;
    const endTimeString =
      endMinutes >= 60
        ? `${hours + 1}:${String(endMinutes - 60).padStart(2, "0")}:00`
        : `${hours}:${String(endMinutes).padStart(2, "0")}:00`;

    const body = {
      patientId: Number(patientId),
      doctorId: Number(doctorId),
      appointmentDate: date, // EXACTLY what backend wants
      startTime: startTimeString,
      endTime: endTimeString,
      notes: "",
      isFollowUp: false,
    };

    setLoadingBook(true);

    try {
      await createAppointment(body);

      alert("Appointment successfully created!");

      setPatientId("");
      setDoctorId("");
      setDate("");
      setTime("");
      setAvailable(null);

      refresh(); // reload left list
    } catch (err) {
      console.error(err);
      alert(err.message || "Create appointment failed");
    } finally {
      setLoadingBook(false);
    }
  };

  return (
    <div className="create-appointment">
      <h3>Create New Appointment</h3>

      {/* PATIENT */}
      <label>Select Patient</label>
      <select value={patientId} onChange={(e) => setPatientId(e.target.value)}>
        <option value="">Search and select…</option>
        {patients.map((p) => (
          <option key={p.id} value={p.id}>
            {p.fullName ??
              `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim()}
          </option>
        ))}
      </select>

      {/* DOCTOR */}
      <label>Select Doctor</label>
      <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)}>
        <option value="">Select a doctor…</option>
        {doctors.map((d) => (
          <option key={d.id} value={d.id}>
            {d.fullName ??
              `${d.firstName ?? ""} ${d.lastName ?? ""}`.trim()}
          </option>
        ))}
      </select>

      {/* DATE */}
      <label>Select Date</label>
      <input type="date" value={date}
        onChange={(e) => {
          setDate(e.target.value);
          setAvailable(null);
        }} />

      {/* TIME */}
      <label>Select Time</label>
      <input type="time" value={time}
        onChange={(e) => {
          setTime(e.target.value);
          setAvailable(null);
        }} />

      {/* CHECK */}
      <button
        className="check-btn"
        onClick={handleCheck}
        disabled={!doctorId || !date || !time}
      >
        {loadingCheck ? "Checking..." : "Check Availability"}
      </button>

      {available === true && <p className="available">✔ Available</p>}
      {available === false && <p className="not-available">✖ Not available</p>}

      {/* BOOK */}
      <button
        className="book-btn"
        disabled={!available || loadingBook}
        onClick={handleBook}
      >
        {loadingBook ? "Booking..." : "Book Appointment"}
      </button>
    </div>
  );
}
