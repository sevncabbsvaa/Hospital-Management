import "./AppointmentList.scss";

export default function AppointmentList({
  appointments = [],
  loading,
  error,
  refresh,
}) {
  if (loading) return <p className="loading">Loading...</p>;

  if (error)
    return (
      <p className="empty">
        {error}{" "}
        {refresh && (
          <button className="retry" onClick={refresh}>
            Retry
          </button>
        )}
      </p>
    );

  if (!appointments || appointments.length === 0)
    return <p className="empty">No appointments found</p>;

  return (
    <div className="appointment-list">
      {appointments.map((item) => {
        // ---- TARİX ----
        const dateObj = item.appointmentDate
          ? new Date(item.appointmentDate)
          : null;
        const date = dateObj ? dateObj.toLocaleDateString() : "No date";

        // ---- SAAT ----
        const hours = item.startTime?.hours;
        const minutes = item.startTime?.minutes;

        const hasTime =
          typeof hours === "number" && typeof minutes === "number";

        const time = hasTime
          ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
              2,
              "0"
            )}`
          : "";

        return (
          <div className="appointment-card" key={item.id}>
            <div className="top">
              <div className="patient">{item.patientName}</div>
              <button className="cancel">Cancel</button>
            </div>

            <div className="doctor">with Dr. {item.doctorName}</div>

            <div className="date">
              <span className="icon">📅</span>
              {date}
              {time && (
                <>
                  {" "}
                  — <span className="time">{time}</span>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
