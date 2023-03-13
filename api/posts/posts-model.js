/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const db = require("../../data/db-config");

async function getPosts() {
  const posts = await db("users as u")
    .join("posts as p", "u.user_id", "p.user_id")
    .join("comments as c", "p.post_id", "c.post_id")
    .join("likes as l", "l.post_id", "p.post_id")
    .select("u.username", "c.content", "l.like_count", "p.view_count");
  return posts;
}

async function getPostsByUserId(user_id) {
  const post = await db("users as u")
    .join("posts as p", "u.user_id", "p.user_id")
    .join("comments as c", "p.post_id", "c.post_id")
    .join("likes as l", "l.post_id", "p.post_id")
    .select("u.username", "c.content", "l.like_count", "p.view_count")
    .where({ "u.user_id": user_id })
    .first();
  return post;
}

module.exports = { getPosts, getPostsByUserId };
