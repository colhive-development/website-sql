import { ModeToggle } from "@/components/global/mode-toggle";
import Image from "next/image";
import AuthImageSvg from "@/../public/authenticate-page.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="absolute left-0 h-[calc(100vh-3.5rem)] w-full grid-cols-2 lg:grid">
      <aside className="hidden flex-col justify-between bg-accent p-4 lg:flex">
        <div className="relative m-auto h-2/4 w-5/6">
          <Image src={AuthImageSvg} alt="" fill className="object-contain" />
        </div>
        <div className="text-transparent">.</div>
      </aside>
      <section className="flex flex-col justify-between bg-background p-4">
        <article>{children}</article>
        <div className="text-transparent">.</div>
      </section>
    </main>
  );
}
