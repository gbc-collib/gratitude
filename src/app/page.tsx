import LeftSideBar from "./_components/LeftSideBar";
import SideNav from "~/components/ui/side-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { getFriendsPosts, getPosts } from "~/server/queries";
import QuoteCard from "./_components/QuoteCard";
import { CreatePost } from "./_components/CreatePost";

import type { posts } from '~/server/db/schema';





export default async function HomePage() {
    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            <SideNav />
            <div className="flex flex-col justify-center">
                <Feed />
            </div>
            <LeftSideBar />
        </div>
    );
}


const dynamic = "force-dynamic";

type Post = typeof posts.$inferSelect;

export async function Feed() {
    const posts = await getPosts();
    const friendsPosts = await getFriendsPosts();
    return (
        <Tabs defaultValue="friends" className="">
            <TabsList>
                <TabsTrigger value="friends">Friends</TabsTrigger>
                <TabsTrigger value="discover">Discover</TabsTrigger>
            </TabsList>
            <TabsContent value="discover">
                <MainFeed posts={posts} />
            </TabsContent>
            <TabsContent value="friends">
                <MainFeed posts={friendsPosts} />
            </TabsContent>
        </Tabs>
    )
}

async function MainFeed({ posts }: { posts: Post[] }) {
    return (
        <div className="flex-col items-center justify-center">
            <CreatePost />
            <div className="flex flex-col gap-2">
                {posts.map((post) => (
                    <QuoteCard post={post} key={post.id} />
                ))}
            </div>
        </div>
    )
}
