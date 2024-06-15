import QuoteCard from "./_components/QuoteCard";
import { CreatePost } from "./_components/CreatePost";
import LeftSideBar from "./_components/LeftSideBar";
import { getFriendsPosts, getPosts } from "~/server/queries";
import { posts } from '~/server/db/schema';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import SideNav from "~/components/ui/side-nav";


const dynamic = "force-dynamic";

type Post = typeof posts.$inferSelect;

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

export default async function HomePage() {
    const posts = await getPosts();
    const friendsPosts = await getFriendsPosts();
    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            <SideNav />
            <div className="flex flex-col justify-center">
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
            </div>
            <LeftSideBar />
        </div>
    );
}
