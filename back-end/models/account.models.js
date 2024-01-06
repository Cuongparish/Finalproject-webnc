const postgre = require("./database");
const moment = require("moment");
module.exports = {
  getAll: async (req, res) => {
    const { rows } = await postgre.query(`
    select us.*, hs."idHocSinh", hs."StudentId"
    from "User" us left join "HocSinh" hs on us."idUser"=hs."idUser"
    ORDER BY us."idUser" ASC
    `);
    rows.forEach((element) => {
      element.DOB = moment(element.DOB).format("DD-MM-YYYY");
    });
    return { rows };
  },

  getbyID: async (idUser) => {
    const { rows } = await postgre.query(
      `select us.*, hs."idHocSinh", hs."StudentId"
      from "User" us left join "HocSinh" hs on us."idUser"=hs."idUser"
      where us."idUser"=$1`,
      [idUser]
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

  editUser: async (idUser, Email, Pw, FullName, DOB, Sex, Phone, StudentId) => {
    const sql_user = `UPDATE "User" SET "Email" = $2, "Pw" = $3, "DOB"=$4, "Sex"=$5, "Phone"=$6, "FullName"=$7 where "idUser" = $1`;
    const sql_hocsinh = `UPDATE "HocSinh" SET "StudentId" = $2 WHERE "idUser" = $1`;
    const sql_create_hocsinh = `INSERT INTO public."HocSinh" ("idUser", "StudentId") VALUES ( $1, $2)`;
    const sql_select_hocsinh = `SELECT * FROM "HocSinh" WHERE "idUser"=$1`;

    const { rows } = await postgre.query(sql_select_hocsinh, [idUser]);

    if (!StudentId) {
      postgre.query(sql_user, [idUser, Email, Pw, DOB, Sex, Phone, FullName]);
    } else {
      postgre.query(sql_user, [idUser, Email, Pw, DOB, Sex, Phone, FullName]);
      // nếu chưa là học sinh
      if (rows && rows.length > 0) {
        postgre.query(sql_hocsinh, [idUser, StudentId]);
        // nếu đã là học sinh
      } else {
        postgre.query(sql_create_hocsinh, [idUser, StudentId]);
      }
    }
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
