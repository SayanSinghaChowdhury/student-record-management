import z from "zod";

export const teacherSchema = z.object({
  fullName: z
    .string({ error: "enter your full name" })
    .min(6, { error: "wee need minimum 6 character" })
    .max(32, { error: "maximum 32 character" }),

  email: z.email({ error: "enter your email" }).endsWith("@gmail.com"),

  phNumber: z
    .string({ error: "enter your phone number" })
    .min(1, { error: "wee need minimum 1 character" })
    .max(10, { error: "maximum 10 character" }),
  streams: z.string({ error: "enter your stream" }),

  subject: z.array(z.string()).min(1, "Select at least one subject"),
});
