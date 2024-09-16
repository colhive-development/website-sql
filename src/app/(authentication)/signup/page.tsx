"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { NewUser } from "@/database/schema/users"

export default function CompanySignUp() {
    const handleSubmit = async () => {
        const [firstName , setFirstname] = useState("")
        const [lastName , setLastname] = useState("")
        const [email , setEmail] = useState("")
        const [password , setPassword] = useState("")
        const [image , setImage] = useState<any>()

        if(!firstName || !lastName || !email || !password) toast.error("Please fill all the fields")
        // TODO : upload image to firebase before calling fn and return a url
        // @ts-ignore
        toast.promise(await signup<NewUser>({name : firstName + " " + lastName , email , password}) , { loading: "Creating new company..." , success: "Company created successfully" , error: "Failed to create new company"})
    }

  return  <Card className="mx-auto max-w-lg mt-20 p-4">
      <CardHeader className="pb-6">
        <CardTitle className="text-3xl font-semibold">Sign Up</CardTitle>
        <CardDescription className="text-lg">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="first-name" className="text-lg">
                First name
              </Label>
              <Input id="first-name" placeholder="Max" required  />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name" className="text-lg">
                Last name
              </Label>
              <Input id="last-name" placeholder="Robinson" required  />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-lg">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-lg">
              Password
            </Label>
            <Input id="password" type="password"  />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="image" className="text-lg">
              Avatar
            </Label>
            <Input id="image" type="file"  />
          </div>
          <Button type="submit" className="w-full py-3">
            Create an account
          </Button>
          <Button variant="outline" className="w-full py-3">
            Sign up with Google
          </Button>
        </div>
        <div className="mt-6 text-center text-lg">
          Already have an account?{" "}
          <Link href="/signin" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
}

