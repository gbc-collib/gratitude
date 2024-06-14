'use server';
import { auth } from '@clerk/nextjs/server';
import { posts } from '~/server/db/schema';
import { db } from '~/server/db';

export async function createPost(postContent: string) {
    const user = auth();
    if (!user.userId) throw new Error("Unauthorized");
    await db.insert(posts).values({
        userId: user.userId, content: postContent, isPublic: true, tags: ''
    });
};
