import "server-only";


import { and, eq } from "drizzle-orm";
import { db } from "./db";
import { posts } from './db/schema';
import { auth } from '@clerk/nextjs/server';


export async function getPosts() {
    db.query.posts.findMany({
        with: {
            posts: true
        }
    });
};


export async function getMyPosts() {
    const user = auth();
    if (!user.userId) throw new Error("Unauthorized");

    db.query.posts.findMany({
        where:
            (model, { eq }) => eq(model.userId, user.userId),
        orderBy: (model, { desc }) => desc(model.id),
        with: {
            posts: true
        }
    });
}
