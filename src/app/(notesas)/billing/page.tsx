import { CheckCircle2 } from "lucide-react";
import { api } from "~/trpc/server";
import { Suspense } from "react";

import {
  StripePortal,
  StripeSubscriptionCreationButton,
} from "~/components/ButtonUtils";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

const featureItems = [
  {
    name: "Unlimited notes",
  },

  {
    name: "Support developer",
  },
  {
    name: "Be a kind user",
  },
  {
    name: "This payment just a dummy payment",
  },
  {
    name: "use 4111 1111 1111 1111 for visa",
  },
];

function Subscribed() {
  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Subscription</h1>
          <p className="text-lg text-muted-foreground">
            Settings reagding your subscription
          </p>
        </div>
      </div>

      <Card className="w-full lg:w-2/3">
        <CardHeader>
          <CardTitle>Edit Subscription</CardTitle>
          <CardDescription>
            Click on the button below, this will give you the opportunity to
            change your payment details and view your statement at the same
            time.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StripePortal />
        </CardContent>
      </Card>
    </div>
  );
}

function Billing() {
  return (
    <div className="mx-auto max-w-md space-y-4">
      <Card className="flex flex-col">
        <CardContent className="py-8">
          <div>
            <h3 className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold uppercase tracking-wide text-primary">
              Monthly
            </h3>
          </div>

          <div className="mt-4 flex items-baseline text-6xl font-extrabold">
            $30 <span className="ml-1 text-2xl text-muted-foreground">/mo</span>
          </div>
          <p className="mt-5 text-lg text-muted-foreground">
            Write as many notes as you want for $30 a Month
          </p>
        </CardContent>
        <div className="m-1 flex flex-1 flex-col justify-between space-y-6 rounded-lg bg-secondary px-6 pb-8 pt-6 sm:p-10 sm:pt-6">
          <ul className="space-y-4">
            {featureItems.map((item, index) => (
              <li key={index} className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <p className="ml-3 text-base">{item.name}</p>
              </li>
            ))}
          </ul>

          <StripeSubscriptionCreationButton />
        </div>
      </Card>
    </div>
  );
}

async function BillingWithData() {
  const statusSubscription = await api.payment.getCurrentSubscription();
  if (statusSubscription?.Subscription?.status === "active") {
    return <Subscribed />;
  } else {
    return <Billing />;
  }
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BillingWithData />
    </Suspense>
  );
}
