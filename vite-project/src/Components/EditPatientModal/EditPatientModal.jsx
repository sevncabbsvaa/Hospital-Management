import { useEffect, useState } from "react";
import "./EditPatientModal.scss";
import { getPatientById, updatePatient } from "../../Services/patientsService";

export default function EditPatientModal({ open, onClose, patientId, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    symptoms: "",
    phoneNumber: "",
    email: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);
  const [loadPatient, setLoadPatient] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && patientId) fetchData();
  }, [open, patientId]);

  const fetchData = async () => {
    try {
      setLoadPatient(true);
      const data = await getPatientById(patientId);
      setForm({
        name: data.name,
        age: data.age,
        symptoms: data.symptoms,
        phoneNumber: data.phoneNumber,
        email: data.email,
        address: data.address
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoadPatient(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await updatePatient(patientId, form);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Xəta baş verdi. Yenidən cəhd edin.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Patient</h2>

        {loadPatient ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Name</label>
              <input name="name" value={form.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Age</label>
              <input type="number" name="age" value={form.age} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Symptoms</label>
              <input name="symptoms" value={form.symptoms} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input name="address" value={form.address} onChange={handleChange} />
            </div>

            {error && <p className="error">{error}</p>}

            <div className="buttons">
              <button type="button" className="cancel" onClick={onClose}>Cancel</button>
              <button type="submit" className="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
