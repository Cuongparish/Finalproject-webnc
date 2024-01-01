const postgre = require("./database");
const moment = require("moment");
module.exports = {
  //--------------------------------------Teacher------------------------
  // lấy danh sách các đơn phúc khảo của học sinh gửi đến giáo viên (done)
  getReview_Teacher: async (req, res) => {
    const sql = `select *
              from "PhucKhao" pk
              where pk."idLop"=$1
              ORDER BY pk."idPhucKhao" DESC;`;
    const { rows } = await postgre.query(sql, [req.params.idLop]);
    return { rows };
  },

  //--------------------------------------Student------------------------

  // lấy idPhucKhao cuối cùng (done)
  getLastReview: async () => {
    const sql = `SELECT *
                  FROM public."PhucKhao" 
                  ORDER BY "idPhucKhao" DESC
                  LIMIT 1;`;

    const rows = await postgre.query(sql);
    return rows;
  },

  // tạo đơn phúc khảo
  addReview_Student: async (
    ThoiGian,
    DiemMongMuon,
    NoiDung,
    idCotDiem,
    idLop
  ) => {
    const sql = ` INSERT INTO public."PhucKhao" ("ThoiGian", "DiemMongMuon", "NoiDung", "idCotDiem", "idLop")
                VALUES ($1, $2, $3, $4, $5);`;
    const { rows } = await postgre.query(sql, [
      ThoiGian,
      DiemMongMuon,
      NoiDung,
      idCotDiem,
      idLop,
    ]);
    return { rows };
  },

  getReview_Student: async (idPhucKhao) => {
    const sql = `select* 
                from "PhucKhao"
                where "idPhucKhao"=$1`;
    const { rows } = await postgre.query(sql, [idPhucKhao]);
    return { rows };
  },
};
