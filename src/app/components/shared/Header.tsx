"use client";

import SignIn from "../Signin";
import SignOut from "../Signout";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <header className="py-4 px-6 shadow-md">
      <nav className="flex items-center justify-between px-2 md:px-0 md:w-[90vw]  mx-auto">
        <h1 className="text-3xl font-bold">Code Roaster</h1>

        <div>{!session ? <SignIn /> : <SignOut />}</div>
      </nav>
    </header>
  );
}
