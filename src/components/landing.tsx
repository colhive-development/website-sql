import React from 'react';
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CloverIcon, SearchIcon } from 'lucide-react';


const Footer: React.FC = () => (
  <footer className="border-t bg-background">
    <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
      <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
        <CloverIcon className="h-6 w-6" />
        <p className="text-center text-sm leading-loose md:text-left">
          Built by Colhive. The source code is available on{" "}
          <Link href="#" className="font-medium underline underline-offset-4">
            GitHub
          </Link>
          .
        </p>
      </div>
    </div>
  </footer>
);

const HeroSection: React.FC = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
    <div className="container px-4 md:px-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
        <img
          src="/api/placeholder/550/310"
          width={550}
          height={310}
          alt="Hero"
          className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last border border-black"
        />
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Manage your projects with Colhive
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Colhive is the complete platform for managing your projects, teams, and collaboration. Securely
              build, deploy, and scale the best web experiences.
            </p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <section className="flex gap-4">
              {/* <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" /> */}
              <Button className='hover:text-black hover:bg-white border'>Explore</Button>
              <Button className='text-foreground hover:bg-black border hover:text-white bg-background'>Sign Up</Button>
            </section>
            {/* <p className="text-xs text-muted-foreground">
              Sign up to get started with Colhive.{" "}
              <Link href="#" className="underline underline-offset-2">
                Terms &amp; Conditions
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FeatureSection: React.FC = () => (
  <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container space-y-12 px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">New Features</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Faster iteration. More innovation.
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Colhive is the platform for rapid progress. Let your team focus on shipping features instead of
            managing infrastructure with automated CI/
            {/* <Header /> */}CD, built-in testing, and integrated collaboration.
          </p>
        </div>
      </div>
      <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
        {[
          { title: "Infinite scalability, zero config", description: "Enable code to run on-demand without needing to manage your own infrastructure or upgrade hardware." },
          { title: "Real-time insights and controls", description: "Get granular, first-party, real-user metrics on site performance per deployment." },
          { title: "Personalization at the edge", description: "Deliver dynamic, personalized content, while ensuring users only see the best version of your site." },
          { title: "Collaboration", description: "Make collaboration seamless with built-in code review tools." },
          { title: "Automation", description: "Automate your workflow with continuous integration." },
          { title: "Security", description: "Ensure your projects are secure with built-in security features and best practices." },
        ].map((feature, index) => (
          <div key={index} className="grid gap-1">
            <h3 className="text-lg font-bold">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center flex-col sm:flex-row items-start gap-4">
        <Link href="#" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          Contact Sales
        </Link>
        <Link href="#" className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          Tour the Platform
        </Link>
      </div>
    </div>
  </section>
);

const CTASection: React.FC = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
    <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
      <div className="space-y-3">
        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
          Experience the workflow the best teams love.
        </h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Let your team focus on shipping features instead of managing infrastructure with automated CI/CD.
        </p>
      </div>
      <div className="mx-auto w-full max-w-sm space-y-2">
        <form className="flex gap-2">
          <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
          <Button type="submit">Sign Up</Button>
        </form>
        <p className="text-xs text-muted-foreground">
          Sign up to get notified when we launch.{" "}
          <Link href="#" className="underline underline-offset-2">
            Terms &amp; Conditions
          </Link>
        </p>
      </div>
    </div>
  </section>
);

export default function LandingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* <Header /> */}
      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
