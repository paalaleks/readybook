"use client";

import Link from "next/link";
import { LuArrowRight, LuArrowLeft } from "react-icons/lu";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import Login from "./Login";
import Register from "./Register";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

export default function GoToAppBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [showRegister, setShowRegister] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleRegister = () => {
    setShowRegister(!showRegister);
  };

  return (
    <>
      {user && mounted ? (
        <Link href={"/ryb/libraries"} className="alabaster-transparent-btn">
          Go to app <LuArrowRight className="ml-2" />
        </Link>
      ) : (
        <div
          onClick={() => setIsOpen(true)}
          className="alabaster-transparent-btn"
        >
          Go to app <LuArrowRight className="ml-2" />
        </div>
      )}
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {!showRegister ? (
          <Login toggleRegister={toggleRegister} />
        ) : (
          <>
            <div className=" relative flex items-center justify-center mb-6">
              <button className="absolute left-2 alabaster-circle-btn">
                <LuArrowLeft fontSize={18} onClick={toggleRegister} />
              </button>

              <h2 className="font-bold text-2xl">New user</h2>
            </div>

            <Register toggleRegister={toggleRegister} />
          </>
        )}
      </Modal>
    </>
  );
}
