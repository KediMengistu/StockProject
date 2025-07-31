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

export function StockInfoTable() {
  const stockData = useAppStore((state) => state.stockData);
  const symbol = useAppStore((state) => state.symbol);

  if (!stockData.length) return null;

  return (
    <div className="max-w-[250px] md:max-w-[298.35px] h-[343.9px] overflow-x-auto rounded-bl-2xl md:rounded-bl-none rounded-tr-none md:rounded-tr-2xl rounded-br-2xl border border-black dark:border-stone-700 bg-white dark:bg-black shadow-[5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[5px_5px_0px_0px_rgba(41,37,36)] scrollbar-hide">
      <Table>
        <TableCaption className="mt-0 mb-2 ml-3 text-[9px] text-left">
          {symbol} - Change & Market Cap Tracker
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap text-[10px]">
              Time
            </TableHead>
            <TableHead className="whitespace-nowrap text-[10px]">
              Change
            </TableHead>
            <TableHead className="whitespace-nowrap text-[10px]">
              Change%
            </TableHead>
            <TableHead className="whitespace-nowrap text-[10px]">
              Market Cap
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stockData
            .slice()
            .sort((a, b) => a.timestamp - b.timestamp)
            .map((entry) => {
              const formattedTime = new Date(
                entry.timestamp * 1000
              ).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              });

              return (
                <TableRow key={entry.id} className="text-[10px]">
                  <TableCell className="text-muted-foreground italic">
                    @{formattedTime}
                  </TableCell>
                  <TableCell
                    className={
                      entry.change >= 0 ? "text-green-600" : "text-red-600"
                    }
                  >
                    {entry.change.toFixed(2)}
                  </TableCell>
                  <TableCell
                    className={
                      entry.changes_percentage >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {entry.changes_percentage.toFixed(2)}%
                  </TableCell>
                  <TableCell>{entry.market_cap.toLocaleString()}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
