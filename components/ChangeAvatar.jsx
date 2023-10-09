"use client";

import Image from "next/image";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage } from "@/firebase/config";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import Spinner from "./Spinner";

export default function ChangeAvatar({ setAvatar }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  const [updateProfile, updating] = useUpdateProfile(auth);

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        const ref = storageRef(storage, selectedFile.name);
        const snapshot = await uploadBytes(ref, selectedFile);
        const downloadURL = await getDownloadURL(snapshot.ref);

        await updateProfile({
          photoURL: downloadURL,
        })
          .then(() => {
            setSelectedFile(null);
          })
          .then(() => {
            setAvatar(downloadURL);
          });
        // Show success message to user
      }
    } catch (err) {
      console.log(err);
      // Show error message to user
    }
  };

  return (
    <div className="flex justify-center flex-col">
      <label
        htmlFor="avatar"
        className="flex justify-center mx-auto cursor-pointer hover:opacity-80"
      >
        {updating || loading ? (
          <div className="object-cover w-24 h-24 mx-2 flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <Image
            width={200}
            height={200}
            className="object-cover w-24 h-24 mx-2 rounded-full"
            src={
              selectedFile
                ? URL.createObjectURL(selectedFile)
                : user?.photoURL || "/RYB.png"
            }
            alt="avatar upload"
          />
        )}
      </label>
      <input
        id="avatar"
        type="file"
        onChange={(e) => {
          const file = e.target.files ? e.target.files[0] : undefined;
          setSelectedFile(file);
        }}
        className="hidden"
      />
      {selectedFile && (
        <button
          className="coral-btn h-6 w-3 mx-auto mt-1"
          onClick={handleUpload}
        >
          Upload
        </button>
      )}
    </div>
  );
}
