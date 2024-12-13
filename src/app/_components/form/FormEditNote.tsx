"use client";

import Link from "next/link";

import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";
import { Spinner } from "~/components/Spinner";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

export function FormEditNote({ noteId }: { noteId: string }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const { data } = api.notes.getNoteById.useQuery(
    {
      id: noteId[0] as string,
    },
    {
      enabled: !!noteId[0],
    },
  );

  const { mutate, isPending } = api.notes.editNote.useMutation({
    onSuccess: () => {
      router.refresh();
      toast.success("Note Edited!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    },
    onError: () => {
      console.log("error");
      toast.error("Note failed to create!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate({
      id: noteId[0] as string,
      ...data,
    });
  }

  useEffect(() => {
    if (noteId) {
      form.setValue("title", data?.title as string);
      form.setValue("description", data?.description as string);
    }
  }, [data]);

  return (
    <Card>
      <Form {...form}>
        <CardHeader>
          <CardTitle>Edit Note</CardTitle>
          <CardDescription>
            Right here you can now create your new notes
          </CardDescription>
        </CardHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Feeding a dog"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Your note title</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isPending}
                        placeholder="Provide a short description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Your note description</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button asChild variant="destructive">
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <Button className="flex w-[100px] items-center justify-center">
              {isPending ? <Spinner /> : "Create Note"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
