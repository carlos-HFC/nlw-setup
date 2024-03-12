"use server";

import { api } from "../api";

import { DAY_HABIT } from "@/constants/next-tags";

export async function getDay(date: Date) {
  return await api.get(`/day?date=${date.toISOString()}`, {
    method: "GET",
    cache: "force-cache",
    next: {
      tags: [DAY_HABIT]
    }
  }) as { data: ListHabits; };
}