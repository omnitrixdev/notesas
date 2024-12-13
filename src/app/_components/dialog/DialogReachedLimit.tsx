import Link from "next/link";

import { Button } from "~/components/ui/button";
import { PencilIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

export function DialogReachedLimit() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="flex items-center justify-center gap-2">
          <PencilIcon className="h-5 w-5" />
          <p>Create new Note</p>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>You're already reached the limit</AlertDialogTitle>
          <AlertDialogDescription>
            You're already reached the limit of 3 notes. Please upgrade your
            subscription to continue creating more notes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <Link href="/billing">Plan</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
