import Link from "next/link";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/posts", label: "Frontend" }
];

export function Sidebar() {
  return (
    <aside className="w-60 border-r border-[#2c3338] bg-[#1d2327] p-4 text-[#f0f0f1]">
      <h2 className="mb-6 text-lg font-semibold">Blog CMS</h2>
      <nav className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded px-3 py-2 text-sm hover:bg-[#2c3338]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
