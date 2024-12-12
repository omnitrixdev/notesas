"use client";

import Link from "next/link";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export function PaymentConfirmed() {
  const { data, isLoading } = api.payment.getCurrentSubscription.useQuery();
  const { mutate } = api.payment.createUserSubscription.useMutation({
    onSuccess: (res) => {
      toast.success("Payment Confirmed", {
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
    onError: (err) => {
      console.log("err", err);
    },
  });
  console.log("data subs", data);

  useEffect(() => {
    if (!data?.Subscription && !isLoading) {
      mutate();
    }
  }, [data]);

  return (
    <div className="mt-5 w-full sm:mt-6">
      <Button className="w-full" asChild>
        <Link href="/">Go back to Dashboard</Link>
      </Button>
    </div>
  );
}
