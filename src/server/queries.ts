import "server-only";


import { db } from "./db";
import { auth } from '@clerk/nextjs/server';
import { followers, posts } from "./db/schema";
import { eq } from "drizzle-orm";


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

export async function getUsersPosts(userId: string) {

    const posts = await db.query.posts.findMany({
        where: (model, { eq }) => eq(model.userId, userId),
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



export async function getFriendsPosts() {
    const user = auth();
    if (!user.userId) throw new Error("Unauthorized");

    const query = await db
        .select({
            id: posts.id, userId: posts.userId, content: posts.content, isPublic: posts.isPublic, createdAt: posts.createdAt, tags: posts.tags,
        })
        .from(posts)
        .innerJoin(followers, eq(posts.userId, followers.followingId))
        .where(eq(followers.followerId, user.userId));
    console.log(query);
    return query;
    // followers, posts.userId.eq(followers.followingId)).where(followers.followerId.eq(currentUserId);
}
