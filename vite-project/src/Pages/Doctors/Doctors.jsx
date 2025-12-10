import { useEffect, useState,  } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import "./Doctors.scss";
import AddDoctorModal from "../../Components/AddDoctorModal/AddDoctorModal";
import DeleteDoctorModal from "../../Components/DeleteDoctorModal/DeleteDoctorModal";
import EditDoctorModal from "../../Components/EditDoctorModal/EditDoctorModal";


export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 5;

  const totalPages = Math.ceil(filtered.length / limit);
  const paginated = filtered.slice((page - 1) * limit, page * limit);

    const token = localStorage.getItem("token");


  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("https://hpis-api.up.railway.app/api/Doctors", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Xəta baş verdi.");

      const data = await res.json();
      setDoctors(data);
      setFiltered(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setPage(1);
    }
  };

  const handleSearch =(value) => {
    setSearch(value);

    if (value.trim() === "") {
      setFiltered(doctors);
    } else {
      const results = doctors.filter((doc)=> doc.name.toLowerCase().includes(value.toLowerCase()));
      setFiltered(results);
    }
    setPage(1);
  }

  return (
    <div className="doctors-page">
      
      <div className="head-row">
        <h2>Doctors</h2>
        <button className="add-btn" onClick={() => setAddOpen(true)}>+ Add Doctor</button>
      </div>

      <p className="subtext">Manage doctor profiles and schedules</p>

      {/* SEARCH */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name or specialty..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}

      {/* TABLE */}
        {!loading && !error && (

        <table className="doctors-table">

            <thead>
                <tr>
                    <th>Name</th>
                    <th>Specialty</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th className="actions-col">Actions</th>
                </tr>
            </thead>

            <tbody>
                {paginated.map((doc) => (
                    <tr key={doc.id}>
                    <td>{doc.name}</td>
                    <td>{doc.specialty}</td>
                    <td>{doc.phoneNumber}</td>
                    <td>{doc.email}</td>
                    <td>
                        {doc.isActive ? (
                        <span className="active">Active</span>
                        ) : (
                        <span className="inactive">Inactive</span>
                        )}
                    </td>
                    <td className="actions">
                        <FiEdit2 className="edit"
                        onClick={() => {
                          setEditId(doc.id);
                          setEditOpen(true);
                        }}
                        />
                        <FiTrash2
                        className="delete"
                        onClick={() => {setSelectedDoctor(doc);
                          setDeleteOpen(true);
                        }}
                        />
                    </td>
                    </tr>
                ))}

                {paginated.length === 0 && (
                    <tr>
                    <td colSpan="6" className="no-data">
                        No doctors found
                    </td>
                    </tr>
                )}
            </tbody>

        </table>
        )}

        
      

      {/* PAGINATION */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={page === i + 1 ? "active-page" : ""}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      <AddDoctorModal 
        open={addOpen}
        onClose={()=> setAddOpen(false)}
        onSuccess={fetchDoctors}
      />

      <DeleteDoctorModal 
      open={deleteOpen}
      onClose={() => setDeleteOpen(false)}
      onSuccess={fetchDoctors}
      doctor={selectedDoctor}
      />

      <EditDoctorModal
      open={editOpen}
      onClose={()=> setEditOpen(false)}
      doctorId={editId}
      onSuccess={fetchDoctors}
      />
    </div>
  );
}
