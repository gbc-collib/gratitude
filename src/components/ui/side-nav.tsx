'use client';
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "~/components/ui/button"

export default function SideNav() {
    const router = useRouter();
    return (
        <nav className="border text-card-foreground">
            <div className="mx-2 my-3">
                <ul className="flex flex-col gap-2 mx-2 justify-start">
                    <NavItem><Button variant="ghost" className="p-2 justify-start w-full">Profile</Button></NavItem>
                    <NavItem><Button variant="ghost" className="p-2 justify-start w-full">Groups</Button></NavItem>
                    <NavItem><Button variant="ghost" className="p-2 justify-start w-full">Placeholder</Button></NavItem>
                    <NavItem><Button variant="ghost" className="p-2 justify-start w-full">Placeholder</Button></NavItem>
                    <NavItem><Button variant="ghost" className="p-2 justify-start w-full">Placeholder</Button></NavItem>
                    <NavItem><Button variant="ghost" className="p-2 justify-start w-full">Placeholder</Button></NavItem>
                    <NavItem><Button variant="ghost" className="p-2 justify-start w-full">Placeholder</Button></NavItem>
                    <NavItem><Button variant="ghost" className="p-2 justify-start w-full">Placeholder</Button></NavItem>
                    <NavItem><Button variant="ghost" className="p-2 justify-start w-full">Placeholder</Button></NavItem>
                </ul>
            </div>
        </nav>
    )
}

function NavItem({ children }: { children: ReactNode }) {
    return (
        <li className="bg-background text-xl border-b w-full">
            {children}
        </li>
    )
}
