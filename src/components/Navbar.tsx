import Link from "next/link";

import { ThemeToggle } from "~/components/ThemeToggle";
import { UserNav } from "./UserNav";
import { NavbarLogin } from "./ButtonLogin";
import { auth } from "~/server/auth";

export async function Navbar() {
  const session = await auth();
  console.log("session", session);

  const user = {
    email: "marshal.saas@gmail.com",
    given_name: "Marshall",
    picture:
      "https://avatars.dicebear.com/api/initials/marshal.saas@gmail.com.svg",
  };

  return (
    <nav className="flex h-[10vh] items-center border-b bg-background">
      <div className="container mx-auto flex w-full items-center justify-between px-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Note<span className="text-primary">Saas</span>
          </h1>
        </Link>

        <div className="flex items-center gap-x-5">
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
        </div>
      </div>
    </nav>
  );
}
