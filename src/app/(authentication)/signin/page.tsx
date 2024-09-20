import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IndividualSignin from "./IndividualSignin";
import CompanySignin from "./CompanySignin";
import Link from "next/link";

export default function Page() {
  return (
    <Card className="m-auto w-[30rem] border-none shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          Enter Credentials to continue
        </CardTitle>
        <CardDescription className="text-lg">
          Welcome back, Let's get working
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="individual">
          <TabsList className="grid w-full grid-cols-2 text-xl">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
          </TabsList>
          <TabsContent value="individual">
            <IndividualSignin />
          </TabsContent>
          <TabsContent value="company">
            <CompanySignin />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="justify-center gap-3">
        <p>don&apos;t have a account?</p>
        <Link href="/signup">Sign Up</Link>
      </CardFooter>
    </Card>
  );
}
