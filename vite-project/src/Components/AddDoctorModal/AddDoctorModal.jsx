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
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await addDoctor(form);
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

        <h2>Add Doctor</h2>

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
              type="password"
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
            <label>Specialty</label>
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
              required
            />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              name="isActive"
              value={form.isActive}
              onChange={(e) =>
                setForm({ ...form, isActive: e.target.value === "true" })
              }
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          {error && <p className="error">{error}</p>}

          <div className="buttons">
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="submit" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
