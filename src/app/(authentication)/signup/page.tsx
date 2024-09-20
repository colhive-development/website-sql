import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IndividualSignup from "./IndividualSignup";
import CompanySignup from "./CompanySignup";
import Link from "next/link";

export default function Page() {
  return (
    <Card className="m-auto w-full max-w-[34rem] border-none shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create a new Profile</CardTitle>
        <CardDescription className="text-lg">
          Join now to take your efficiency to the next level
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="individual">
          <TabsList className="grid w-full grid-cols-2 text-xl">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
          </TabsList>
          <TabsContent value="individual">
            <IndividualSignup />
          </TabsContent>
          <TabsContent value="company">
            <CompanySignup />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="justify-center gap-3">
        <p>already have a account?</p>
        <Link href="/signin">Sign In</Link>
      </CardFooter>
    </Card>
  );
}
