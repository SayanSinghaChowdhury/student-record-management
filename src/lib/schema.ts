import z from "zod";

export const teacherSchema = z.object({
  fullName: z
    .string()
    .min(6, "Minimum 6 characters required")
    .max(32, "Maximum 32 characters allowed"),

  email: z
    .email("Enter a valid email address")
    .endsWith("@gmail.com", "Only Gmail addresses are allowed"),

  phNumber: z
    .string()
    .min(1, "Phone number is required")
    .max(10, "Maximum 10 digits allowed"),

  stream: z.string().min(1, "Please select a stream"),

  subject: z.array(z.string()).length(6, "Please select all 6 subjects"),
});

export const studentSchema = z.object({
  fullName: z
    .string({ error: "enter your full name" })
    .min(6, { error: "we need minimum 6 character" })
    .max(32, { error: "maximum 32 character" }),

  email: z.email({ error: "enter your email" }).endsWith("@gmail.com"),

  phNumber: z
    .string({ error: "enter your phone number" })
    .min(1, { error: "we need minimum 1 character" })
    .max(10, { error: "maximum 10 character" }),

  stream: z.string({ error: "enter your stream" }),

  teacher: z
    .string({ error: "select your course teacher" })
    .min(1, { error: "select your course teacher" }),
});
