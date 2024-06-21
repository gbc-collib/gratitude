import 'server-only';

import { auth } from '@clerk/nextjs/server';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { clerkClient } from "@clerk/nextjs/server";
import { isUserFollowing } from '~/utils/usersUtils';
import { FollowButton } from './FollowButton';
import { UnfollowButton } from './UnfollowButton';
import { ProfilePic } from '~/components/ui/profile-pic';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"

export const dynamic = "force-dynamic";
import { posts } from '~/server/db/schema';
import Link from 'next/link';
type Post = typeof posts.$inferSelect;


export async function ModifyFollowerButton({ target }: { target: string }) {
    const currentUser = auth();
    const isFollowing = currentUser.userId ? await isUserFollowing(target) : false;
    if (!currentUser.userId || currentUser.userId === target) {
        return null; // Don't show follow/unfollow button for non-authenticated users or for self
    }
    return isFollowing ? <UnfollowButton target={target} /> : <FollowButton target={target} />;
}

export default async function QuoteCard({ post }: { post: Post }) {
    const userInfo = await clerkClient.users.getUser(post.userId);
    return (
        <Card >
            <CardHeader className="">
                <CardTitle>
                    <div className="flex flex-wrap ">
                        <Link href={"/profile/" + userInfo.id}>
                        <ProfilePic url={userInfo.imageUrl} />
                        <span className="align-text-bottom">{userInfo.username}</span>
                        </Link>
                        <ModifyFollowerButton target={post.userId} />
                    </div>
                </CardTitle>

            </CardHeader>
            <CardContent className="">
                {post.content}
            </CardContent>
            <CardFooter>
                <div className="flex flex-wrap">
                    <p className="justify-start">Posted {post.createdAt.toLocaleDateString('en-US')}</p>
                    <FavoriteBorderIcon className="justify-end" />
                </div>
            </CardFooter>
        </Card>
    );
}


