"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


function Home() {
  const router = useRouter();

  function onSubmit() {
    console.log("oops");
    router.push("/login");
  };

  // redirect("/login");

  return (
    <div>
      Home page
      <Button
        onClick={onSubmit}
      >Go to</Button>
    </div>

  );
}


export default Home;