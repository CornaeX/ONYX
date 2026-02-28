const BASE_URL = "https://onyxbackend.share.zrok.io/api/blackjack";

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

export const startGame = async (bet: number) => {
  const res = await fetch(`${BASE_URL}/start`, {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ bet }),
  });
  if (!res.ok) throw new Error("Start failed");
  return res.json();
};

export const hitGame = async () => {
  const res = await fetch(`${BASE_URL}/hit`, {
    method: "POST",
    headers: authHeader(),
  });
  if (!res.ok) throw new Error("Hit failed");
  return res.json();
};

export const standGame = async () => {
  const res = await fetch(`${BASE_URL}/stand`, {
    method: "POST",
    headers: authHeader(),
  });
  if (!res.ok) throw new Error("Stand failed");
  return res.json();
};

export const doubleGame = async () => {
  const res = await fetch(`${BASE_URL}/double`, {
    method: "POST",
    headers: authHeader(),
  });
  if (!res.ok) throw new Error("Double failed");
  return res.json();
};

export const splitGame = async () => {
  const res = await fetch(`${BASE_URL}/split`, {
    method: "POST",
    headers: authHeader(),
  });
  if (!res.ok) throw new Error("Split failed");
  return res.json();
};