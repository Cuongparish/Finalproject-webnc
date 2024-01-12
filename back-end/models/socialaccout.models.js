const postgre = require("./database");
const moment = require("moment");
module.exports = {
  getbyEmail: async (Email) => {
    const { rows } = await postgre.query(
      `select * from "User" where "Email" = '${Email}'`
    );
    
    return { rows };
  },

  addUser: async (Email, FullName) => {
    const sql = `INSERT INTO "User"(
          "Email", "FullName")
          VALUES ($1, $2) RETURNING *`;
    const { rows } = await postgre.query(sql, [Email, FullName]);
  
    return { rows };
  },
};
