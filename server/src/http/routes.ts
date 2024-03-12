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

    const completedHabits = day?.dayHabits?.map(item => item.habitId) ?? [];

    return {
      possibleHabits,
      completedHabits
    };
  });

  app.patch("/habits/:id/toggle", async (request, reply) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid()
    });

    const { id } = toggleHabitParams.parse(request.params);

    const today = startOfToday();

    let day = await prisma.day.findUnique({
      where: {
        date: today
      }
    });

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today
        }
      });
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        dayId_habitId: {
          dayId: day.id,
          habitId: id
        }
      }
    });

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id
        }
      });

      reply.code(204);

      return;
    }

    await prisma.dayHabit.create({
      data: {
        dayId: day.id,
        habitId: id
      }
    });
  });

  app.get("/summary", async () => {
    const summary = await prisma.$queryRaw`
      SELECT d.id, d.date,
      (
        SELECT cast(count(*) as float)
        FROM dayHabits dh
        WHERE dh.dayId = d.id
      ) as completed,
      (
        SELECT cast(count(*) as float)
        FROM habitWeekdays hw
        JOIN habits h ON h.id = hw.habitId
        WHERE 
          hw.weekday = cast(strftime('%w', d.date / 1000, 'unixepoch') as int) 
          AND h.createdAt <= d.date
      ) as amount
      FROM days d
    `;

    return summary;
  });
}