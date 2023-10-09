import Image from "next/image";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import { auth, storage } from "@/firebase/config";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import {
  ref as storageRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

const schema = yup.object().shape({
  avatar: yup.mixed().required("Avatar is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function Register() {
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [createUserWithEmailAndPassword, loading, error, user] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating] = useUpdateProfile(auth);

  const ref = storageRef(storage, selectedFile?.name);

  const onsubmit = async (data) => {
    try {
      // Create user
      createUserWithEmailAndPassword(data.email, data.password);

      // Upload avatar to Firebase Storage
      if (selectedFile) {
        const snapshot = await uploadBytes(ref, selectedFile);
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Update user profile
        await updateProfile({
          displayName: data.username,
          photoURL: downloadURL,
        });

        // Navigate to app libraries
        router.push("/ryb/libraries#newuser");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="" onSubmit={handleSubmit(onsubmit)}>
      <label
        htmlFor="avatar"
        className="flex justify-center mx-auto mb-4 cursor-pointer hover:opacity-80 transition-all ease-in-out duration-300 transform rounded-full relative w-max"
      >
        <Image
          width={200}
          height={200}
          className="object-cover w-24 h-24 mx-2 rounded-full"
          src={selectedFile ? URL.createObjectURL(selectedFile) : "/RYB.png"}
          alt="avatar upload"
        />

        <input
          {...register("avatar")}
          id="avatar"
          type="file"
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : undefined;
            setSelectedFile(file);
          }}
          className="hidden"
        />
        <div className="absolute z-20 mx-auto -bottom-0 right-3 bg-dim-gray shadow text-floral-white text-opacity-75 rounded-full p-1">
          <LuUpload />
        </div>
      </label>
      <label htmlFor="username" className="input-style mb-2">
        <input
          {...register("username")}
          type="text"
          id="username"
          placeholder="Username"
          className="peer"
        />
        <span className="peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
          Username
        </span>
      </label>
      {errors?.email?.ref && (
        <p className="text-[#780116] text-sm mb-2">
          {errors.username?.message}
        </p>
      )}
      <label htmlFor="email" className="input-style mb-2">
        <input
          {...register("email")}
          type="email"
          id="email"
          placeholder="Email"
          className="peer"
        />
        <span className="peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
          Email
        </span>
      </label>
      {errors?.email?.ref && (
        <p className="text-[#780116] text-sm mb-2">{errors.email?.message}</p>
      )}
      <label htmlFor="password" className="input-style mb-2">
        <input
          {...register("password")}
          type="password"
          id="password"
          placeholder="Password"
          className="peer"
        />
        <span className="peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
          Password
        </span>
      </label>
      <p className="text-[#780116] text-sm mb-2">{errors.password?.message}</p>
      <button type="submit" className="coral-btn relative">
        {loading ? <Spinner /> : "Register"}
      </button>
    </form>
  );
}
