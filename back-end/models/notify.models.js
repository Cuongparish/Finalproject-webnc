const postgre = require("./database");
const moment = require("moment");
module.exports = {
  //done
  getNotify: async (req, res) => {
    const sql = `SELECT
                  tb.*,
                  lh."TenLop",
                  lh."Phong"
              FROM
                  "ThongBao" tb
              JOIN
                  "LopHoc" lh ON tb."Malop" = lh."idLop"
              WHERE
                  tb."idUser" = $1
              ORDER BY
                  tb."idThongBao" DESC;`;
    const { rows } = await postgre.query(sql, [req.params.idUser]);
    rows.forEach((element) => {
      element.ThoiGian = moment(element.ThoiGian).format("HH:mm:ss DD-MM-YYYY");
    });
    return { rows };
  },
  // done
  addNotify: async (Malop, NoiDung, ThoiGian, idUser, idPhucKhao) => {
    const sql = `INSERT INTO public."ThongBao" ("Malop", "NoiDung", "ThoiGian", "idUser", "idPhucKhao")
                VALUES ($1, $2, $3, $4, $5);`;
    const { rows } = await postgre.query(sql, [
      Malop,
      NoiDung,
      ThoiGian,
      idUser,
      idPhucKhao,
    ]);
    return { rows };
  },
};
