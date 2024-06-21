import { clerkClient, auth } from '@clerk/nextjs/server';
import LeftSideBar from '~/app/_components/LeftSideBar';
import SideNav from '~/components/ui/side-nav';
import { ProfilePic } from '~/components/ui/profile-pic';
import { MainFeed } from '~/app/page';
import { getUsersPosts } from '~/server/queries';

export default async function Profile({ params }: { params: { id: string } }) {
    //const currentUser = auth();
    const id = params.id;
    const posts = await getUsersPosts(id);
    if (!id) {
        throw new Error("Invalid User");
    }
    const userInfo = await clerkClient.users.getUser(id);
    console.log(userInfo.username);

    //const isMyProfile = (id == currentUser.userId);
    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            <SideNav />
            <div className="flex flex-col gap-1">
                <div className="border grid-cols-2 p-2">
                    <ProfilePic url={userInfo.imageUrl} />
                    <div className="flex-col"><div> @{userInfo.username}</div></div>
                </div>
                <MainFeed posts={posts} />
            </div>
            <hr />
            <LeftSideBar />
        </div >
    );
}
