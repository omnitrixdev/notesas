"use client";

import { api } from "~/trpc/react";
import { Spinner } from "./Spinner";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function StripeSubscriptionCreationButton() {
  const router = useRouter();
  const { mutate, isPending } = api.payment.createStripePayment.useMutation({
    onSuccess: (res) => {
      router.push(res);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  return (
    <Button onClick={() => mutate()} disabled={isPending} className="w-full">
      {isPending ? (
        <>
          <Spinner /> Please Wait
        </>
      ) : (
        "Subscribe"
      )}
    </Button>
  );
}

export function StripePortal() {
  const { mutate, isPending } = api.payment.getCustomerPortal.useMutation({
    onSuccess: (res) => {
      if (res.url) {
        window.open(res.url, "_blank");
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <Button onClick={() => mutate()} className="w-fit" type="submit">
      {isPending ? (
        <>
          <Spinner /> Please Wait
        </>
      ) : (
        "View Payment Details"
      )}
    </Button>
  );
}
