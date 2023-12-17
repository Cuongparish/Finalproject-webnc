const postgre = require("./database");
const moment = require("moment");
module.exports = {
  getAll: async (req, res) => {
    const { rows } = await postgre.query('select * from "User"');
    rows.forEach((element) => {
      element.DOB = moment(element.DOB).format("DD-MM-YYYY");
    });
    return { rows };
  },

  getbyID: async (req, res) => {
    const { rows } = await postgre.query(
      `select us.*, hs."idHocSinh", hs."StudentId"
      from "User" us left join "HocSinh" hs on us."idUser"=hs."idUser"
      where us."idUser"=$1`,
      [req.params.idUser]
    );

    rows.forEach((element) => {
      element.DOB = moment(element.DOB).format("DD-MM-YYYY");
    });
    return { rows };
  },

  getbyEmail: async (Email) => {
    const { rows } = await postgre.query(
      `select * from "User" where "Email" = '${Email}'`
    );
    rows.forEach((element) => {
      element.DOB = moment(element.DOB).format("DD-MM-YYYY");
    });
    return { rows };
  },

  editUser: async (IdUser, Email, Pw, Role) => {
    const sql =
      'UPDATE "User" SET "Email" = $2, "Pw" = $3, "Role"=$4 where "IdUser" = $1 RETURNING *';
    const { rows } = await postgre.query(sql, [IdUser, Email, Pw, Role]);
    return { rows };
  },

  addUser: async (Email, Pw, FullName, Sex, DOB, Phone) => {
    const sql = `INSERT INTO "User"(
      "Email", "Pw", "FullName", "Sex", "DOB", "Phone")
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const { rows } = await postgre.query(sql, [
      Email,
      Pw,
      FullName,
      Sex,
      DOB,
      Phone,
    ]);

    rows.forEach((element) => {
      element.DOB = moment(element.DOB).format("DD-MM-YYYY");
    });
    return { rows };
  },

  resetPW: async (Email, Pw) => {
    const sql = `UPDATE "User" SET "Pw" = $2  where "Email" = $1 RETURNING *`;
    const { rows } = await postgre.query(sql, [Email, Pw]);
    return { rows };
  },

  getStudentID: async (req, res) => {
    const { rows } = await postgre.query(
      `SELECT "StudentId" FROM "HocSinh" Where "idUser"='${req.body.idUser}';`
    );
    return { rows };
  },
};
