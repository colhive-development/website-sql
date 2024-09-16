import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPassword() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] container py-20">
      <div className="flex items-center justify-center py-16">
        <div className="mx-auto grid w-[400px] gap-8">
          <div className="grid gap-4 text-center">
            <h1 className="text-4xl font-bold">Login</h1>
            <p className="text-lg text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-4">
              <Label className="text-lg" htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="px-4 py-3"
              />
            </div>
            <div className="grid gap-4">
              <div className="flex items-center">
                <Label className="text-lg" htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-base underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="px-4 py-3"
              />
            </div>
            <Button type="submit" className="w-full py-4">
              Login
            </Button>
            <Button variant="outline" className="w-full py-4">
              Login with Google
            </Button>
          </div>
          <div className="mt-8 text-center text-base">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
