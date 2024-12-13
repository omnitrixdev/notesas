import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function DetailNote() {
  return (
    <Card className="w-full lg:w-2/3">
      <CardHeader>
        <CardTitle>Note Detail</CardTitle>
        <CardDescription>
          Click on the button below, this will give you the opportunity to
          change your payment details and view your statement at the same time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h1>Don't forget to feed dog</h1>
      </CardContent>
    </Card>
  );
}
