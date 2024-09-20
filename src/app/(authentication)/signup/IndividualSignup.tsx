"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { insertIndividualSchema } from "@/database/schema/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export default function IndividualSignup() {
  const [showPassword, toggleShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const companyForm = useForm<z.infer<typeof insertIndividualSchema>>({
    resolver: zodResolver(insertIndividualSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      companyId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof insertIndividualSchema>) {
    setIsLoading(true);

    const { name, email, password, role, companyId } = values;

    await axios
      .post("/api/register/individual", {
        name,
        email,
        password,
        role,
        companyId,
      })
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((error: AxiosError<{ message: string }>) => {
        toast.error(error.response?.data.message);
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Form {...companyForm}>
      <form
        onSubmit={companyForm.handleSubmit(onSubmit)}
        className="space-y-3 text-xl"
      >
        <FormField
          control={companyForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="ACME Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <FormField
            control={companyForm.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your role</FormLabel>
                <FormControl>
                  <Input placeholder="Developer Manager .." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={companyForm.control}
            name="companyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Company ID</FormLabel>
                <FormControl>
                  <Input placeholder="abcd-rfth.." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={companyForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Company Email</FormLabel>
              <FormControl>
                <Input placeholder="acme@acme.inc" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={companyForm.control}
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
