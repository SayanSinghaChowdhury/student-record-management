"use server";

import prisma from "@/lib/dbClient/prisma";
import { teacherSchemaType } from "@/lib/types";
import { PrismaClientInitializationError } from "@generated/prisma/internal/prismaNamespace";

export const teacherServerAction = async (fdata: teacherSchemaType) => {
  try {
    await prisma.teacher.create({
      data: {
        fullName: fdata.fullName,
        email: fdata.email,
        phNumber: fdata.phNumber,

        // Create Stream
        streams: {
          create: {
            stream: fdata.stream,
          },
        },

        // Create multiple Subjects
        subjects: {
          create: fdata.subject.map((item) => ({
            subject: item,
          })),
        },
      },
    });
    return {
      isSuccess: true,

      title: "Teacher Registration Successfully Completed",

      message:
        "I promise to create lessons that are interesting, informative, and beneficial for you",
    };
  } catch (error) {
    if (error instanceof PrismaClientInitializationError) {
      return {
        isSuccess: false,

        title: error.name,

        message: error.message,
      };
    }

    if (error instanceof Error) {
      return {
        isSuccess: false,

        title: error.name,

        message: error.message,
      };
    }
    return {
      isSuccess: false,

      title: "Teacher Registration Failed",

      message: "something went wornt try some times later.....",
    };
  }
};

export default teacherServerAction;
