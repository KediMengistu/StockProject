"use client";

import { useMemo } from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  TooltipProps,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";

import { useAppStore } from "@/store/appStore";

// Chart config for color theming
const chartConfig = {
  price: {
    label: "Price (USD)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

// Custom Tooltip with trailing zero formatting
const CustomPriceTooltip = ({ label, payload }: TooltipProps<any, any>) => {
  if (!payload || !payload.length) return null;
  const data = payload[0].payload;

  return (
    <div className="rounded-md border bg-white text-black dark:bg-black dark:text-white p-2 text-xs shadow-md">
      <div className="mb-1 italic text-muted-foreground dark:text-gray-400">
        @{label}
      </div>
      <div className="flex items-center justify-between gap-1">
        <span className="text-muted-foreground dark:text-gray-400">
          Price (USD)
        </span>
        <span className="font-medium">{data.priceDisplay}</span>
      </div>
    </div>
  );
};

export function ChartAreaPrice() {
  const symbol = useAppStore((state) => state.symbol);
  const stockData = useAppStore((state) => state.stockData);

  // Format and sort stock data
  const chartData = useMemo(() => {
    return stockData
      .slice()
      .sort((a, b) => a.timestamp - b.timestamp)
      .map((entry) => {
        const date = new Date(entry.timestamp * 1000);
        const timeLabel = date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        return {
          time: timeLabel,
          price: parseFloat(entry.price.toFixed(2)), // number for math
          priceDisplay: entry.price.toFixed(2), // string for display (e.g. 123.00)
        };
      });
  }, [stockData]);

  // Calculate padded min/max for y-axis
  const [minPrice, maxPrice] = useMemo(() => {
    if (!chartData.length) return [0, 0];
    const prices = chartData.map((d) => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const padding = Math.max((max - min) * 0.1, 0.01);
    return [Math.floor(min - padding), Math.ceil(max + padding)];
  }, [chartData]);

  return (
    <Card className="h-fit w-[250px] py-0 gap-1 bg-transparent shadow-none border-none">
      <CardHeader className="py-2 border-1 border-black dark:border-1 dark:border-stone-700 rounded-tl-2xl bg-white dark:bg-black shadow-[5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[5px_5px_0px_0px_rgba(41,37,36)]">
        <CardTitle className="underline">
          {symbol} - Stock Price Chart
        </CardTitle>
        <CardDescription>
          72 hour stock cycle for {symbol} (NASDAQ).
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 border-1 border-black dark:border-1 dark:border-stone-700 shadow-[5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[5px_5px_0px_0px_rgba(41,37,36)]">
        <ChartContainer config={chartConfig} className="min-h-[150px] w-full">
          <AreaChart
            data={chartData}
            margin={{
              top: 20, // Prevent tooltip clipping
              left: 12,
              right: 12,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey="time"
              tick={false}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              domain={[minPrice, maxPrice]}
              tick={false}
              tickLine={false}
              axisLine={false}
              width={0}
            />
            <ChartTooltip content={<CustomPriceTooltip />} />
            <Area
              dataKey="price"
              type="monotone"
              fill="var(--color-price)"
              fillOpacity={0.4}
              stroke="var(--color-price)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
