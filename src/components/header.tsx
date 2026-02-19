import { Link } from "@tanstack/react-router";
import { ModeToggle } from "@/components/mode-toggle";
import { headerItems } from "@/data/headerItems";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Shield, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

export function Header() {
  const { isAuthenticated } = useAuth();
  return (
    <header className="sticky top-0 z-50 w-full border-b">
      <div className="mx-auto max-w-6xl bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 ">
        <div className="flex h-14 flex-row gap-8 items-center mx-4">
          <div className="grow-0">
            <Link to="/" className="flex font-bold">
              <span className="text-lg">
                Project<span className="text-gold">R65</span>
              </span>
            </Link>
          </div>
          <div className="grow">
            <NavigationMenu className="block md:hidden">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="bg-transparent"
                    onPointerMove={(event) => event.preventDefault()}
                    onPointerLeave={(event) => event.preventDefault()}
                  >
                    Menu
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-96">
                      {headerItems.map((item) => (
                        <ListItem
                          key={item.title}
                          href={item.href}
                          title={item.title}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <nav className="hidden md:flex items-start space-x-3 lg:space-x-6 text-sm font-medium">
              {headerItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="transition-colors hover:text-foreground/80 text-foreground/60 [&.active]:text-foreground"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="grow-0">
            <div className="flex justify-center items-center gap-2">
              <ModeToggle />

              <Button variant="ghost" size="icon">
                <Link to="/admin">
                  {isAuthenticated && (
                    <ShieldCheck className="size-5 text-green-600" />
                  )}
                  {!isAuthenticated && <Shield className="size-5" />}

                  <span className="sr-only">To Admin Panel</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="text-muted-foreground line-clamp-2">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
