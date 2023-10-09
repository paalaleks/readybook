"use client";

import PopoverComponent from "@/components/Popover";
import Sidebar from "@/components/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { useState, useEffect } from "react";

export default function AppLayout({ children }) {
  const [user, loading, error] = useAuthState(auth);
  const [avatar, setAvatar] = useState(
    user?.photoURL ? user?.photoURL : "/RYB.png",
  );

  const router = useRouter();

  useEffect(() => {
    if (window.location.hash === "#newuser" && user) {
      const userDoc = doc(db, "users", user.uid);
      setDoc(userDoc, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(),
      })
        .then(() => {
          console.log("Document successfully written!");
          router.push("/ryb/libraries");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  }, [user, router]);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <PopoverComponent
        icon={avatar}
        classes="right-4 absolute top-6 rounded-full w-10 h-10 ring-2 ring-dim-gray ring-opacity-10 ring-offset-2 shadow-sm"
      >
        <Sidebar setAvatar={setAvatar} />
      </PopoverComponent>
      {children}
    </>
  );
}
