import { useState } from "react";
import "./AddPatientModal.scss";
import { createPatient } from "../../Services/patientsService";

export default function AddPatientModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    symptoms: "",
    phoneNumber: "",
    email: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createPatient({
        name: form.name,
        age: Number(form.age),
        symptoms: form.symptoms,
        phoneNumber: form.phoneNumber,
        email: form.email,
        address: form.address
      });

      onSuccess();      // Patients list refresh
      onClose();        // Modal close

    } catch (err) {
      setError("Xəta baş verdi. Yenidən cəhd edin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Patient</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Symptoms</label>
            <input
              name="symptoms"
              value={form.symptoms}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          {error && <p className="error">{error}</p>}

          <div className="buttons">
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit" disabled={loading}>
              {loading ? "Loading..." : "Add"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
