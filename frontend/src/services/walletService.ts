const API_URL = "https://onyxbackend.share.zrok.io/api/user";

export const deposit = async (amount: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/deposit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  });

  if (!res.ok) throw new Error("Deposit failed");

  return res.json();
};

export const withdraw = async (amount: number) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/withdraw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount }),
  });

  if (!res.ok) throw new Error("Withdraw failed");

  return res.json();
};