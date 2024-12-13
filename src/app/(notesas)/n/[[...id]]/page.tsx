import { FormCreateNote } from "~/app/_components/form/FormCreateNote";
import { api } from "~/trpc/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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
      <Wrapper>{id ? <h1>Note id</h1> : <FormCreateNote />}</Wrapper>
    </Suspense>
  );
}
