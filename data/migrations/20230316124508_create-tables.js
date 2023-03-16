/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("roles", (roles) => {
      roles.increments("role_id");
      roles.string("role_name", 32).notNullable().unique();
    })
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 128).notNullable().unique();
      users.string("password", 128).notNullable();
      users.string("name", 128).notNullable();
      users.string("email", 128).notNullable().unique();
      users
        .integer("role_id")
        .unsigned()
        .notNullable()
        .references("role_id")
        .inTable("roles")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("posts", (posts) => {
      posts.increments("post_id");
      posts.integer("view_count").unsigned().defaultTo(0);
      posts.string("content", 256).notNullable();
      posts
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("user_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("comments", (comments) => {
      comments.increments("comment_id");
      comments.string("commentContent", 256).notNullable();
      comments
        .integer("post_id")
        .unsigned()
        .notNullable()
        .references("post_id")
        .inTable("posts")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("likes", (likes) => {
      likes.increments("like_id");
      likes.integer("like_count").unsigned().defaultTo(0);
      likes
        .integer("post_id")
        .unsigned()
        .notNullable()
        .references("post_id")
        .inTable("posts")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("likes")
    .dropTableIfExists("comments")
    .dropTableIfExists("posts")
    .dropTableIfExists("users")
    .dropTableIfExists("roles");
};
