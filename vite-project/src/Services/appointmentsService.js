const BASE_URL = "https://hpis-api.up.railway.app";
const APPOINTMENTS_URL = `${BASE_URL}/api/Appointments`;

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : { "Content-Type": "application/json" };
}

export async function getAppointments() {
  const res = await fetch(APPOINTMENTS_URL, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error("Could not fetch appointments");
  return res.json();
}

export async function getTodayAppointments() {
  const res = await fetch(`${APPOINTMENTS_URL}/today`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Could not fetch today's appointments");
  return res.json();
}

export async function createAppointment(body) {
  const res = await fetch(APPOINTMENTS_URL, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Appointment yaratmaq alınmadı");
  }

  return res.json();
}

// Availability endpoint
export async function checkAvailability({ doctorId, date }) {
  const params = new URLSearchParams({ doctorId, date });

  const res = await fetch(
    `${BASE_URL}/api/Appointments/availability?${params.toString()}`,
    { headers: getAuthHeaders() }
  );

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Availability check failed");
  }

  return res.json(); // array
}
