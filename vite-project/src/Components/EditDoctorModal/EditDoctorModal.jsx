import { useEffect, useState } from "react";
import "./EditDoctorModal.scss";
import { getDoctorById, updateDoctor } from "../../Services/doctorsService";

export default function EditDoctorModal({ open, onClose, doctorId, onSuccess }) {
  const [form, setForm] = useState({
    id: "",
    username: "",
    password: "",
    name: "",
    specialty: "",
    phoneNumber: "",
    email: "",
    isActive: true
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && doctorId) fetchDoctor();
  }, [open, doctorId]);

  const fetchDoctor = async () => {
    try {
      setFetching(true);
      const data = await getDoctorById(doctorId);

      setForm({
        id: data.id,
        username: data.userName,
        password: "", // backend tələb edirsə boş saxlanır
        name: data.name,
        specialty: data.specialty,
        phoneNumber: data.phoneNumber,
        email: data.email,
        isActive: data.isActive
      });
    } catch (err) {
      console.error(err);
      setError("Məlumat yüklənmədi.");
    } finally {
      setFetching(false);
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
    const body = {
      name: form.name,
      specialty: form.specialty,
      phoneNumber: form.phoneNumber,
      email: form.email,
      isActive: form.isActive === "Active" ? true : false 
    };

    await updateDoctor(doctorId, body);

    onSuccess();
    onClose();

  } catch (err) {
    console.log(err);
    setError("Xəta baş verdi. Yenidən cəhd edin.");
  } finally {
    setLoading(false);
  }
};


  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2>Edit Doctor</h2>

        {fetching ? (
          <p>Loading...</p>
        ) : (
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
              <label>Password (optional)</label>
              <input
                name="password"
                type="password"
                placeholder="Leave empty to keep existing"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Full Name</label>
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
              <label>Phone Number</label>
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
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
