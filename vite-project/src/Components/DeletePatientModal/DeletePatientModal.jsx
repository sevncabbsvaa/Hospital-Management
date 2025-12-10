import "./DeletePatientModal.scss";
import { deletePatient } from "../../Services/patientsService";
import { useState } from "react";

export default function DeletePatientModal({ open, onClose, onSuccess, patient }) {
  const [loading, setLoading] = useState(false);

  if (!open || !patient) return null;

  const handleDelete = async () => {
    try { 
      setLoading(true);
      await deletePatient(patient.id);
      onSuccess();   
      onClose();     
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="delete-overlay">
      <div className="delete-modal">

        <h3>Delete Patient</h3>
        <p>
          Are you sure you want to delete  
          <strong> {patient.name}</strong>?  
          This action cannot be undone.
        </p>

        <div className="buttons">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>

          <button className="delete" onClick={handleDelete} disabled={loading}>
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>

      </div>
    </div>
  );
}
