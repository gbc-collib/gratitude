'use client';
import Link from 'next/link'
import type { ReactNode } from "react";
import { Button } from "~/components/ui/button"
import { ProfilePic } from './profile-pic';

export default function SideNav({ userId }: { userId: string | null }) {
    return (
        <nav className="border text-card-foreground">
            <div className="mx-2 my-3">
                <ul className="flex flex-col gap-2 mx-2 justify-start">
                    {userId ?
                        <NavItem><Link href="/profile"><Button variant="ghost" className="p-2 justify-start w-full">Profile <ProfilePic url={userId} /></Button ></Link></NavItem>
                        : ''}
                    <NavItem><Link href="/groups"><Button variant="ghost" className="p-2 justify-start w-full">Groups</Button></Link></NavItem>
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
