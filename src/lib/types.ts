import { ReactNode } from "react";
import z from "zod";
import { teacherSchema } from "./schema";

export type LayoutProps = Readonly<{
  children: ReactNode;
}>;

export type teacherSchemaType = z.infer<typeof teacherSchema>;
