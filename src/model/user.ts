import * as z from "zod";

export const signUpSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  name: z.string(),
});
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string(),
});
export type loginType = z.infer<typeof loginSchema>;

export type signUpType = z.infer<typeof signUpSchema>;
