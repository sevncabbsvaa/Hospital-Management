import { useEffect, useState } from "react";
import "./Patients.scss";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import AddPatientModal from "../../Components/AddPatientModal/AddPatientModal";
import DeletePatientModal from "../../Components/DeletePatientModal/DeletePatientModal";
import EditPatientModal from "../../Components/EditPatientModal/EditPatientModal";
import ViewPatientModal from "../../Components/ViewPatientModal/ViewPatientModal";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewId, setViewId] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 5;

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("https://hpis-api.up.railway.app/api/Patients", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Xəta baş verdi.");

      const data = await res.json();
      setPatients(data);
      setFiltered(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setPage(1);
    }
  };

 const handleSearch = (value) => {
  setSearch(value);

  if (value.trim() === "") {
    setFiltered(patients);
  } else {
    const results = patients.filter((p) =>
      p.name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(results);
  }

  setPage(1);
};

const totalPages = Math.ceil(filtered.length / limit);
const paginated = filtered.slice((page - 1) * limit, page * limit);


  return (
    <div className="patients-page">
      <h1>Patients</h1>

      <button className="add-btn" onClick={() => setAddOpen(true)}>
        + Add Patient
      </button>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by patient name..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="table">
          <div className="table-header">
            <span>Name</span>
            <span>Age</span>
            <span>Symptoms</span>
            <span>Actions</span>
          </div>

          {paginated.map((p) => (
            <div className="table-row" key={p.id}>
              <span>{p.name}</span>
              <span>{p.age}</span>
              <span>{p.symptoms}</span>

              <span className="actions">
                <FiEye
                  className="icon"
                  onClick={() => {
                    setViewId(p.id);
                    setViewOpen(true);
                  }}
                />


                <FiEdit2
                  className="icon"
                  onClick={() => {
                    setEditId(p.id);
                    setEditOpen(true);
                  }}
                />

                <FiTrash2
                  className="icon"
                  onClick={() => {
                    setSelectedPatient(p);
                    setDeleteOpen(true);
                  }}
                />
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          {"<"}
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          {">"}
        </button>
      </div>

      <DeletePatientModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onSuccess={fetchPatients}
        patient={selectedPatient}
      />

      <AddPatientModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSuccess={fetchPatients}
      />

      <EditPatientModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        patientId={editId}
        onSuccess={fetchPatients}
      />

      <ViewPatientModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        patientId={viewId}
      />
    </div>
  );
}
