const postgre = require("./database");
const moment = require("moment");
module.exports = {
  // --------------------------------------user
  // lấy idPhucKhao cuối cùng (done)
  getAll: async () => {
    const sql = `SELECT *
    FROM public."BanAccount" , "User"
    WHERE "BanAccount"."idUser"="User"."idUser"
    ORDER BY "User"."idUser" ASC`;

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

  getIDHS: async (idUser) => {
    const sql = `	SELECT "idHocSinh"
                  FROM "HocSinh"
                  WHERE "idUser"=$1;`;

    await postgre.query(sql, [idUser]);
  },

  mapStudentID: async (data) => {
    const sql = ` UPDATE "HocSinh"
    SET "StudentId" = $1
    FROM "User"
    WHERE "User"."idUser" = "HocSinh"."idUser" AND "User"."Email" = $2`;

    for (const row of data) {
      //console.log(row.StudentId);
      postgre.query(sql, [row.StudentId, row.Email]);
    }
  },

  // --------------------------------------class
  changeSate: async (idLop, TenLop, ChuDe, Phong, MaLop, State) => {
    const sql = `	UPDATE public."LopHoc"
                  SET "TenLop"=$2, "ChuDe"=$3, "Phong"=$4, "MaLop"=$5, "State"=$6
                  WHERE "idLop"=$1;`;

    await postgre.query(sql, [idLop, TenLop, ChuDe, Phong, MaLop, State]);
  },
};
