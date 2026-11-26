import { ReactNode } from "react";
import z from "zod";
import { studentSchema, teacherSchema } from "./schema";

export type LayoutProps = Readonly<{
  children: ReactNode;
}>;

export type teacherSchemaType = z.infer<typeof teacherSchema>;

export type studentSchemaType = z.infer<typeof studentSchema>;
