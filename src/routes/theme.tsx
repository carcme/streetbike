import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Footer from "@/components/footer";
import { Header } from "@/components/header";
import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/theme")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen gap-10 p-10 transition-colors duration-500 bg-background text-foreground">
        <div className="flex items-center gap-3">
          <Label htmlFor="darkmode">Dark Mode</Label>
          <ModeToggle />
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
            <div className="flex flex-wrap gap-2">
              <Button variant="default">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="positive">Positive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex items-center justify-center w-full h-20 font-semibold rounded-md bg-linear-to-tl from-brand-primary to-brand-secondary text-primary">
              brand primary to secondary
            </div>

            <Badge variant={"outline"}>Buttons</Badge>

            <Button>Primary Button</Button>
            <Button variant={"secondary"}>Secondary</Button>
            <Button variant={"destructive"}>Destructive Button</Button>
            <Button variant={"positive"}>Positive Button</Button>
            <Button variant={"ghost"}>Ghost Button</Button>
            <Button variant={"link"}>Link Button</Button>
            <Button variant={"outline"}>Outline Button</Button>
            <Button variant={"shed"}>Shed Button</Button>

            <div className="flex flex-col items-center justify-center pt-4 text-sm border-t text-muted-foreground border-border">
              <p>
                Inspired by Berlin’s industrial past, Bauhaus design, and
                vibrant nightlife.
              </p>
              <p className="italic">Modern. Minimal. Bold.</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
