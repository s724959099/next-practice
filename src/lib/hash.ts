import crypto from "crypto";

export const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return { salt, hash };
};

interface VerifyPasswordArg {
  userPassword: string;
  salt: string;
  hash: string;
}

export const verifyPassword = ({ userPassword, salt, hash }: VerifyPasswordArg) => {
  const candidateHash = crypto.pbkdf2Sync(userPassword, salt, 1000, 64, "sha512").toString("hex");
  return candidateHash === hash;
};