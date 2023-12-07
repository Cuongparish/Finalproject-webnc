const postgre = require("./database");

module.exports = {
  getStudentClass: async (req, res) => {
    const { rows } = await postgre.query(
      `SELECT "LopHoc".*
    FROM "LopHoc"
    LEFT JOIN "HocSinhLopHoc" ON "LopHoc"."idLop" = "HocSinhLopHoc"."idLop"
    LEFT JOIN "HocSinh" ON "HocSinhLopHoc"."idHocSinh" = "HocSinh"."idHocSinh"
    WHERE "HocSinh"."idUser" = $1;`,
      [req.params.id]
    );
    return { rows };
    // const { rows } = await postgre.query('select * from  where book_id = $1', [req.params.id])
  },

  getTeacherClass: async (req, res) => {
    const { rows } = await postgre.query(
      `SELECT "LopHoc".*
      FROM "LopHoc"
      LEFT JOIN "GiaoVienLopHoc" ON "LopHoc"."idLop" = "GiaoVienLopHoc"."idLop"
      LEFT JOIN "GiaoVien" ON "GiaoVienLopHoc"."idGiaoVien" = "GiaoVien"."idGiaoVien"
      WHERE "GiaoVien"."idUser" = $1;`,
      [req.params.id]
    );
    return { rows };
    // const { rows } = await postgre.query('select * from  where book_id = $1', [req.params.id])
  },

  postCreateClass: async (req, res) => {
    const { rows } = await postgre.query(
      "CALL createclass($1, $2, $3, $4, $5)",
      [
        req.params.id,
        req.body.tenlop,
        req.body.chude,
        req.body.phong,
        req.body.malop,
      ]
    );
    return { rows };
    // const { rows } = await postgre.query('select * from  where book_id = $1', [req.params.id])
  },
};
