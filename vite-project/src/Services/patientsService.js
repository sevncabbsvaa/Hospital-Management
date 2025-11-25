const BASE_URL = "https://hpis-api.up.railway.app/api/Patients";

export const getToken = () => localStorage.getItem("token");

// ====================== GET ALL ======================
export const getPatients = async () => {
  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  if (!res.ok) throw new Error("Failed to load patients");
  return await res.json();
};

// ====================== GET BY ID ======================
export const getPatientById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  if (!res.ok) throw new Error("Patient not found");
  return await res.json();
};

// ====================== CREATE ======================
export const createPatient = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create patient");
  return await res.json();
};

// ====================== UPDATE ======================
export const updatePatient = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update patient");

  if (res.status === 204) return true;

  try {
    return await res.json();
  } catch {
    return true;
  }
};


// ====================== DELETE ======================
export const deletePatient = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  if (!res.ok) throw new Error("Failed to delete patient");
  return true;
};

// ====================== SEARCH ======================
export const searchPatients = async (query) => {
  const res = await fetch(
    `https://hpis-api.up.railway.app/api/Patients/search?name=${query}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (!res.ok) throw new Error("Search failed");
  return await res.json();
};

