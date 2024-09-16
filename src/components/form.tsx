import { ReactNode, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

export const Form = ({
  inputs,
  onSubmit,
  children,
  submitText
}: {
  inputs: {
    label: string;
    name: string;
    type?: "text" | "password" | "email" | "file" | "date";
  }[];
  submitText? : string
  children? : ReactNode
  onSubmit: (state: { [K in string]: string }) => void;
}) => {
  const [state, setState] = useState<{ [K in string]: string }>(
    inputs.reduce((acc, curr) => ({ ...acc, [curr.name]: "" }), {})
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(state);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full bg-background text-foreground/70">
      {inputs.map((input) => (
        <div key={input.name}>
          <Label htmlFor={input.name} className="block w-full font-medium">
            {input.label}
          </Label>
          <Input
            type={input.type || "text"}
            id={input.name}
            name={input.name}
            value={state[input.name]}
            onChange={(e) => setState((prev) => ({ ...prev, [input.name]: e.target.value }))}
            className="mt-1 p-1 px-2 submitHandlerblock w-full rounded-2xl border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 "
          />
        </div>
      ))}
      {children}
      <Button
        type="submit"
        className="mt-4 w-full rounded-lg text-white font-medium border border-transparent bg-purple-800 py-2 px-4 shadow-sm hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-800 focus:ring-offset-2"
      >
        {submitText ?? "Submit"}
      </Button>
    </form>
  );
};

