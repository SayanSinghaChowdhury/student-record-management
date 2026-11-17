"use client";
import { teacherSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../shadcnui/button";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";

const RegisterTeacher = () => {
  const { control } = useForm({
    resolver: zodResolver(teacherSchema),

    defaultValues: {
      fullName: "",
      email: "",
      phNumber: "",
      streams: "",
      subject: "",
    },
    mode: "all",
  });

  // steream data Store

  const stream = ["Arts", "Comerce", "Science"];
  return (
    <form className="grid w-full place-items-center gap-6">
      <Controller
        name="fullName"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-rhf-demo-title">Name:</FieldLabel>
            <Input
              {...field}
              type="text"
              aria-invalid={fieldState.invalid}
              placeholder="Enter your full name"
              autoComplete="family-name"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-rhf-demo-title">Email:</FieldLabel>
            <Input
              {...field}
              type="email"
              aria-invalid={fieldState.invalid}
              placeholder="Enter your email"
              autoComplete="mobile email"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="phNumber"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-rhf-demo-title">Number:</FieldLabel>
            <Input
              {...field}
              type="number"
              aria-invalid={fieldState.invalid}
              placeholder="Enter your number"
              autoComplete="tel"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="streams"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-rhf-demo-title">Stream:</FieldLabel>

            <div className="grid w-full grid-cols-3 gap-3">
              {stream.map((stream) => (
                <Button
                  className={``}
                  key={stream}
                  onClick={() => field.onChange(stream)}
                  variant={field.value === stream ? "default" : "outline"}>
                  Arts
                </Button>
              ))}
            </div>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </form>
  );
};

export default RegisterTeacher;
