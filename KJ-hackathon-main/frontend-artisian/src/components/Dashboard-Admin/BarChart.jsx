import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A stacked bar chart with a legend"

const chartData = [
  { type: "Pottery", high: 500, low: 250 },
  { type: "Woven Baskets", high: 400, low: 150 },
  { type: "Leather Goods", high: 350, low: 200 },
  { type: "Sculptures", high: 300, low: 100 },
  { type: "Textile Products", high: 450, low: 220 },
  { type: "Jewelry", high: 550, low: 300 }
];

  

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} 

export function BarChartComponent() {
  return (
    <Card className="shadow-lg border dark:border-gray-800 dark:shadow-lg">
      <CardHeader>
        <CardTitle>Sales Categorized by type's</CardTitle>
        <CardDescription>September 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
            className="text-black"
              dataKey="type"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 100)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel className = "bg-white" />}  />
            <ChartLegend content={<ChartLegendContent className = "bg-white"   />} />
            <Bar
              dataKey="high"
              stackId="a"
              fill="rgb(154, 52, 18)"
              radius={[0, 0, 4, 4]}
              
            />
            <Bar
              dataKey="low"
              stackId="a"
              fill="rgb(181, 101, 29)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none text-green-600">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4 text-red-600" />
        </div>
        <div className="leading-none text-muted-foreground ">
          Showing total sales for last month
        </div>
      </CardFooter>
    </Card>
  )
}
