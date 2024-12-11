"use client";

import { Spinner } from "./Spinner";
import { Button } from "./ui/button";

export function StripeSubscriptionCreationButton({
  pending,
}: {
  pending: boolean;
}) {
  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
          <Spinner /> Please Wait
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          Create Subscription
        </Button>
      )}
    </>
  );
}
