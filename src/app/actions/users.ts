'use server';
import { eq, and } from 'drizzle-orm';
import { auth } from '@clerk/nextjs/server';
import { posts, followers } from '~/server/db/schema';
import { db } from '~/server/db';
import { revalidatePath } from 'next/cache';


export async function isUserFollowing(targetId: string) {
    const currentUser = auth();
    if (!currentUser.userId) throw new Error("Unauthorized");
    const followerRecord = await db.select().from(followers).where(and(eq(followers.followingId, targetId), eq(followers.followerId, currentUser.userId)));
    return followerRecord.length > 0;
}

export async function followNewUser(formData: FormData) {
    const targetId = formData.get('target');
    const user = auth();
    if (!user.userId) throw new Error("Unauthorized");
    const result = await db.insert(followers).values({ followerId: user.userId, followingId: targetId });
    revalidatePath("/");
}

export async function unfollowUser(formData: FormData) {
    const targetId = formData.get('target');
    const user = auth();
    if (!user.userId) throw new Error("Unauthorized");
    const result = await db.delete(followers).where(and(eq(followers.followingId, targetId), eq(followers.followerId, user.userId)));
    revalidatePath("/");
}
