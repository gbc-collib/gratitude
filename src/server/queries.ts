import "server-only";


import { db } from "./db";
import { auth } from '@clerk/nextjs/server';


export async function getPosts() {
    const posts = await db.query.posts.findMany({
        orderBy: (model, { desc }) => desc(model.id),
    });
    return posts;
};


export async function getMyPosts() {
    const user = auth();
    if (!user.userId) throw new Error("Unauthorized");

    const posts = await db.query.posts.findMany({
        where: (model, { eq }) => eq(model.userId, user.userId),
        orderBy: (model, { desc }) => desc(model.id),
    });
    return posts;
}

export async function getMyFollowers() {
    const user = auth();

    if (!user.userId) throw new Error("Unauthorized");
    const followers = await db.query.followers.findMany({
        where: (model, { eq }) => eq(model.followingId, user.userId)
    })
    return followers;
}

export async function getMyFollowing() {
    const user = auth();

    if (!user.userId) throw new Error("Unauthorized");

    const following = await db.query.followers.findMany({
        where: (model, { eq }) => eq(model.followerId, user.userId)
    })
    return following;

}



export async function getFollowingPosts() {
    const users = await getMyFollowing();
    return users;
}
