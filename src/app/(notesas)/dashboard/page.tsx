import Link from "next/link";

import { Button } from "~/components/ui/button";
import { Edit, File, PencilIcon } from "lucide-react";
import { Card } from "~/components/ui/card";
import { api } from "~/trpc/server";
import { Suspense } from "react";
import { AlertDialogDeleteNote } from "~/app/_components/dialog/DialogDeleteNote";
import { ScrollArea } from "~/components/ui/scroll-area";

async function EmptyNote({ isSubscribed }: { isSubscribed: boolean }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <File className="h-10 w-10 text-primary" />
      </div>

      <h2 className="mt-6 text-xl font-semibold">
        You dont have any notes created
      </h2>
      <p className="mx-auto mb-8 mt-2 max-w-sm text-center text-sm leading-6 text-muted-foreground">
        You currently dont have any notes. please create some so that you can
        see them right here.
      </p>

      <Button asChild>
        <Link href={isSubscribed ? "/n" : "/billing?r=n"}>Create New Note</Link>
      </Button>
    </div>
  );
}

async function DashboardWithData() {
  const notes = await api.notes.getAllNotes();

  if (notes?.Note.length === 0) {
    return <EmptyNote isSubscribed={notes.Subscription?.status === "active"} />;
  }
  return (
    <div className="flex flex-col gap-y-4 px-4">
      {notes?.Note.map((item) => (
        <Card key={item.id} className="flex items-center justify-between p-4">
          <div>
            <h2 className="text-xl font-semibold text-primary">{item.title}</h2>
            <p>
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "full",
              }).format(new Date(item.createdAt))}
            </p>
          </div>

          <div className="flex gap-x-4">
            <Link href={`/n/${item.id}`}>
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
            <AlertDialogDeleteNote noteId={item.id} />
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const statusSub = "active";

  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Your Notes</h1>
          <p className="text-lg text-muted-foreground">
            Here you can see and create new notes
          </p>
        </div>

        {statusSub === "active" ? (
          <Button className="flex items-center justify-center gap-2">
            <PencilIcon className="h-5 w-5" />
            <Link href="/n">Create new Note</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href="/dashboard/billing">Create new Note</Link>
          </Button>
        )}
      </div>

      <ScrollArea className="h-[500px]">
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardWithData />
        </Suspense>
      </ScrollArea>
    </div>
  );
}
