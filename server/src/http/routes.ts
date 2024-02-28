import { getDay, parseISO, startOfDay, startOfToday } from "date-fns";
import { FastifyInstance } from "fastify";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function routes(app: FastifyInstance) {
  app.post("/habits", async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekdays: z.array(
        z.number().min(0).max(6)
      )
    });

    const { title, weekdays } = createHabitBody.parse(request.body);

    const today = startOfToday();

    await prisma.habit.create({
      data: {
        title,
        createdAt: today,
        weekdays: {
          create: weekdays.map(weekday => ({ weekday }))
        }
      }
    });
  });

  app.get("/day", async (request) => {
    const getDayParams = z.object({
      date: z.string()
    });

    const { date } = getDayParams.parse(request.query);

    const parsedDate = parseISO(date);
    const weekday = getDay(startOfDay(parsedDate));

    const possibleHabits = await prisma.habit.findMany({
      where: {
        createdAt: {
          lte: parsedDate
        },
        weekdays: {
          some: {
            weekday
          }
        }
      }
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate
      },
      include: {
        dayHabits: true
      }
    });

    const completedHabits = day?.dayHabits?.map(item => item.habitId) ?? undefined;

    return {
      possibleHabits,
      completedHabits
    };
  });
}