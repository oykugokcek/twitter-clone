/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("roles").truncate();
  await knex("roles").insert([
    { role_name: "admin" },
    { role_name: "verified_user" },
    { role_name: "unverified_user" },
  ]);
  await knex("users").truncate();
  await knex("users").insert([
    {
      username: "bob",
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq", // password "1234"
      name: "bob marley",
      email: "dontworry@gmail.com",
      role_id: 1,
    },
    {
      username: "sue",
      password: "$2a$10$dFwWjD8hi8K2I9/Y65MWi.WU0qn9eAVaiBoRSShTvuJVGw8XpsCiq", // password "1234"
      name: "sue sweet",
      email: "sue@gmail.com",
      role_id: 3,
    },
    {
      username: "oyku",
      password: "1234", // password "1234"
      name: "oyku gokcek",
      email: "oyk@gmail.com",
      role_id: 2,
    },
    {
      username: "kazım",
      password: "1234", // password "1234"
      name: "kazım yılmaz",
      email: "yilmazkardesler@gmail.com",
      role_id: 2,
    },
  ]);
  await knex("posts").truncate();
  await knex("posts").insert([
    {
      view_count: 85,
      user_id: 1,
    },
    {
      user_id: 2,
    },
    {
      user_id: 3,
    },
    {
      user_id: 4,
    },
    {
      user_id: 1,
    },
    {
      view_count: 40,
      user_id: 2,
    },
  ]);
  await knex("comments").truncate();
  await knex("comments").insert([
    {
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis augue ut orci bibendum placerat ut ac tellus. Sed nisi nunc, maximus et felis at, viverra porta sapien. Integer viverra laoreet sapien. Mauris leo ligula, efficitur sed nulla ut, auctor vestibulum nulla. Praesent non elit eu velit pretium feugiat.",
      post_id: 1,
    },
    {
      content:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In a interdum justo.",
      post_id: 2,
    },
    {
      content:
        "Sed interdum convallis dui nec venenatis. Donec maximus vel neque ut maximus. Nulla magna diam, hendrerit vel mollis quis, egestas vitae est. Aenean suscipit arcu lacus, ut varius lacus tempus at.",
      post_id: 3,
    },
    {
      content:
        "Ut suscipit varius justo et sodales. Aliquam risus tellus, imperdiet vel viverra vitae, cursus a massa. Nullam sed urna interdum, aliquet arcu at, consequat arcu. ",
      post_id: 4,
    },
    {
      content:
        "Morbi accumsan, metus sed gravida sollicitudin, ipsum nunc sollicitudin risus, ac malesuada tellus sapien id nibh. In sed facilisis nisl. Integer vel nisl faucibus, euismod nisl ac, tempor ipsum. Duis efficitur facilisis suscipit. ",
      post_id: 5,
    },
    {
      content:
        "Suspendisse ac nisi sagittis, ornare augue sit amet, auctor orci. Aenean pulvinar euismod mattis. Curabitur vehicula turpis sit amet massa congue, ac scelerisque enim varius. ",
      post_id: 6,
    },
  ]);
  await knex("likes").truncate();
  await knex("likes").insert([
    {
      like_count: 40,
      post_id: 1,
    },
    {
      like_count: 50,
      post_id: 2,
    },
    {
      like_count: 3,
      post_id: 3,
    },
    {
      like_count: 70,
      post_id: 4,
    },
    {
      like_count: 62,
      post_id: 5,
    },
    {
      like_count: 20,
      post_id: 6,
    },
  ]);
};
