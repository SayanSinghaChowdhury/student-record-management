"use client";

import { teacherSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { teacherSchemaType } from "@/lib/types";
import teacherServerAction from "@/server/teacherServerAction";
import { useRouter } from "next/navigation";
import { Button } from "../shadcnui/button";
import { Checkbox } from "../shadcnui/checkbox";
import { Field, FieldError, FieldLabel } from "../shadcnui/field";
import { Input } from "../shadcnui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcnui/popover";
import { toast } from "../shadcnui/toast";

const RegisterTeacher = () => {
  // Stream data
  const stream = ["Arts", "Commerce", "Science"];
  // Stream subjects
  const streamSubjects = {
    Arts: [
      "History",
      "Geography",
      "Education",
      "Political Science",
      "English (Compulsory)",
      "Bengali (Compulsory)",
    ],

    Commerce: [
      "Accountancy",
      "Business Studies",
      "Economics",
      "Business Mathematics",
      "English (Compulsory)",
      "Bengali (Compulsory)",
    ],

    Science: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "Biology",
      "English (Compulsory)",
      "Bengali (Compulsory)",
    ],
  };

  const { push } = useRouter();
  const {
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(teacherSchema),

    defaultValues: {
      fullName: "",
      email: "",
      phNumber: "",
      stream: "",
      subject: [],
    },

    mode: "all",
  });
  // Watch stream value
  const selectedStream = useWatch({
    control,
    name: "stream",
  });

  const handleSubmitForm = async (fdata: teacherSchemaType) => {
    const { isSuccess, message, title } = await teacherServerAction(fdata);
    if (isSuccess) {
      toast.add({
        type: "isSuccess",
        title: title,
        description: message,
        priority: "high",
      });

      reset();

      push("/student");
    } else {
      toast.add({
        type: "error",
        title: title,
        description: message,
        priority: "high",
      });
    }

    console.log(fdata);

    reset();
  };

  // Get subjects dynamically
  const subjects =
    streamSubjects[selectedStream as keyof typeof streamSubjects] ?? [];

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="grid w-full place-items-center gap-6">
      {/* Full Name */}
      <Controller
        name="fullName"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Name:</FieldLabel>

            <Input
              {...field}
              type="text"
              aria-invalid={fieldState.invalid}
              placeholder="Enter your full name"
              autoComplete="name"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Email */}
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Email:</FieldLabel>

            <Input
              {...field}
              type="email"
              aria-invalid={fieldState.invalid}
              placeholder="Enter your email"
              autoComplete="email"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Phone */}
      <Controller
        name="phNumber"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Number:</FieldLabel>

            <Input
              {...field}
              type="tel"
              aria-invalid={fieldState.invalid}
              placeholder="Enter your number"
              autoComplete="tel"
            />

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Stream */}
      <Controller
        name="stream"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Stream:</FieldLabel>
            {/* stream select */}
            <div className="grid w-full grid-cols-3 gap-3">
              {stream.map((item) => (
                <Button
                  type="button"
                  key={item}
                  onClick={() => {
                    if (field.value !== item) {
                      field.onChange(item);
                      // Clear previous subjects
                      setValue("subject", [], {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }
                  }}
                  variant={field.value === item ? "default" : "outline"}>
                  {item}
                </Button>
              ))}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          </Field>
        )}
      />

      {/* Multiple Subjects */}

      <Controller
        name="subject"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Subjects:</FieldLabel>

            <Popover>
              <PopoverTrigger
                render={
                  <Button
                    type="button"
                    variant="outline"
                    disabled={!selectedStream}
                    className="w-full justify-between font-normal">
                    {field.value.length ?
                      `${field.value.length} subjects selected`
                    : "Select Subjects"}

                    <ChevronDown className="size-4" />
                  </Button>
                }
              />

              <PopoverContent>
                <div className="w-full">
                  {subjects.map((subject) => (
                    <label
                      key={subject}
                      htmlFor={subject}
                      className="hover:bg-accent flex cursor-pointer items-center gap-3 rounded-md p-2">
                      <Checkbox
                        id={subject}
                        checked={field.value.includes(subject)}
                        onCheckedChange={(checked) => {
                          field.onChange(
                            checked ?
                              [...field.value, subject]
                            : field.value.filter((item) => item !== subject),
                          );
                        }}
                      />

                      <span className="text-sm">{subject}</span>
                    </label>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* Submit */}

      <Button
        disabled={!isDirty || isSubmitting}
        type="submit"
        className="w-full">
        Register Teacher
      </Button>
    </form>
  );
};

export default RegisterTeacher;
