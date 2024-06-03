import {
    index,
    pgTableCreator,
    serial,
    timestamp,
    varchar,
    integer,
    date,
    boolean
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
        userId: integer("userId"),
        content: varchar("content", { length: 256 }),
        createdAt: timestamp("createdAt").defaultNow(),
        isPublic: boolean("isPublic"),
        tags: varchar("tags")
    }
);
