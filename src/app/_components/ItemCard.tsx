'use server';
import CardContent from '@mui/material/CardContent';
import { CardActions } from '@mui/material';
import { Button } from '@mui/material';
import { Card } from '@mui/material';
import { auth } from '@clerk/nextjs/server';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { clerkClient } from "@clerk/nextjs/server";
import { isUserFollowing } from '~/utils/usersUtils';

async function ModifyFollowerButton({ target }) {
    const currentUser = auth();
    if (!currentUser.userId) throw new Error("Unauthorized");

    const isFollowing = await isUserFollowing(target);
    if (isFollowing) {
        return (
            <Button>+</Button>
        );
    }
    //Don't show user follow button for themselves
    else if (!isFollowing && (currentUser.userId != target)) {
        return (
            <Button>-</Button>
        );
    }
    else {
        return (<></>);
    }
}


export default async function QuoteCard({ post }) {
    //TODO GET USER
    const userInfo = await clerkClient.users.getUser(post.userId);
    return (
        <>
            <Card className="bg-extend-card-bg border-2 border-extend-accent text-extend-main-text">
                <div className="text-3xl flex flex-row items-end bg-extend-dark-card" >
                    <img src={userInfo.imageUrl} className="w-12 h-12 rounded-full mr-2" />
                    <ModifyFollowerButton target={post.userId} />
                    <span className="">{userInfo.username}</span><span></span></div>
                <CardContent className="border-extend-accent">
                    {post.content}
                </CardContent>
                <CardActions>
                    <Button size="small" className="text-extend-main-text">Posted {post.createdAt.toLocaleDateString('en-US')}</Button>
                    {/* <FavoriteIcon className="text-extend-red" /> */}
                    <FavoriteBorderIcon className="text-extend-red" />
                </CardActions>
            </Card >
        </>
    );
}
