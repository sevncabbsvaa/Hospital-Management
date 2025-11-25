export const loginUser = async (credentials) => {
  const response = await fetch(
    "https://hpis-api.up.railway.app/api/Auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Login failed");
  }

  return await response.json();
};
