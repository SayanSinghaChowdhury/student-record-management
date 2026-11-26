"use client";

import { studentSchema } from "@/lib/schema";
import { studentSchemaType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const RegisterStudent = () => {
  // Stream data
  const stream = ["Arts", "Commerce", "Science"];

  const { control, handleSubmit } = useForm({
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

  return (
    <form
      onClick={handleSubmit(handleSubmitForm)}
      className="grid w-full place-items-center gap-6">
      {/* name */}
      <Controller
        name="fullName"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Fullname</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your full name"
              autoComplete="family-name"
              type="text"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* email */}
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your email"
              autoComplete="email"
              type="email"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* ph-number */}
      <Controller
        name="phNumber"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Ph-number</FieldLabel>
            <Input
              {...field}
              id={field.name}
              aria-invalid={fieldState.invalid}
              placeholder="Enter your Phone number"
              autoComplete="tel"
              type="number"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="stream"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Stream</FieldLabel>
            <div className="grid grid-cols-3 place-items-center gap-3">
              {stream.map((item) => (
                <Button
                  variant={field.value !== item ? "secondary" : "default"}
                  onClick={() => {
                    if (field.value !== item) {
                      field.onChange(item);
                    }
                  }}
                  className={"w-full"}
                  key={item}>
                  {item}
                </Button>
              ))}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          </Field>
        )}
      />
    </form>
  );
};

export default RegisterStudent;
