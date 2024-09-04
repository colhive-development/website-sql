import { ModeToggle } from "@/components/global/mode-toggle";
import Image from "next/image";
import AuthImageSvg from "#/authenticate-page.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen w-full grid-cols-2 lg:grid">
      <aside className="hidden min-h-screen flex-col justify-between bg-accent p-4 lg:flex">
        <header className="text-4xl font-bold">COLHIVE</header>
        <div className="w-5/6 relative h-2/4 m-auto">
          <Image src={AuthImageSvg} alt="" fill className="object-contain" />
        </div>
        <div className="text-transparent">
            .
        </div>
      </aside>
      <section className="flex min-h-screen flex-col justify-between bg-background p-4">
        <nav className="flex items-center justify-between lg:justify-end">
          <p className="text-xl font-bold md:text-2xl lg:hidden">COLHIVE</p>
          <div className="flex items-center gap-2">
            <Button variant="link">
                <Link href="/" className="text-xl">
                Home
                </Link>
            </Button>
          <ModeToggle />
          </div>
        </nav>
        <article>{children}</article>
        <div className="text-transparent">.</div>
      </section>
    </main>
  );
}
