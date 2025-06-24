import { CarouselSlider } from "../_components/CarouselSlider";

export default function StockHome() {
  return (
    <div className="grid grid-rows-[1fr_auto] h-full w-full pt-2 gap-1">
      <div className="p-2">hello</div>
      {/* shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] bg-white dark:bg-stone-950 */}
      <div className="relative flex flex-row justify-center items-center w-full h-fit p-2">
        <CarouselSlider />
      </div>
    </div>
  );
}
