'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the splash
    router.push("/splashpage");
  }, [router]);

  return null; // No content for the Home page, as it redirects immediately
}
