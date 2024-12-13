import Link from "next/link";
import { File } from "lucide-react";
import { Button } from "~/components/ui/button";

interface EmptyNoteProps {
  isSubscribed: boolean;
  isReachedLimit: boolean;
}

export async function EmptyNote({
  isSubscribed,
  isReachedLimit,
}: EmptyNoteProps) {
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
        <Link href={isSubscribed || !isReachedLimit ? "/n" : "/billing?r=n"}>
          Create New Note
        </Link>
      </Button>
    </div>
  );
}
