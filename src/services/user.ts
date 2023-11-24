"use server";
import { signUpType } from "@/model/user";
import prisma from "@/model/db";
import { wrapServerAction } from "@/services/utils";

export const signUp = wrapServerAction(async (user: signUpType) => {
  return await prisma.user.create({
    data: user
  });
});