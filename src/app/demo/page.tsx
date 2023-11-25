"use client";

import { useRouter } from "next/navigation";
import {Button} from "@/components/ui/button";

export default function Page() {
  const router = useRouter();

  return (
    <Button type="button" onClick={() => router.push("/")}>
      Dashboard
    </Button>
  );
}