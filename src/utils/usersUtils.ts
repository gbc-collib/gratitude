import 'server-only';
import { eq, and } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { followers } from '~/server/db/schema';
import { db } from '~/server/db';


export async function isUserFollowing(targetId: string) {
    const currentUser = auth();
    if (!currentUser.userId) throw new Error("Unauthorized");
    const followerRecord = await db.select().from(followers).where(and(eq(followers.followingId, targetId), eq(followers.followerId, currentUser.userId)));
    const allfollowers = await db.select().from(followers);
    console.log(`${currentUser.userId} is following ${targetId}?`);
    console.log(allfollowers);
    console.log(followerRecord);
    return followerRecord.length > 0;
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
