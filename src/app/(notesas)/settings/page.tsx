import { Suspense } from "react";
import { FormSetting } from "~/app/_components/form/FormSetting";
import { api } from "~/trpc/server";

async function SettingsWithData() {
  const user = await api.user.getCurrentUser();

  return <FormSetting initialUser={user} />;
}

export default function Settings() {
  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Settings</h1>
          <p className="text-lg text-muted-foreground">Your Profile settings</p>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <SettingsWithData />
      </Suspense>
    </div>
  );
}
