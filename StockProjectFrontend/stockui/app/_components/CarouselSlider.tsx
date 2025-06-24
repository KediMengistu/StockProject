import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Symbol to Company Name mapping
const STOCKS = {
  AAPL: "Apple",
  MSFT: "Microsoft",
  GOOGL: "Google",
  AMZN: "Amazon",
  NVDA: "NVIDIA",
  META: "Meta Platforms",
  TSLA: "Tesla",
  ADBE: "Adobe",
  INTC: "Intel",
  NFLX: "Netflix",
};

export function CarouselSlider() {
  return (
    <Carousel className="w-52">
      <CarouselContent className="-ml-0.5">
        {Object.entries(STOCKS).map(([symbol, name]) => (
          <CarouselItem key={symbol} className="pl-0.5">
            <div className="p-0.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="flex flex-row items-center justify-center h-28 cursor-pointer">
                    <CardContent className="flex flex-row items-center justify-center">
                      <span className="text-2xl font-semibold">{symbol}</span>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name} Stock</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer" />
    </Carousel>
  );
}
