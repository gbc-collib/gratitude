'use server';
import QuoteCard from "./_components/QuoteCard";
import { CreatePost } from "./_components/CreatePost";
import LeftSideBar from "./_components/LeftSideBar";
import { getPosts } from "~/server/queries";


const dynamic = "force-dynamic";

export async function MainFeed() {
    const posts = await getPosts();
    return (
        <div className="min-h-screen flex-col items-center justify-center bg-extend-main-background">
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
    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            <LeftSideBar />
            <MainFeed />
            <LeftSideBar />
        </div>
    );
}
