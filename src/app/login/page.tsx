import {
    SignInButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function Login() {
    if (auth()) {
        redirect("/");
    }
    return (
        <div className="flex flex-col">
            <SignInButton />
        </div >

    )
}
