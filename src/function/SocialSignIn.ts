"use server";

import { signIn } from "@/lib/auth";
import { redirect } from "next/dist/server/api-utils";

export default async function SocialSignIn(
  email: string,
  password: string,
  username: string,
) {
  try {
    await signIn("credentials", {
      email,
      password,
      username,
      redirect: false,
    });

    return "Log In Successful";
  } catch (error: any) {
    return JSON.stringify(error);
    // if (error instanceof Error) {
    //   const { type, cause } = error as any;
    //   switch (type) {
    //     case "CallbackRouteError":
    //       return cause?.err?.message.toString();
    //     default:
    //       return "Something went wrong";
    //   }
    // }
    // return "Something went wrong";
  }
}
