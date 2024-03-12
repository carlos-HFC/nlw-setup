"use server";

import { revalidateTag } from "next/cache";

import { api } from "../api";

import { DAY_HABIT, SUMMARY_TABLE } from "@/constants/next-tags";

export async function toggleHabit(id: string) {
  const response = await api.patch(`/habits/${id}/toggle`);

  if (response.ok) {
    revalidateTag(DAY_HABIT);
    revalidateTag(SUMMARY_TABLE);
  }

  return response.status;
}