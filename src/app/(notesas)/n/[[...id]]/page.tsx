import { FormCreateNote } from "~/app/_components/form/FormCreateNote";

export default async function Note({
  params,
}: {
  params?: Promise<{ id: string }>;
}) {
  const id = (await params)?.id;

  return <>{id ? <h1>Note id</h1> : <FormCreateNote />}</>;
}
