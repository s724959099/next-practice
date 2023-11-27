"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FormInput from "@/components/FormInput";
import { loginSchema, loginType } from "@/model/user"; // Adjusted for login
import { login } from "@/services/user"; // Adjusted for login
import { useToast } from "@/components/ui/use-toast";
import { cwServerAction } from "@/lib/utils";
import { FieldCustomError, FieldUniqueError } from "@/exceptions/error";

function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, setError, formState: { errors } } = useForm<loginType>({
    resolver: zodResolver(loginSchema)
  });
  const { toast } = useToast();

  const onSubmit = async (data: loginType) => {
    try {
      await cwServerAction(login)(data); // Adjusted for login
      router.push("/dashboard");

    } catch (e) {
      console.log(e);
      if (e instanceof FieldCustomError) {
        e.fieldsError.forEach(fieldError => {
          setError(fieldError.field as keyof loginType, { type: "manual", message: fieldError.message });
        });
        return;
      }
      toast({
        title: "Unknow error",
        description: "This is an unknow error, please try again later",
      });

    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardDescription>Access your account and continue your journey with us.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            {/* Adjust the fields for login */}
            <FormInput name="Email"
                       placeholder="Your Email"
                       required
                       error={errors.email}
                       registerProps={register("email")}
            />
            <FormInput name="Password"
                       placeholder="Your Password"
                       required
                       type="password"
                       error={errors.password}
                       registerProps={register("password")}
            />
          </div>
          <CardFooter className="flex justify-between pt-10">
            <Button type="button" variant="outline"
            >Cancel</Button>
            <Button type="submit">Log In</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

export default LoginPage;
