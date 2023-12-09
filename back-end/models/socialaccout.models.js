const postgre = require("./database");
const moment = require("moment");
module.exports = {
  getbyEmail: async (Email) => {
    const { rows } = await postgre.query(
      `select * from "User" where "Email" = '${Email}'`
    );
    rows.forEach((element) => {
      element.DOB = moment(element.DOB).format("DD-MM-YYYY");
    });
    return { rows };
  },

  addUser: async (Email) => {
    const sql = `INSERT INTO "User"(
          "Email")
          VALUES ($1) RETURNING *`;
    const { rows } = await postgre.query(sql, [Email]);
    rows.forEach((element) => {
      element.DOB = moment(element.DOB).format("DD-MM-YYYY");
    });
    return { rows };
  },
};
