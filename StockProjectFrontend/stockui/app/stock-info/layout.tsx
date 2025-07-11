export default function StockHomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full w-full p-2 overflow-y-hidden">{children}</div>;
}
