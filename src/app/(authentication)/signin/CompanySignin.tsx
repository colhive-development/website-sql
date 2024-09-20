"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import SocialSignIn from "@/function/SocialSignIn";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const companySignIn = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function CompanySignin() {
  const [showPassword, toggleShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof companySignIn>>({
    resolver: zodResolver(companySignIn),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof companySignIn>) {
    setIsLoading(true);
    SocialSignIn(values.email, values.password, "company")
      .then((response) => {
        toast.success(response);
        router.push("/");
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 text-xl"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@colhive.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    placeholder="********"
                    type={!showPassword ? "password" : "text"}
                    {...field}
                  />
                  <Button
                    size="icon"
                    onClick={(event) => {
                      event.preventDefault();
                      toggleShowPassword((curr) => !curr);
                    }}
                  >
                    {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                  </Button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
