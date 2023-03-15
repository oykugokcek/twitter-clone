const db = require("../../data/db-config");

function getUsers() {
  return db("users as u")
    .join("roles as r", "u.role_id", "r.role_id")
    .select("u.user_id", "u.username", "r.role_name");
  ///İSİM-EPOSTA DÖNSEK Mİ Kİ
}

function getUsersBy(filter) {
  let Users = db("users as u")
    .join("roles as r", "u.role_id", "r.role_id")
    .select("u.user_id", "u.username", "r.role_name", "u.password")
    .where(filter);
  if (Users.length === 1) {
    Users = Users[0];
  }
  return Users;
}

async function addUser({ username, password, name, email, role_name }) {
  let created_user_id;
  await db.transaction(async (trx) => {
    let role_id_to_use;
    const [role] = await trx("roles").where("role_name", role_name);
    if (role) {
      role_id_to_use = role.role_id;
    } else {
      const [role_id] = await trx("roles").insert({ role_name: role_name });
      role_id_to_use = role_id;
    }
    const [user_id] = await trx("users").insert({
      username,
      password,
      name,
      email,
      role_id: role_id_to_use,
    });
    created_user_id = user_id;
  });
  return getUsersBy(created_user_id);
}

async function update(id, change) {
  let updatedUserId = await db("users").where("user_id", id).update(change);
  return getByFilter({ user_id: updatedUserId });
}

async function remove(id) {
  return db("users").where("user_id", id).del();
}

module.exports = {
  getUsers,
  getUsersBy,
  addUser,
  update,
  remove,
};
