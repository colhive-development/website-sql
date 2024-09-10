"use client"
import { Form } from "@/components/form";
import { NewCompany, NewUser } from "@/database/schema/users";
import { toast } from "sonner";

export default function UserSignUp() {

    const handleSubmit = async (state:{[x: string]: string;}) => {
        if(!state) toast.error("Please fill all the fields")
        if(!state.password || state.password !== state.confirmPassword) toast.error("Passwords don't match")
        // @ts-ignore
    // TODO : upload image to firebase before calling fn and return a url
        const res = await signinAsUser<NewUser>(state) // make a serveraction function   
        res ? toast.success("Signed up successfully") : toast.error("An error occurred while signing in.")
    }
    return <div className="container w-screen flex my-10 flex-col items-center">
        <main className="flex flex-col items-center w-fit gap-6 p-6  rounded-lg bg-background border text-foreground ">
            <header className="flex flex-col gap-2">
                <h1 className="w-fit text-2xl font-semibold">Fill your details</h1>
            </header>
            <section className="flex flex-col gap-4 w-fit items-center">
                <Form inputs={[
                    { label: "Name", name: "name", type: "text"},
                    { label: "Email", name: "email", type: "email",},
                    { label: "Password", name: "password", type: "password"},
                    { label: "Confirm Password", name: "confirmPassword", type: "password"},
                    { label: "Company Id", name: "companyId", type: "text"},
                    { label: "Image", name: "image", type: "file"}
                ]} onSubmit={(state) =>handleSubmit(state)} />
            </section>
        </main>
    </div>
}
