import { clerkClient, auth } from '@clerk/nextjs/server';
import LeftSideBar from '~/app/_components/LeftSideBar';
import SideNav from '~/components/ui/side-nav';
import { ProfilePic } from '~/components/ui/profile-pic';
import { MainFeed } from '~/app/page';
import { getUsersPosts } from '~/server/queries';
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
