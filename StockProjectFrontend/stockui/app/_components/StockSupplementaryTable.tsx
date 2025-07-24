"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppStore } from "@/store/appStore";

export function StockSupplementaryTable() {
  const stockData = useAppStore((state) => state.stockData);
  const symbol = useAppStore((state) => state.symbol);

  if (!stockData.length) return null;

  const latest = stockData.reduce((prev, current) =>
    current.timestamp > prev.timestamp ? current : prev
  );

  const formattedTime = new Date(latest.timestamp * 1000).toLocaleString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  );

  return (
    <div className="max-w-[504px] overflow-x-auto rounded-bl-xl border border-black dark:border-stone-700 bg-white dark:bg-black shadow-[5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[5px_5px_0px_0px_rgba(41,37,36)] mt-2">
      <Table>
        <TableCaption className="mt-0 mb-2 text-[9px]">
          {symbol} - Latest Stock Supplementary Information
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-[10px] whitespace-nowrap">
              Time
            </TableHead>
            <TableHead className="text-[10px] whitespace-nowrap">
              Price
            </TableHead>
            <TableHead className="text-[10px] whitespace-nowrap">
              Open
            </TableHead>
            <TableHead className="text-[10px] whitespace-nowrap">
              Previous Close
            </TableHead>
            <TableHead className="text-[10px] whitespace-nowrap">
              Day Low
            </TableHead>
            <TableHead className="text-[10px] whitespace-nowrap">
              Day High
            </TableHead>
            <TableHead className="text-[10px] whitespace-nowrap">
              Year Low
            </TableHead>
            <TableHead className="text-[10px] whitespace-nowrap">
              Year High
            </TableHead>
            <TableHead className="text-[10px] whitespace-nowrap">
              Volume
            </TableHead>
            <TableHead className="text-[10px] whitespace-nowrap">
              50-Day Avg
            </TableHead>
            <TableHead className="text-[10px] whitespace-nowrap">
              200-Day Avg
            </TableHead>
            <TableHead className="text-[10px] whitespace-nowrap">
              Exchange
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="text-[10px]">
            <TableCell className="text-muted-foreground italic">
              @{formattedTime}
            </TableCell>
            <TableCell>${latest.price.toFixed(2)}</TableCell>
            <TableCell>${latest.open.toFixed(2)}</TableCell>
            <TableCell>${latest.previous_close.toFixed(2)}</TableCell>
            <TableCell>${latest.day_low.toFixed(2)}</TableCell>
            <TableCell>${latest.day_high.toFixed(2)}</TableCell>
            <TableCell>${latest.year_low.toFixed(2)}</TableCell>
            <TableCell>${latest.year_high.toFixed(2)}</TableCell>
            <TableCell>{latest.volume.toLocaleString()}</TableCell>
            <TableCell>${latest.price_avg_50.toFixed(2)}</TableCell>
            <TableCell>${latest.price_avg_200.toFixed(2)}</TableCell>
            <TableCell>{latest.exchange}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
