import Link from "next/link";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import {
  LuSettings2,
  LuLogOut,
  LuLibrary,
  LuPlus,
  LuQrCode,
  LuSquare,
} from "react-icons/lu";
import ChangeAvatar from "./ChangeAvatar";

export default function Sidebar({ setAvatar }) {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();

  const logout = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <aside className="absolute flex flex-col top-0 right-0 w-64 h-screen px-4 py-8 overflow-y-auto bg-floral-white border-l rtl:border-r-0 rtl:border-l border-dim-gray border-opacity-10 shadow-sm bg-[url('/noise.png')] bg-repeat bg-[length:75px_75px]">
      <div className="flex flex-col items-center -mx-2 mb-6">
        <ChangeAvatar setAvatar={setAvatar} />
        <h4 className="mx-2 mt-2">{user?.displayName}</h4>
        <p className="mx-2 text-xs">{user?.email}</p>
      </div>

      <nav className="space-y-2">
        <Link
          className="flex w-36 mx-auto hover:bg-alabaster-400 hover:bg-opacity-20 p-2 transition-all ease-in-out duration-300 transform rounded-lg "
          href="/ryb/libraries"
        >
          <div className="flex items-center pl-3">
            <LuLibrary />
            <span className="pl-2">Libraries</span>
          </div>
        </Link>
        <Link
          className="flex w-36 mx-auto hover:bg-alabaster-400 hover:bg-opacity-20 p-2 transition-all ease-in-out duration-300 transform rounded-lg "
          href="/ryb/my-library"
        >
          <div className="flex items-center pl-3">
            <LuLibrary />
            <span className="pl-2">My Library</span>
          </div>
        </Link>
        {pathname === "/ryb/my-library" && (
          <div>
            <Link
              className="flex w-36 mx-auto hover:bg-alabaster-400 hover:bg-opacity-20 p-2 transition-all ease-in-out duration-300 transform rounded-lg "
              href="/ryb/my-library#lent"
            >
              <div className="flex items-center pl-3">
                <LuSquare fontSize={16} className="ml-2" />
                <span className="text-sm pl-3">Lent</span>
              </div>
            </Link>
            <Link
              className="flex w-36 mx-auto hover:bg-alabaster-400 hover:bg-opacity-20 p-2 transition-all ease-in-out duration-300 transform rounded-lg "
              href="/ryb/my-library#borrowed"
            >
              <div className="flex items-center pl-3">
                <LuSquare fontSize={16} className="ml-2" />
                <span className="text-sm pl-3">Borrowed</span>
              </div>
            </Link>
          </div>
        )}
        <Link
          className="flex w-36 mx-auto hover:bg-alabaster-400 hover:bg-opacity-20 p-2 transition-all ease-in-out duration-300 transform rounded-lg "
          href="/ryb/add-books"
        >
          <div className="flex items-center pl-3">
            <LuPlus className="mr-2" />
            <span className="">Add books</span>
          </div>
        </Link>
        <Link
          className="flex w-36 mx-auto hover:bg-alabaster-400 hover:bg-opacity-20 p-2 transition-all ease-in-out duration-300 transform rounded-lg "
          href="/ryb/pair-labels"
        >
          <div className="flex items-center pl-3">
            <LuQrCode className="mr-2" />
            <span className="">Pair labels</span>
          </div>
        </Link>

        <Link
          className="flex w-36 mx-auto hover:bg-alabaster-400 hover:bg-opacity-20 p-2 transition-all ease-in-out duration-300 transform rounded-lg "
          href="/ryb/settings"
        >
          <div className="flex items-center pl-3">
            <LuSettings2 className="mr-2" />
            <span className="">Settings</span>
          </div>
        </Link>
        <div
          onClick={logout}
          className="flex w-36 mx-auto hover:bg-alabaster-400 hover:bg-opacity-20 p-2 transition-all ease-in-out duration-300 transform rounded-lg cursor-pointer"
        >
          <div className="flex items-center pl-3">
            <LuLogOut className="mr-2" />
            <span className="">Logout</span>
          </div>
        </div>
      </nav>
      <span className="text-coral font-bold mt-auto mx-auto">READYBOOK</span>
    </aside>
  );
}
