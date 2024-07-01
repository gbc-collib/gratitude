import LeftSideBar from "./_components/LeftSideBar";
import SideNav from "~/components/ui/side-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { getFriendsPosts, getPosts } from "~/server/queries";
import QuoteCard from "./_components/QuoteCard";
import { CreatePost } from "./_components/CreatePost";
//import { RootLayout } from './layout';

import type { posts } from '~/server/db/schema';
import { auth } from "@clerk/nextjs/server";





export default async function HomePage() {
    const userId = auth()?.userId;
    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            <SideNav userId={userId} />
            <div className="flex flex-col justify-center">
                <Feed />
            </div>
            <LeftSideBar />
        </div>
    );
}


export const dynamic = "force-dynamic";

type Post = typeof posts.$inferSelect;

export async function Feed() {
    const currentUser = auth();
    const posts = await getPosts();
    return (
        <Tabs defaultValue="discover" className="">
            <TabsList>
                {currentUser ?
                    <TabsTrigger value="friends">Friends</TabsTrigger>
                    : ''}
                <TabsTrigger value="discover">Discover</TabsTrigger>
            </TabsList>
            <TabsContent value="discover">
                <CreatePost />
                <MainFeed posts={posts} />
            </TabsContent>
            {currentUser.userId ?
                < TabsContent value="friends">
                    <CreatePost />
                    <MainFeed posts={await getFriendsPosts()} />
                </TabsContent>
                : <div>Login to see friends posts </div>
            }
        </Tabs >
    )
}

export async function MainFeed({ posts }: { posts: Post[] }) {
    return (
        <div className="flex-col items-center justify-center">
            <div className="flex flex-col gap-2">
                {posts.map((post) => (
                    <QuoteCard post={post} key={post.id} />
                ))}
            </div>
        </div>
    )
}
