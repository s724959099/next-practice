import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  name: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  registerProps: UseFormRegisterReturn;
  type?: string;
};

const FormInput: React.FC<FormInputProps> = ({ name, required, placeholder, error, type, registerProps }) => (
  <div className="flex flex-col space-y-1.5">
    <Label>
      {required && <span className="text-red-500">*</span>}
      {name}
    </Label>
    <Input placeholder={placeholder} {...registerProps}
           type={type}
    />
    {error && <p className="text-red-500">{error.message}</p>}
  </div>
);

export default FormInput;