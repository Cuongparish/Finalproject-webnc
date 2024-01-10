const postgre = require("./database");
const moment = require("moment");
module.exports = {
  // đóng không cho phúc khảo nữa (done)
  repliesReview: async (idPhucKhao, idUser, TraoDoi, ThoiGian) => {
    const sql = `INSERT INTO public."NoiDungTraoDoi"(
                "idPhucKhao", "idUser", "TraoDoi", "ThoiGian")
                VALUES ($1, $2, $3, $4);`;
    await postgre.query(sql, [idPhucKhao, idUser, TraoDoi, ThoiGian]);
  },

  // lấy danh sách các đơn phúc khảo
  getReview: async (req, res) => {
    const sql = `select *
                from "PhucKhao" pk
                ORDER BY pk."idPhucKhao" DESC;`;
    const { rows } = await postgre.query(sql);
    return { rows };
  },

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

  // đóng không cho phúc khảo nữa (done)
  closeReview: async (idLop, idCotDiem, AcpPhucKhao) => {
    const { rows } = await postgre.query(
      'UPDATE public."CotDiem" SET  "AcpPhucKhao"=$3 WHERE "idLop"=$1 and "idCotDiem"=$2;',
      [idLop, idCotDiem, AcpPhucKhao]
    );
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
      HoanThanh,
    ]);
    return { rows };
  },

  // danh sách các đơn phúc khảo của 1 học sinh
  getReview_Student: async (idPhucKhao) => {
    const sql = `select* 
                from "PhucKhao"
                where "idPhucKhao"=$1`;
    const { rows } = await postgre.query(sql, [idPhucKhao]);
    return { rows };
  },
};
