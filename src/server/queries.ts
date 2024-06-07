import "server-only";


import { db } from "./db";
import { auth } from '@clerk/nextjs/server';
import { followers } from "./db/schema";
import { eq, and } from "drizzle-orm";


export async function getPosts() {
    const posts = await db.query.posts.findMany({
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

export async function followNewUser(targetId: string) {
    const user = auth();
    if (!user.userId) throw new Error("Unauthorized");
    const result = await db.insert(followers).values({ followerId: user.userId, followingId: targetId });
    return result;
}

export async function unfollowUser(targetId: string) {
    const user = auth();
    if (!user.userId) throw new Error("Unauthorized");
    const result = await db.delete(followers).where(and(eq(followers.followingId, targetId), eq(followers.followerId, user.userId)));
    return result;
}

export async function getFollowingPosts() {
    const users = await getMyFollowing();
}
