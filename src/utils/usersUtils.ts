'use server';
import { eq, and } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { posts, followers } from '~/server/db/schema';
import { db } from '~/server/db';


export async function isUserFollowing(targetId: string) {
    const currentUser = auth();
    if (!currentUser.userId) throw new Error("Unauthorized");
    const followerRecord = await db.select().from(followers).where(and(eq(followers.followingId, targetId), eq(followers.followerId, currentUser.userId)));
    console.log(followerRecord);
    return followerRecord.length > 0;
}
