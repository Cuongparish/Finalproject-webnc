const postgre = require("./database");
const moment = require("moment");
module.exports = {
  // --------------------------------------user
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

  changeStateStudentID: async (idHocSinh, StudentId) => {
    const sql = `	UPDATE public."HocSinh"
                  SET  "StudentId"=$2
                  WHERE "idHocSinh"=$1;`;

    await postgre.query(sql, [idHocSinh, StudentId]);
  },

  // --------------------------------------class
  changeSate: async (idLop, TenLop, ChuDe, Phong, MaLop, State) => {
    const sql = `	UPDATE public."LopHoc"
                  SET "TenLop"=$2, "ChuDe"=$3, "Phong"=$4, "MaLop"=$5, "State"=$6
                  WHERE "idLop"=$1;`;

    await postgre.query(sql, [idLop, TenLop, ChuDe, Phong, MaLop, State]);
  },
};
