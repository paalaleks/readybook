import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import Spinner from "./Spinner";
import Error from "./Error";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function Login({ toggleRegister }) {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const [signInWithEmailAndPassword, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onsubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password)
      .then(() => {
        router.push("/ryb/libraries");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing in:", errorCode, errorMessage);
      });
  };

  return (
    <form className="" onSubmit={handleSubmit(onsubmit)}>
      <h2 className="font-bold flex text-2xl justify-center pb-6">Login</h2>
      <label htmlFor="UserEmail" className="input-style mb-2">
        <input
          {...register("email")}
          type="email"
          id="UserEmail"
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
      <label htmlFor="UserPassword" className="input-style mb-2">
        <input
          {...register("password")}
          type="password"
          id="UserPassword"
          placeholder="Password"
          className="peer"
        />
        <span className="peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-3 peer-focus:text-xs">
          Password
        </span>
      </label>
      <p className="text-[#780116] text-sm mb-2">{errors.password?.message}</p>
      <button type="submit" className="coral-btn relative">
        {loading ? <Spinner /> : "Login"}
      </button>
      <button className="dim-gray-btn my-2" href="/download">
        Login with Google <FcGoogle className="ml-2" />
      </button>
      <button
        onClick={toggleRegister}
        className="alabaster-transparent-btn w-full h-12"
      >
        ...or sign up for an account.
      </button>
    </form>
  );
}
