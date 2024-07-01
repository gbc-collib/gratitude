import { auth } from '@clerk/nextjs/server';
import Profile from './[id]/page';

export default async function MyProfile() {
    const currentUser = auth();
    if (!currentUser.userId) {
        throw new Error("Invalid User");
    }
    return (
        <Profile params={{ id: currentUser.userId }} />
    );
}
