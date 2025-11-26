import "./DeleteDoctorModal.scss";
import { deleteDoctor } from "../../Services/doctorsService";

export default function DeleteDoctorModal({ open, onClose, doctor, onSuccess }) {
  if (!open || !doctor) return null;

  const handleDelete = async () => {
    try {
      await deleteDoctor(doctor.id);
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Xəta baş verdi. Yenidən cəhd edin.");
    }
  };

  return (
    <div className="delete-overlay">
      <div className="delete-modal">
        <h3>Are you sure?</h3>
        <p>
          Do you really want to delete <strong>{doctor.name}</strong>?  
          This action cannot be undone.
        </p>

        <div className="buttons">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="delete" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}
