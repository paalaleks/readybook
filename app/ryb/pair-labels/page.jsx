"use client";

import generateUrls from "../pair-labels/generateUrls";
import { auth, db } from "@/firebase/config";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Page() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [matchedDocId, setMatchedDocId] = useState(null);
  const [matchedInBackup, setMatchedInBackup] = useState(false);

  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleCodeCheck = async (e) => {
    e.preventDefault();
    setLoading(true);

    const urlsCollectionRef = collection(db, "urls");
    const querySnapshot = await getDocs(urlsCollectionRef);

    let foundMatch = false;
    querySnapshot.forEach((doc) => {
      const urlsDoc = doc.data();
      const { urls } = urlsDoc;

      for (let i = 0; i < urls?.length; i++) {
        const group = urls[i].group;

        if (inputValue.trim().toLowerCase() === group.toLowerCase()) {
          setMatchedDocId(doc.id);
          foundMatch = true;
          console.log("Found a matching group:", group);
          return;
        }
      }
    });

    if (!foundMatch) {
      handlebackupCodeCheck();
    }
  };
  const handlebackupCodeCheck = async () => {
    const urlsCopyCollectionRef = collection(db, "urlsCopy");
    const querySnapshotBackup = await getDocs(urlsCopyCollectionRef);

    let foundMatchInBackup = false;
    querySnapshotBackup.forEach((doc) => {
      const urlsDoc = doc.data();
      const { urls } = urlsDoc;

      for (let i = 0; i < urls?.length; i++) {
        const group = urls[i].group;

        if (inputValue.trim().toLowerCase() === group.toLowerCase()) {
          setMatchedDocId(doc.id);
          foundMatchInBackup = true;
          console.log("Found a matching group in backup:", group);
          return;
        }
      }
    });

    if (foundMatchInBackup) {
      setMatchedInBackup(true);
    } else {
      setError("No matching labels. Try again.");
    }

    setLoading(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const stickerToUserFromBackup = async () => {
      if (matchedDocId !== null) {
        try {
          const matchedObjectDocRef = doc(db, "urlsCopy", matchedDocId);
          const matchedObjectDocSnapshot = await getDoc(matchedObjectDocRef);
          const matchedObject = matchedObjectDocSnapshot.data();
          if (matchedObject !== undefined) {
            const { urls } = matchedObject;
            const docRef = doc(db, "users", user.uid);
            await updateDoc(docRef, {
              urls: arrayUnion(...urls),
            });
            setActiveSection(1);
          }
        } catch (error) {
          console.error(
            "Error occurred while updating the document from backup:",
            error,
          );
        }
      }
    };

    const stickerToUser = async () => {
      if (matchedDocId !== null) {
        if (matchedInBackup) {
          stickerToUserFromBackup();
        } else {
          try {
            const matchedObjectDocRef = doc(db, "urls", matchedDocId);
            const matchedObjectDocSnapshot = await getDoc(matchedObjectDocRef);
            const matchedObject = matchedObjectDocSnapshot.data();
            if (matchedObject !== undefined) {
              const { urls } = matchedObject;
              const docRef = doc(db, "users", user.uid);
              await updateDoc(docRef, {
                urls: arrayUnion(...urls),
              });
              setActiveSection(1);
              router.reload();
            }
          } catch (error) {
            console.error("Error occurred while updating the document:", error);
            return;
          } finally {
            removeStickersFromDB();
          }
        }
      }
    };

    const removeStickersFromDB = async () => {
      if (matchedDocId !== null) {
        try {
          const matchedObjectDocRef = doc(db, "urls", matchedDocId);
          await deleteDoc(matchedObjectDocRef);
        } catch (error) {}
      }
    };

    stickerToUser();
  }, [matchedDocId, matchedInBackup, router, user]);

  const handleGenerateUrls = () => {
    generateUrls();
  };

  return (
    <>
      <div>
        <div className="max-w-xl w-full text-center px-4 overflow-hidden">
          <div className="max-w-md mx-auto text-center relative z-10">
            <h1 className="mb-1">Pair labels</h1>
            <p className="mb-5 relative text-lg">
              Enter the code from the orange and black label.
            </p>
          </div>
          <form
            onSubmit={handleCodeCheck}
            className="flex flex-col max-w-[16rem] mx-auto"
          >
            <input
              minLength={8}
              maxLength={8}
              type="text"
              className="input focus:outline-accent-focus"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              disabled={inputValue.length < 8}
              className={`group btn btn-accent btn-wide btn-active relative mt-2 disabled:opacity-70 disabled:btn-accent`}
            >
              <span className={`${loading ? "loading" : ""}`}>
                {inputValue.length < 8
                  ? "Enter 8 characters code"
                  : "Check code"}
              </span>
            </button>
          </form>
        </div>
      </div>

      <div>
        <button className="coral-btn w-32" onClick={handleGenerateUrls}>
          go
        </button>
      </div>
    </>
  );
}
