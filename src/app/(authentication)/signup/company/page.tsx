"use client"
import { Form } from "@/components/form";
import { NewCompany } from "@/database/schema/users";
import { toast } from "sonner";

export default function CompanySignUp() {

    const handleSubmit = async (state:{[x: string]: string;}) => {
        if(!state) toast.error("Please fill all the fields")
        if(!state.password || state.password !== state.confirmPassword) toast.error("Passwords don't match")
        // @ts-ignore
        const res = await signinAsUser<NewCompany>(state) // make a serveraction function   
        res ? toast.success("Signed up successfully") : toast.error("An error occurred while signing in.")
    }
    return <div className="container w-screen flex my-10 flex-col items-center">
        <main className="flex flex-col items-center w-fit gap-6 p-6 border rounded-lg bg-background text-foreground">
            <header className="flex flex-col gap-2">
                <h1 className="w-fit text-2xl font-semibold">Fill your Organization's details</h1>
                <p className="w-fit text-xs text-foreground/60 font-light">Your details will be verified later</p>
            </header>
            <section className="flex flex-col gap-4 w-fit items-center">
                <Form inputs={[
                    { label: "Organization Name", name: "companyName", type: "text"},
                    { label: "Email", name: "email", type: "email",},
                    { label: "Your Role", name: "role", type: "text",},
                    { label: "Password", name: "password", type: "password"},
                    { label: "Confirm Password", name: "confirmPassword", type: "password"},
                    { label: "Image", name: "image", type: "file"}
                ]} onSubmit={(state) =>handleSubmit(state)} />
            </section>
        </main>
    </div>
}
