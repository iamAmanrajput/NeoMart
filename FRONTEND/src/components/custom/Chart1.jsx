"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Colors } from "@/constants/colors";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { TrendingUp } from "lucide-react";

const chartData = [
  { month: "January", mouse: 186, keyboard: 80, headset: 50 },
  { month: "February", mouse: 305, keyboard: 200, headset: 50 },
  { month: "March", mouse: 237, keyboard: 120, headset: 50 },
  { month: "April", mouse: 73, keyboard: 190, headset: 50 },
  { month: "May", mouse: 209, keyboard: 130, headset: 50 },
  { month: "June", mouse: 214, keyboard: 140, headset: 50 },
];

const chartConfig = {
  mouse: {
    label: "Mouse",
    color: Colors.customGray,
  },
  keyboard: {
    label: "Keyboard",
    color: Colors.customYellow,
  },
  headset: {
    label: "Headset",
    color: Colors.customIsabelline,
  },
};

export function Chart1() {
  return (
    <Card className="flex-1 rounded-xl bg-muted/50 md:min-h-min">
      <CardHeader>
        <CardTitle>Bar Chart - NeoCart</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <ChartContainer config={chartConfig} className="w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)} // "January" -> "Jan"
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="mouse" fill={chartConfig.mouse.color} radius={4} />
              <Bar
                dataKey="keyboard"
                fill={chartConfig.keyboard.color}
                radius={4}
              />
              <Bar
                dataKey="headset"
                fill={chartConfig.headset.color}
                radius={4}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col text-sm gap-2 items-center md:items-start text-center md:text-left">
        <div className="flex gap-2 font-medium leading-none">
          Trending Up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total Visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
