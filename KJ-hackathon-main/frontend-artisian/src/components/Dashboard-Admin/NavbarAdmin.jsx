import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Joyride, { STATUS } from "react-joyride";
import {
  CircleUser,
  Package2,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LanguageSwitch from "../LanguageSwitch";

function NavbarAdmin() {
  const [runTour, setRunTour] = useState(false);

  const steps = [
    {
      target: ".first-step",
      content: "Welcome! 🎉 Use this navigation bar to explore different sections of our website easily.",
      disableBeacon: true,
    },
    {
      target: ".second-step",
      content: "Hi there! 👋 I am your virtual voice assistant, here to help you with any questions or guidance you need. 🤗",
      disableBeacon: true,
    },
  ];

  useEffect(() => {
    const hasSeenTour = sessionStorage.getItem("hasSeenTour");
    if (!hasSeenTour) {
      setRunTour(true);
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      sessionStorage.setItem("hasSeenTour", "true");
    }
  };


  return (
    <header className="top-0 flex h-16 items-center gap-4 border-b bg-background dark:bg-gray-800 px-4 md:px-6">
      <Joyride
        steps={steps}
        run={runTour}
        continuous={true}
        showSkipButton={true}
        showProgress={true}
        styles={{
          options: {
            primaryColor: "#4338ca",
            zIndex: 1000,
          },
          tooltipContainer: {
            textAlign: "left",
          },
        }}
        callback={handleJoyrideCallback}
      />
      
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 first-step">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          to="/admin"
          className="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>
        <Link
          to="/admin/orders"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Orders
        </Link>
        <Link
          to="/admin/inventory"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Inventory
        </Link>
        <Link
          to="/admin/add-product"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Add Product
        </Link>
      </nav>
      
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link to="/admin" className="hover:text-foreground">
              Dashboard
            </Link>
            <Link
              to="/admin/orders"
              className="text-muted-foreground hover:text-foreground"
            >
              Orders
            </Link>
            <Link
              to="/admin/inventory"
              className="text-muted-foreground hover:text-foreground"
            >
              Inventory
            </Link>
            <Link
              to="/admin/add-product"
              className="text-muted-foreground hover:text-foreground"
            >
              Add Product
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      
      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <LanguageSwitch />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default NavbarAdmin;