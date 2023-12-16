const postgre = require("./database");
const moment = require("moment");
const excel = require("exceljs");
const path = require("path");
const fs = require("fs");

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

  exporttoExcel_StudentList: async (req, res) => {
    try {
      const query = `SELECT user1."FullName", hs."StudentId"
                    FROM "HocSinh" hs
                    JOIN "HocSinhLopHoc" hslh ON hs."idHocSinh" = hslh."idHocSinh"
                    JOIN "User" user1 ON hs."idUser" = user1."idUser"
                    WHERE hslh."idLop" = $1`;

      const TenLop = await postgre.query(
        `SELECT "TenLop" FROM "LopHoc" WHERE "idLop" = $1`,
        [req.params.idLop]
      );

      const { rows } = await postgre.query(query, [req.params.idLop]);

      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet("Sheet 1");

      // Add headers to the worksheet
      worksheet.columns = [
        { header: "MSSV", key: "StudentId", width: 20 },
        { header: "FullName", key: "FullName", width: 20 },
      ];

      // Add data to the worksheet
      rows.forEach((row) => {
        worksheet.addRow(row);
      });

      // Set headers for the response
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        `attachment;filename=DanhSachLopHocSinh_${TenLop.rows[0].TenLop}.xlsx`
      );

      // Pipe the workbook to the response
      await workbook.xlsx.write(res);

      // End the response
      res.end();
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      res.status(500).send("Internal Server Error");
    }
  },
};
