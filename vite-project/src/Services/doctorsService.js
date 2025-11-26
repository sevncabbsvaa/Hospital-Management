const BASE_URL = "https://hpis-api.up.railway.app/api/Doctors";

export const getToken = () => localStorage.getItem("token");

// GET ALL

export const getDoctors = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to load doctors");
  }

  return await res.json();
};

// GET BY ID
export const getDoctorById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!res.ok) throw new Error("Doctor not found");
  return await res.json();
};

// CREATE

export const addDoctor = async (data) => {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed");
  return await res.json();
};


// UPDATE
export const updateDoctor = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update doctor");
  return await res.json();
};

// DELETE
export const deleteDoctor = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!res.ok) throw new Error("Failed to delete doctor");
  return true;
};

// SEARCH
export const searchDoctors = async (query) => {
  const res = await fetch(`${BASE_URL}/search?name=${query}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!res.ok) throw new Error("Search failed");
  return await res.json();
};
