export default function AboutPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[391px] h-full w-full p-2 overflow-y-hidden">
      {children}
    </div>
  );
}
