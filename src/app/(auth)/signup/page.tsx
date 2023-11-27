"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import FormInput from "@/components/FormInput";
import { signUpSchema, signUpType } from "@/model/user";
import { signUp } from "@/services/user";
import { useToast } from "@/components/ui/use-toast";
import { cwServerAction } from "@/lib/utils";
import { FieldUniqueError } from "@/exceptions/error";

function Page() {
  const router = useRouter();
  const { register, handleSubmit, setError, formState: { errors } } = useForm<signUpType>({
    resolver: zodResolver(signUpSchema)
  });
  const { toast } = useToast();


  const onSubmit = async (data: signUpType) => {
    try {
      const result = await cwServerAction(signUp)(data);
      router.push("/login");

    } catch (e) {
      console.log(e);
      if (e instanceof FieldUniqueError) {
        e.fieldsError.forEach(fieldError => {
          setError(fieldError.field as keyof signUpType, { type: "manual", message: fieldError.message });
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
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Start your journey with us and unlock your potential.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <FormInput name="Name"
                       placeholder="Name of your project"
                       required
                       error={errors.name}
                       registerProps={register("name")}
            />
            <FormInput name="Email"
                       placeholder="Email of your project"
                       required
                       error={errors.email}
                       registerProps={register("email")}
            />
            <FormInput name="Password"
                       placeholder="Password of your project"
                       required
                       type="password"
                       error={errors.password}
                       registerProps={register("password")}
            />
          </div>
          <CardFooter className="flex justify-between pt-10">
            <Button type="button" variant="outline"
            >Cancel</Button>
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}

export default Page;
