export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-900">{children}</div>
  );
}
