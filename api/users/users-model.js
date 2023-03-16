const db = require("../../data/db-config");

function getUsers() {
  return db("users as u")
    .join("roles as r", "u.role_id", "r.role_id")
    .select("u.user_id", "u.username", "r.role_name");
  ///İSİM-EPOSTA DÖNSEK Mİ Kİ
}

async function getUsersBy(filter) {
  let User = await db("users as u")
    .join("roles as r", "u.role_id", "r.role_id")
    .select("u.user_id", "u.username", "r.role_name")
    .where(filter)
    .first();
  return User;
}

async function getUsersById(id) {
  let Users = await db("users as u")
    .join("roles as r", "u.role_id", "r.role_id")
    .select("u.user_id", "u.username", "r.role_name", "u.password")
    .where("u.user_id", id)
    .first();
  return Users;
}

async function updateById(change, id) {
  let updatedUserId = await db("users").where("user_id", id).update(change);
  console.log(updatedUserId);
  return getUsersById(Number(updatedUserId));
}

async function remove(id) {
  return await db("users").where({ user_id: id }).del();
}
async function addUser(user) {
  // let created_user_id;
  // await db.transaction(async (trx) => {
  //   let role_id_to_use;
  //   const [role] = await trx("roles").where("role_name", role_name);
  //   if (role) {
  //     role_id_to_use = role.role_id;
  //   } else {
  //     const [role_id] = await trx("roles").insert({ role_name: role_name });
  //     role_id_to_use = role_id;
  //   }
  //   const [user_id] = await trx("users").insert({
  //     username,
  //     password,
  //     name,
  //     email,
  //     role_id: role_id_to_use,
  //   });
  //   created_user_id = user_id;
  //   console.log(created_user_id);
  // });
  // return getUsersBy(created_user_id);
  let insertedId = await db("users").insert(user);
  return deneme({ user_id: insertedId });
}
module.exports = {
  getUsers,
  getUsersBy,
  getUsersById,
  addUser,
  updateById,
  remove,
};
