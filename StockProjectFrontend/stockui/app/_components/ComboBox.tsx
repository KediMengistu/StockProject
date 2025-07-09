"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppStore } from "../../store/appStore"; // ✅ Updated

const stocks = [
  { value: "AMZN", label: "Amazon" },
  { value: "AAPL", label: "Apple" },
  { value: "ADBE", label: "Adobe" },
  { value: "GOOGL", label: "Google" },
  { value: "INTC", label: "Intel" },
  { value: "META", label: "Meta" },
  { value: "MSFT", label: "Microsoft" },
  { value: "NFLX", label: "Netflix" },
  { value: "NVDA", label: "Nvidia" },
  { value: "TSLA", label: "Tesla" },
];

export function ComboBox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const setSymbol = useAppStore((state) => state.setSymbol);
  const fetchStockData = useAppStore((state) => state.fetchStockData);
  const resetStockState = useAppStore((state) => state.resetStockState);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[125px] justify-between text-xs cursor-pointer"
        >
          {value
            ? stocks.find((stock) => stock.value === value)?.label
            : "Select stock..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 cursor-pointer">
        <Command>
          <CommandInput placeholder="Search stock..." className="h-9 text-xs" />
          <CommandList>
            <CommandEmpty className="p-3 text-center text-xs">
              No stock found.
            </CommandEmpty>
            <CommandGroup>
              {stocks.map((stock) => (
                <CommandItem
                  key={stock.value}
                  value={stock.value}
                  onSelect={(currentValue) => {
                    const isSame = currentValue === value;
                    if (isSame) {
                      // Deselect the stock
                      setValue("");
                      resetStockState();
                    } else {
                      // New selection
                      setValue(currentValue);
                      setSymbol(currentValue);
                      const latestSymbol = useAppStore.getState().symbol;
                      fetchStockData(latestSymbol);
                    }
                    setOpen(false);
                  }}
                  className="text-xs cursor-pointer"
                >
                  {stock.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === stock.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
