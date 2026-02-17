import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/theme")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-10 p-10 transition-colors duration-500">
      <div className="flex items-center gap-3">
        <Label htmlFor="darkmode">Dark Mode</Label>
        <Switch id="darkmode" />
      </div>

      <Card className="w-[420px] shadow-2xl border border-border bg-card text-card-foreground">
        <CardHeader>
          <CardTitle>Berlin Theme — Industrial Minimalism</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Input
            placeholder="Search Berlin landmarks..."
            className="border-input"
          />
          <div className="flex gap-2 flex-wrap">
            <Button variant="default">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button
              variant="destructive"
              className="text-destructive-foreground"
            >
              Destructive
            </Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            {/* <Button variant="hover">Hover</Button>
            <Button variant="berlin">Berlin</Button> */}
          </div>
          <div className="flex items-center justify-center h-20 w-full bg-linear-to-tl from-goldLight to-goldDark text-primary rounded-md font-semibold">
            light
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-goldLight  text-background p-3 rounded-md text-center font-medium">
              goldLight
            </div>
            <div className="bg-goldDark  text-background p-3 rounded-md text-center font-medium">
              goldDark
            </div>
            <div className="bg-goldenrod secondary text-background p-3 rounded-md text-center font-medium">
              Bright Yellow
            </div>
            <div className="bg-goldSatin text-background p-3 rounded-md text-center font-medium">
              goldSatin
            </div>
            <div className="bg-goldVegas text-background p-3 rounded-md text-center font-medium">
              goldVegas
            </div>
            <div className="bg-goldenrod text-background p-3 rounded-md text-center font-medium">
              goldenrod
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-sm text-muted-foreground border-t border-border pt-4">
            <p>
              Inspired by Berlin’s industrial past, Bauhaus design, and vibrant
              nightlife.
            </p>
            <p className="italic">Modern. Minimal. Bold.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
