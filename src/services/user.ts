"use server";
import { loginType, signUpType } from "@/model/user";
import prisma from "@/model/db";
import { wrapServerAction } from "@/services/utils";
import { hashPassword, verifyPassword } from "@/lib/hash";
import { FieldCustomError } from "@/exceptions/error";
import { redirect } from "next/navigation";


export const signUp = wrapServerAction(async (user: signUpType) => {
  const {
    salt,
    hash
  } = hashPassword(user.password);
  const userData = {
    ...user,
    salt,
    password: hash
  };

  return await prisma.user.create({
    data: userData
  });
});
export const login = wrapServerAction(async (user: loginType) => {
  const mUser = await prisma.user.findUnique({
    where: {
      email: user.email
    }
  });
  if (!mUser) {
    throw new FieldCustomError([
      {
        field: "password",
        message: "Invalid email or password"
      }
    ]);
  }
  const isPasswordValid = verifyPassword({
    salt: mUser.salt,
    hash: mUser.password,
    userPassword: user.password
  });
  if (!isPasswordValid) {
    throw new FieldCustomError([
      {
        field: "password",
        message: "Invalid email or password"
      }
    ]);
  }
  // redirect("/dashboard")


});