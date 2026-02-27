const API_URL = "http://localhost:8080/api/user";

export const fetchProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
};