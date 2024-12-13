import Link from "next/link";

import { ThemeToggle } from "~/components/ThemeToggle";
import { UserNav } from "./UserNav";
import { NavbarLogin } from "./ButtonLogin";
import { auth } from "~/server/auth";
import { Suspense } from "react";

async function UserNavWithData() {
  const [session] = await Promise.all([auth()]);

  return (
    <>
      <ThemeToggle />
      {session ? (
        <UserNav
          email={session?.user?.email as string}
          image={session?.user?.image as string}
          name={session?.user?.name as string}
        />
      ) : (
        <div className="flex items-center gap-x-5">
          <NavbarLogin />
        </div>
      )}
    </>
  );
}

export function Navbar() {
  return (
    <nav className="flex h-[10vh] items-center border-b bg-background px-4">
      <div className="container mx-auto flex w-full items-center justify-between">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Note<span className="text-primary">Saas</span>
          </h1>
        </Link>

        <div className="flex items-center gap-x-5">
          <Suspense fallback={<div>Loading...</div>}>
            <UserNavWithData />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
