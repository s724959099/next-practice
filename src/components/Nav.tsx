"use client";
import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="flex gap-5">
      <Link href={"/login"}>Login</Link>
      <Link href={"/signup"}>Signup</Link>
      <Link href={"/"}>Home</Link>
    </nav>
  );
};
export default Nav;