import { useEffect, useState } from "react";
import "./ViewPatientModal.scss";
import { getPatientById } from "../../Services/patientsService";

export default function ViewPatientModal({ open, onClose, patientId }) {

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && patientId) fetchPatient();
  }, [open, patientId]);

  const fetchPatient = async () => {
    try {
      setLoading(true);
      const data = await getPatientById(patientId);
      setPatient(data);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="view-overlay">
      <div className="view-modal">

        <h2>Patient Details</h2>

        {loading ? (
          <p>Loading...</p>
        ) : patient ? (
          <div className="details">

            <div className="row">
              <span className="label">Name:</span>
              <span className="value">{patient.name}</span>
            </div>

            <div className="row">
              <span className="label">Age:</span>
              <span className="value">{patient.age}</span>
            </div>

            <div className="row">
              <span className="label">Symptoms:</span>
              <span className="value">{patient.symptoms}</span>
            </div>

            <div className="row">
              <span className="label">Phone:</span>
              <span className="value">{patient.phoneNumber}</span>
            </div>

            <div className="row">
              <span className="label">Email:</span>
              <span className="value">{patient.email}</span>
            </div>

            <div className="row">
              <span className="label">Address:</span>
              <span className="value">{patient.address}</span>
            </div>

          </div>
        ) : (
          <p>Patient not found.</p>
        )}

        <button className="close-btn" onClick={onClose}>
          Close
        </button>

      </div>
    </div>
  );
}
