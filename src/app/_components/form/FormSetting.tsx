"use client";

import Link from "next/link";

import { toast } from "react-toastify";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  email: z.string().email(),
  colorScheme: z.string().min(1),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

export function FormSetting() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      colorScheme: "",
    },
  });

  const { mutate, isPending } = api.notes.createNote.useMutation({
    onSuccess: () => {
      form.reset();
      toast.success("Note Created!", {
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

  function onSubmit(data: z.infer<typeof FormSchema>) {}

  return (
    <Card>
      <Form {...form}>
        <CardHeader>
          <CardTitle>General Data</CardTitle>
          <CardDescription>
            Please provide general information about yourself. Please dont
            forget to save
          </CardDescription>
        </CardHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="doe@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Please provide your email</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <FormField
                control={form.control}
                name="colorScheme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color Scheme</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your preferred color scheme" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="theme-green">Green</SelectItem>
                        <SelectItem value="theme-blue">Blue</SelectItem>
                        <SelectItem value="theme-violet">Violet</SelectItem>
                        <SelectItem value="theme-yellow">Yellow</SelectItem>
                        <SelectItem value="theme-orange">Orange</SelectItem>
                        <SelectItem value="theme-red">Red</SelectItem>
                        <SelectItem value="theme-rose">Rose</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can manage color schemes in your app{" "}
                    </FormDescription>
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
