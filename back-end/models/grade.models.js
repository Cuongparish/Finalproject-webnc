const postgre = require("./database");
const moment = require("moment");
module.exports = {
  getAll: async (req, res) => {
    const { rows } = await postgre.query(
      'SELECT cd."TenCotDiem", bd."Diem" FROM "BangDiemThanhPhan" bd JOIN "CotDiem" cd ON bd."idCotDiem" = cd."idCotDiem" WHERE bd."idHocSinh" = 100'
    );
    return { rows };
  },

  getCheckInputData: async (req, res) => {
    const { rows } = await postgre.query(
      'select * from "CotDiem" where "TenCotDiem"=$1 and "idLop"=$2',
      [req.body.TenCotDiem, req.params.idLop]
    );
    return { rows };
  },

  getPercentScore_inClass: async (req, res) => {
    const { rows } = await postgre.query(
      'select * from "CotDiem" where "idLop"=$1',
      [req.params.idLop]
    );
    return { rows };
  },

  addPercentScore_inClass: async (req, res) => {
    const percentScores = req.body;
    const results = [];
    for (const score of percentScores) {
      const { rows } = await postgre.query(
        'INSERT INTO public."CotDiem"("idLop", "TenCotDiem", "PhanTramDiem") VALUES ($1, $2, $3) RETURNING *;',
        [req.params.idLop, score.TenCotDiem, score.PhanTramDiem]
      );
      results.push(rows);
      // const { rows } = await postgre.query(
      //   'INSERT INTO public."CotDiem"("idLop", "TenCotDiem", "PhanTramDiem") VALUES ($1, $2, $3) RETURNING *;',
      //   [req.params.idLop, req.body.TenCotDiem, req.body.PhanTramDiem]
      // );
    }
    return { data: results };
  },

  delPercentScore_inClass: async (req, res) => {
    const { rows } = await postgre.query(
      'DELETE FROM public."CotDiem" WHERE "TenCotDiem"=$1 and "idLop"=$2;',
      [req.body.TenCotDiem, req.params.idLop]
    );
    return { rows };
  },

  updatePercentScore_inClass: async (req, res) => {
    const { rows } = await postgre.query(
      'UPDATE public."CotDiem" SET "TenCotDiem"=$1, "PhanTramDiem"=$2 WHERE "idLop"=$3 and "idCotDiem"=$4;',
      [
        req.body.TenCotDiem,
        req.body.PhanTramDiem,
        req.params.idLop,
        req.body.idCotDiem,
      ]
    );
    return { rows };
  },
};
