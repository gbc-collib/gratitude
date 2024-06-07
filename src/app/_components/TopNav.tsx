import { SignedOut, SignInButton, SignedIn, UserButton, SignOutButton } from '@clerk/nextjs';
export default function TopNav() {
    return (
        <nav className="bg-extend-dark-accent">
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <div className="flex flex-row">
                <SignedIn>
                    <UserButton />
                    <div>
                        <SignOutButton />
                    </div>
                </SignedIn>
            </div>
        </nav>
    )
}
