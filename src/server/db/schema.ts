import { sql } from 'drizzle-orm';
import {
    pgTableCreator,
    serial,
    timestamp,
    varchar,
    integer,
    boolean,
    unique
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `gratitude_${name}`);


export const posts = createTable(
    "post",
    {
        id: serial("id").primaryKey(),
        userId: varchar("userId", { length: 256 }).notNull(),
        content: varchar("content", { length: 256 }).notNull(),
        isPublic: boolean("isPublic").notNull(),
        createdAt: timestamp("createdAt", { withTimezone: true })
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),

        tags: varchar("tags")
    },
);

export const postLikes = createTable(
    "postLike",
    {
        id: serial("id").primaryKey(),
        postId: integer("postId").references(() => posts.id),
        userId: varchar("userId", { length: 256 }),
    }, (t) => ({
        unq: unique().on(t.postId, t.userId),
    })
);


export const followers = createTable(
    "follower",
    {
        id: serial("id").primaryKey(),
        followerId: varchar("followerId", { length: 256 }).notNull(),
        followingId: varchar("followingId", { length: 256 }).notNull(),

    }, (t) => ({
        unq: unique().on(t.followerId, t.followingId),
    })
);
