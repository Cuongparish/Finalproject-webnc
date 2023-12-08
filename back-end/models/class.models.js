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

  postCreateClass: async (req, res, malop) => {
    const { rows } = await postgre.query(
      "CALL createclass($1, $2, $3, $4, $5)",
      [
        req.params.id,
        req.body.TenLop,
        req.body.ChuDe,
        req.body.Phong,
        malop,
      ]
    );
    return { rows };
  },

  getStudent_inClass: async (req, res) => {
    const { rows } = await postgre.query(
      `SELECT "User".*
      FROM "HocSinh"
      JOIN "HocSinhLopHoc" ON "HocSinh"."idHocSinh" = "HocSinhLopHoc"."idHocSinh"
      JOIN "LopHoc" ON "HocSinhLopHoc"."idLop" = "LopHoc"."idLop"
      JOIN "User" ON "HocSinh"."idUser" = "User"."idUser" 
      WHERE "LopHoc"."MaLop" = $1;`,
      [req.params.malop]
    );
    return { rows };
  },

  getTeacher_inClass: async (req, res) => {
    const { rows } = await postgre.query(
      `SELECT "User".*
      FROM "GiaoVien"
      JOIN "GiaoVienLopHoc" ON "GiaoVien"."idGiaoVien" = "GiaoVienLopHoc"."idGiaoVien"
      JOIN "LopHoc" ON "GiaoVienLopHoc"."idLop" = "LopHoc"."idLop"
      JOIN "User" ON "GiaoVien"."idUser" = "User"."idUser" 
      WHERE "LopHoc"."MaLop" = $1;`,
      [req.params.malop]
    );
    return { rows };
  },

  getDetail_inClass: async (req, res) => {
    const { rows } = await postgre.query(
      `SELECT "LopHoc".*
      FROM "LopHoc"
      WHERE "LopHoc"."MaLop" = $1;`,
      [req.params.malop]
    );
    return { rows };
  },

  AddStudent_inClass: async (req, res) => {
    const { rows } = await postgre.query("CALL addstudent($1, $2)", [
      req.body.idUser,
      req.params.malop,
    ]);
    return { rows };
  },

  AddTeacher_inClass: async (req, res) => {
    const { rows } = await postgre.query("CALL addteacher($1, $2)", [
      req.body.idUser,
      req.params.malop,
    ]);
    return { rows };
  },
};
