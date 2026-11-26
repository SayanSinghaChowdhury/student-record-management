"use client";

import { studentSchema } from "@/lib/schema";
import { studentSchemaType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const RegisterStudent = () => {
  const {} = useForm({
    resolver: zodResolver(studentSchema),

    defaultValues: {
      fullName: "",
      email: "",
      phNumber: "",
      stream: "",
      teacher: "",
    },

    mode: "all",
  });

  const handleSubmitForm = (fdata: studentSchemaType) => {
    console.log(fdata);
  };

  return <div>Enter</div>;
};

export default RegisterStudent;
