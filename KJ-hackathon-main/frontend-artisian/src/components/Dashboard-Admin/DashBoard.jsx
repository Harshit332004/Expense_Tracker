import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CircleUser,
  NotebookPen,
  Menu,
  Package2,
  Search,
  CircleCheck,
  CircleDashed,
  ShieldAlert,
  BadgeDollarSign,
  TrendingUp,
  PackageCheck,
} from "lucide-react";

import { BarChartComponent } from "./BarChart";
import NavbarAdmin from "./NavbarAdmin";
import ChatbotArtisan from "../ChatbotArtisan";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Dashboard() {
  const [recentSales, setRecentSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await fetch("http://localhost:8000/get-orders");
        if (!res.ok) {
          throw new Error("Error while fetching sales");
        }
        const result = await res.json();
        console.log(result);

        setRecentSales(result || []);
      } catch (error) {
        console.error("Failed to fetch sales:", error);
      }
    };
    fetchSales();
  }, []);

  const StatCard = ({ title, value, change, Icon }) => (
    <Card className="shadow-md dark:border-gray-800 bg-blend-darken">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="rounded-full p-1 text-white w-8 h-8 bg-orange-800" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={`text-xs ${change >= 0 ? "text-green-500" : "text-red-500"
            }`}
        >
          {change >= 0 ? "+" : ""}
          {change}% from last month
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="main_container">
      <div className="flex min-h-screen w-full flex-col main_screen">
        <div className="navbar_container">
          <NavbarAdmin />
        </div>
        <div className="main_screen">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-beige-100">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <StatCard
                title="Monthly Sales"
                value="4523"
                change={20.1}
                Icon={BadgeDollarSign}
              />
              <StatCard
                title="Monthly Profit"
                value="1050"
                change={10}
                Icon={TrendingUp}
              />
              <StatCard
                title="Active SKU'S"
                value="5"
                change={15}
                Icon={PackageCheck}
              />
              <StatCard
                title="Pending Orders"
                value="8"
                change={5.1}
                Icon={CircleDashed}
              />
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
              <BarChartComponent />
              <Card className="dark:border-gray-800 dark:shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-8">
                  {recentSales.length > 0 ? (
                    recentSales.map((sale) => (
                      <div
                        key={sale.id}
                        className="flex items-center gap-4 hover:shadow-lg hover:scale-95 hover:cursor-pointer transition-all duration-200"
                      >
                        <Avatar className="hidden h-9 w-9 sm:flex">
                          <AvatarImage src="" alt="Product Image" />
                          <AvatarFallback>
                            {sale.name?.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                          <p className="text-sm font-medium text-start">
                            {sale.name?.toUpperCase()}
                          </p>
                          <p className="text-sm text-muted-foreground text-start">
                            {sale.email}
                          </p>
                          <p className="text-xs text-muted-foreground text-start">
                            Quantity: {sale.qauntity}
                          </p>{" "}
                          {/* Access the quantity if needed */}
                        </div>
                        <div className="ml-auto font-semibold text-sm text-white rounded-full px-2 py-1 bg-orange-800">
                        ₹{sale.amount}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground">
                      No recent sales available
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
            <ChatbotArtisan />
          </main>
        </div>
      </div>
    </div>
  );
}
