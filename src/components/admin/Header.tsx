export function Header({ title }: { title: string }) {
  return (
    <header className="mb-6 flex items-center justify-between border-b border-adminBorder bg-white px-6 py-4">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <span className="text-sm text-slate-600">Admin</span>
    </header>
  );
}
