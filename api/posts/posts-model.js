/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const db = require("../../data/db-config");
const { all } = require("./posts-router");

async function getPosts() {
  const posts = await db("users as u")
    .join("posts as p", "u.user_id", "p.user_id")
    .join("comments as c", "p.post_id", "c.post_id")
    .join("likes as l", "l.post_id", "p.post_id")
    .select(
      "u.username",
      "p.content",
      "c.commentContent",
      "l.like_count",
      "p.view_count"
    );
  return posts;
}
async function getPostsByUserId(user_id) {
  const post = await db("users as u")
    .join("posts as p", "u.user_id", "p.user_id")
    .join("comments as c", "p.post_id", "c.post_id")
    .join("likes as l", "l.post_id", "p.post_id")
    .select(
      "u.username",
      "p.content",
      "c.commentContent",
      "l.like_count",
      "p.view_count"
    )
    .where({ "u.user_id": user_id });

  return post;
}
async function getPostsByPostId(post_id) {
  const post = await db("users as u")
    .join("posts as p", "u.user_id", "p.user_id")
    .join("comments as c", "p.post_id", "c.post_id")
    .join("likes as l", "l.post_id", "p.post_id")
    .select(
      "u.username",
      "p.content",
      "c.commentContent",
      "l.like_count",
      "p.view_count"
    )
    .where({ "p.post_id": post_id });

  return post;
}

async function insert(post) {
  // await db("posts").insert(post);
  let newPostUserID = await db("posts").insert(post);
  return getPostsByUserId(newPostUserID);
}

async function updateById(post, post_id) {
  let updatedId = await db("posts").where("post_id", post_id).update(post);

  return getPostsByPostId(updatedId);
}

const deleteById = (id) => {
  return db("posts").where("post_id", id).delete();
};

module.exports = { getPosts, getPostsByUserId, insert, deleteById, updateById };

// const getComments = async function (post_id) {
//   const comments = await db("comments as c")
//     .join("posts as p", "p.post_id", "c.post_id")
//     .select("c.commentContent")
//     .where("post_id", post_id);
//   return comments;
// };

// async function getPostData(post_id) {
//   const posts = await db("posts as p")
//     .join("likes as l", "l.post_id", "p.post_id")
//     .join("comments as c", "c.post_id", "p.post_id")
//     .select("p.content", "p.view_count", "c.commentContent", "l.like_count")
//     .where("p.post_id", post_id);
//   return posts;
// }

// async function userPostData() {
//   let userPostData = await db("users as u")
//     .join("posts as p", "u.user_id", "p.user_id")
//     .join("comments as c", "p.post_id", "c.post_id")
//     .join("likes as l", "l.post_id", "p.post_id")
//     .select(
//       "u.username",
//       "p.content",
//       "p.view_count",
//       "c.commentContent",
//       "l.like_count"
//     );

//   return userPostData;
// }

// async function getPostsByUserId(user_id) {
//   let userPostData = await db("users as u")
//     .join("posts as p", "u.user_id", "p.user_id")
//     .join("comments as c", "p.post_id", "c.post_id")
//     .join("likes as l", "l.post_id", "p.post_id")
//     .select("u.*", "p.*", "c.*", "l.*")
//     .where("u.user_id", user_id);

//   const postModel = {
//     username: userPostData[0].username,
//     posts: [],
//   };
//   for (let i = 0; i < userPostData.length; i++) {
//     const post = userPostData[i];
//     console.log(post);
//     const posts = await getPostData(post.post_id);
//     postModel.posts.push(posts);
//   }

//   return postModel;
// }
