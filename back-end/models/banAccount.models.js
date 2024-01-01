const postgre = require("./database");
const moment = require("moment");
module.exports = {
  // lấy idPhucKhao cuối cùng (done)
  getAll: async () => {
    const sql = `SELECT *
                  FROM public."BanAccount" `;

    const rows = await postgre.query(sql);
    return rows;
  },

  addAccount: async (idUser, ThoiGianKhoa, ThoiHanKhoa) => {
    const sql = `INSERT INTO public."BanAccount"(
                "idUser", "ThoiGianKhoa", "ThoiHanKhoa")
                VALUES ($1, $2, $3); `;

    const rows = await postgre.query(sql, [idUser, ThoiGianKhoa, ThoiHanKhoa]);
    return rows;
  },

  removeAccount: async (idUser) => {
    const sql = `DELETE FROM public."BanAccount"
	            WHERE "idUser"=$1; `;

    const rows = await postgre.query(sql, [idUser]);
    return rows;
  },
};
