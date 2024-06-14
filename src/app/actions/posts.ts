"use server";
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { db } from '~/server/db';
import { posts } from '~/server/db/schema';

export async function createPost(formData: FormData) {
    const postContent = formData.get('content');
    const user = auth();
    if (!user.userId) throw new Error("Unauthorized");
    if (!postContent || typeof postContent != 'string') throw new Error("Invalid post");
    await db.insert(posts).values({
        userId: user.userId, content: postContent, isPublic: true, tags: ''
    });
    revalidatePath("/");
};
