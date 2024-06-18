import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { getFriendsPosts, getPosts } from "~/server/queries";
import QuoteCard from "../_components/QuoteCard";
import { CreatePost } from "../_components/CreatePost";
import { posts } from '~/server/db/schema';


const dynamic = "force-dynamic";

type Post = typeof posts.$inferSelect;

export default async function Feed() {
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