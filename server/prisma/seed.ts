import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const firstHabitId = '0730ffac-d039-4194-9571-01aa2aa0efbd';
const secondHabitId = '00880d75-a933-4fef-94ab-e05744435297';
const thirdHabitId = 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00';

async function main() {
  await prisma.dayHabit.deleteMany();
  await prisma.habitWeekday.deleteMany();
  await prisma.habit.deleteMany();
  await prisma.day.deleteMany();

  await Promise.all([
    prisma.habit.create({
      data: {
        id: firstHabitId,
        title: "Beber 2L de água",
        createdAt: new Date("2024-02-05T03:00:00.000"),
        weekdays: {
          create: [
            { weekday: 1 },
            { weekday: 2 },
            { weekday: 3 },
          ]
        }
      }
    }),
    prisma.habit.create({
      data: {
        id: secondHabitId,
        title: "Exercitar",
        createdAt: new Date("2024-02-07T03:00:00.000"),
        weekdays: {
          create: [
            { weekday: 3 },
            { weekday: 4 },
            { weekday: 5 },
          ]
        }
      }
    }),
    prisma.habit.create({
      data: {
        id: thirdHabitId,
        title: "Dormir 8h",
        createdAt: new Date("2024-02-09T03:00:00.000"),
        weekdays: {
          create: [
            { weekday: 1 },
            { weekday: 2 },
            { weekday: 3 },
            { weekday: 4 },
            { weekday: 5 },
          ]
        }
      }
    })
  ]);

  await Promise.all([
    prisma.day.create({
      data: {
        date: new Date("2024-02-06T03:00:00.000"),
        dayHabits: {
          create: {
            habitId: firstHabitId
          }
        }
      }
    }),
    prisma.day.create({
      data: {
        date: new Date("2024-02-07T03:00:00.000"),
        dayHabits: {
          create: {
            habitId: firstHabitId
          }
        }
      }
    }),
    prisma.day.create({
      data: {
        date: new Date("2024-02-14T03:00:00.000"),
        dayHabits: {
          create: [
            { habitId: firstHabitId },
            { habitId: secondHabitId }
          ]
        }
      }
    }),
  ]);
}

main();