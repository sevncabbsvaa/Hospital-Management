import { useState } from "react";
import "./AddDoctorModal.scss";
import { addDoctor } from "../../Services/doctorsService";

export default function AddDoctorModal({ open, onClose, onSuccess }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    specialty: "",
    phoneNumber: "",
    email: "",
    isActive: true,
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
      await addDoctor({
        username: form.username,
        password: form.password,
        name: form.name,
        specialty: form.specialty,
        phoneNumber: form.phoneNumber,
        email: form.email,
        isActive: form.isActive
      });

      onSuccess();     
      onClose();        

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
            <label>Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="psddword"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

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
            <label>Speciality</label>
            <input
              name="specialty"
              value={form.specialty}
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
            <label>Activity</label>
            <input
              name="isActive"
              value={form.isActive}
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
