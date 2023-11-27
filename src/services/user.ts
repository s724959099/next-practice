"use server";
import { userType } from "@/model/user";
import prisma from "@/model/db";
import { wrapServerAction } from "@/services/utils";
import { hashPassword } from "@/lib/hash";

export const signUp = wrapServerAction(async (user: userType) => {
  const {
    salt,
    hash
  } = hashPassword(user.password);
  user.password = hash;
  user.salt = salt;

  return await prisma.user.create({
    data: user
  });
});