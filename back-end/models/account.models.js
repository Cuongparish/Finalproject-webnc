const postgre = require("./database");

module.exports = {
  getAll: async (req, res) => {
    const { rows } = await postgre.query('select * from "User"');
    return { rows };
  },

  getbyEmail: async (Email) => {
    const { rows } = await postgre.query(
      `select * from "User" where "Email" = '${Email}'`
    );
    return { rows };
  },

  editUser: async (IdUser, Email, Pw, Role) => {
    const sql =
      'UPDATE "User" SET "Email" = $2, "Pw" = $3, "Role"=$4 where "IdUser" = $1 RETURNING *';
    const { rows } = await postgre.query(sql, [IdUser, Email, Pw, Role]);
    return { rows };
  },

  addUser: async (Email, Pw, Role) => {
    const sql = `INSERT INTO "User"(
      "Email", "Pw", "Role")
      VALUES ($1, $2, $3) RETURNING *`;
    const { rows } = await postgre.query(sql, [Email, Pw, Role]);
    return { rows };
  },
};
