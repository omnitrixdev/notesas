import { FormCreateNote } from "~/app/_components/form/FormCreateNote";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { FormEditNote } from "~/app/_components/form/FormEditNote";

async function Wrapper({ children }: { children: React.ReactNode }) {
  const notes = await api.notes.getAllNotes();

  if (notes?.Note?.length! >= 3 && !notes?.Subscription) {
    redirect("/billing");
  }

  return <div>{children}</div>;
}

export default async function Note({
  params,
}: {
  params?: Promise<{ id: string }>;
}) {
  const id = (await params)?.id;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Wrapper>
        {id ? <FormEditNote noteId={id} /> : <FormCreateNote />}
      </Wrapper>
    </Suspense>
  );
}
