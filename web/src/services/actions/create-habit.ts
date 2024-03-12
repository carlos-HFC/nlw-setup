"use server";

import { api } from "../api";

export async function createHabit(form: string) {
  const response = await api.post("/habits", {
    body: form,
    headers: {
      'Content-Type': 'application/json'
    },
  });

  if (!response.ok) return await response.json();
}