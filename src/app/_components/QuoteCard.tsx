import 'server-only';
import CardContent from '@mui/material/CardContent';
import { CardActions } from '@mui/material';
import { Button } from '@mui/material';
import { Card } from '@mui/material';
import { auth } from '@clerk/nextjs/server';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { clerkClient } from "@clerk/nextjs/server";
import { isUserFollowing } from '~/utils/usersUtils';
import { FollowButton } from './FollowButton';
import { UnfollowButton } from './UnfollowButton';
import { followNewUser } from '../actions/users';

export const dynamic = "force-dynamic";


export async function ModifyFollowerButton({ target }: { target: string }) {
    const currentUser = auth();
    const isFollowing = currentUser.userId ? await isUserFollowing(target) : false;
    if (!currentUser.userId || currentUser.userId === target) {
        return null; // Don't show follow/unfollow button for non-authenticated users or for self
    }
    return isFollowing ? <UnfollowButton target={target} /> : <FollowButton target={target} />;
}

export default async function QuoteCard({ post }) {
    const userInfo = await clerkClient.users.getUser(post.userId);

    return (
        <Card className="bg-extend-card-bg border-2 border-extend-accent text-extend-main-text">
            <div className="text-3xl flex flex-row items-end bg-extend-dark-card">
                <img src={userInfo.imageUrl} className="w-12 h-12 rounded-full mr-2" />
                <span>{userInfo.username}</span>
                <ModifyFollowerButton target={post.userId} />
            </div>
            <CardContent className="border-extend-accent">
                {post.content}
            </CardContent>
            <CardActions>
                <Button size="small" className="text-extend-main-text">Posted {post.createdAt.toLocaleDateString('en-US')}</Button>
                <FavoriteBorderIcon className="text-extend-red" />
            </CardActions>
        </Card>
    );
}
