import Link from "next/link";

import { Button } from "~/components/ui/button";
import { Edit, PencilIcon } from "lucide-react";
import { Card } from "~/components/ui/card";
import { api } from "~/trpc/server";
import { Suspense } from "react";
import { AlertDialogDeleteNote } from "~/app/_components/dialog/DialogDeleteNote";
import { ScrollArea } from "~/components/ui/scroll-area";
import { EmptyNote } from "~/app/_components/EmptyNote";
import { DialogReachedLimit } from "~/app/_components/dialog/DialogReachedLimit";

async function DashboardWithData() {
  const notes = await api.notes.getAllNotes();

  if (notes?.Note.length === 0) {
    return (
      <EmptyNote
        isReachedLimit={notes?.Note?.length >= 3}
        isSubscribed={notes.Subscription?.status === "active"}
      />
    );
  }

  return (
    <div className="grid items-start gap-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Your Notes</h1>
          <p className="text-lg text-muted-foreground">
            Here you can see and create new notes
          </p>
        </div>

        {notes?.Note.length == 3 && !notes.Subscription ? (
          <DialogReachedLimit />
        ) : (
          <Button className="flex items-center justify-center gap-2">
            <PencilIcon className="h-5 w-5" />
            <Link href="/n">Create new Note</Link>
          </Button>
        )}
      </div>

      <ScrollArea className="h-[500px]">
        <div className="flex flex-col gap-y-4 px-4">
          {notes?.Note.map((item) => (
            <Card
              key={item.id}
              className="flex items-center justify-between p-4"
            >
              <div>
                <h2 className="text-xl font-semibold text-primary">
                  {item.title}
                </h2>
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
      </ScrollArea>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardWithData />
    </Suspense>
  );
}
