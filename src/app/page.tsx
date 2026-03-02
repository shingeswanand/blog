import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-semibold">Blog CMS Starter</h1>
      <p className="max-w-2xl text-slate-700">
        A Next.js and MongoDB powered CMS with a WordPress-style admin experience.
      </p>
      <Link href="/admin" className="button-primary">
        Open Admin Dashboard
      </Link>
    </main>
  );
}
