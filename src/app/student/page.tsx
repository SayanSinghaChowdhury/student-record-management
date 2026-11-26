import RegisterStudent from "@/components/form/RegisterStudent";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcnui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "student-record-management",
  description: "student-record-management|Student-Registration-page",
};

const page = () => {
  return (
    <section className="grid h-dvh items-center justify-center">
      <Card className="w-sm">
        <CardHeader className="w-full">
          <CardTitle className="text-center text-2xl font-semibold">
            Student Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterStudent />
        </CardContent>
      </Card>
    </section>
  );
};

export default page;
