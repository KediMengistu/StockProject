"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
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

// Chart config
const chartConfig = {
  volume: {
    label: "Volume",
    color: "var(--chart-2)", // You can choose another chart color token
  },
} satisfies ChartConfig;

// Tooltip
const CustomVolumeTooltip = ({ label, payload }: TooltipProps<any, any>) => {
  if (!payload || !payload.length) return null;
  const data = payload[0].payload;

  return (
    <div className="rounded-md border bg-white text-black dark:bg-black dark:text-white p-2 text-xs shadow-md">
      <div className="mb-1 italic text-muted-foreground dark:text-gray-400">
        @{label}
      </div>
      <div className="flex items-center justify-between gap-1">
        <span className="text-muted-foreground dark:text-gray-400">Volume</span>
        <span className="font-medium">{data.volume.toLocaleString()}</span>
      </div>
    </div>
  );
};

export function ChartBarVolume() {
  const symbol = useAppStore((state) => state.symbol);
  const stockData = useAppStore((state) => state.stockData);

  // Format chart data
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
          volume: entry.volume, // assuming this is integer
        };
      });
  }, [stockData]);

  // Domain padding
  const [minVolume, maxVolume] = useMemo(() => {
    if (!chartData.length) return [0, 0];
    const volumes = chartData.map((d) => d.volume);
    const min = Math.min(...volumes);
    const max = Math.max(...volumes);
    const padding = Math.max((max - min) * 0.1, 100);
    return [Math.floor(min - padding), Math.ceil(max + padding)];
  }, [chartData]);

  return (
    <Card className="h-fit w-[250px] py-0 gap-1 bg-transparent shadow-none border-none">
      <CardHeader className="py-2 border-1 border-black dark:border-stone-700 shadow-[5px_5px_0px_0px_rgba(0,0,0)] bg-white dark:bg-black dark:shadow-[5px_5px_0px_0px_rgba(41,37,36)]">
        <CardTitle className="underline">{symbol} - Volume Chart</CardTitle>
        <CardDescription>
          72 hour trading volume for {symbol} (NASDAQ).
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 border-1 border-black dark:border-stone-700 shadow-[5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[5px_5px_0px_0px_rgba(41,37,36)]">
        <ChartContainer config={chartConfig} className="min-h-[150px] w-full">
          <BarChart
            data={chartData}
            margin={{ top: 20, left: 12, right: 12, bottom: 0 }}
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
              domain={[minVolume, maxVolume]}
              tick={false}
              tickLine={false}
              axisLine={false}
              width={0}
            />
            <ChartTooltip content={<CustomVolumeTooltip />} />
            <Bar
              dataKey="volume"
              fill="var(--color-volume)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
