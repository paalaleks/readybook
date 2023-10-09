"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.push("/");
    }
  }, [user, mounted, router]);

  if (mounted && user) {
    return (
      <>
        <div className="max-w-screen-xl mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="py-12">
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div className="w-24 text-sm text-center">
                <Image
                  alt="hei"
                  src="/a-Dolls-house.jpg"
                  width={200}
                  height={200}
                />
                <p className="font-semibold mt-1">A Doll&apos;s House</p>
                <p>Henrik Ibsen</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
