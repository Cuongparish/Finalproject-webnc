const postgre = require("./database");
const moment = require("moment");
const excel = require("exceljs");
const path = require("path");
const fs = require("fs");
const fastcsv = require("fast-csv");
const multer = require("multer");

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
    const percentScores = req.body.Data;
    const results = [];

    if (!Array.isArray(percentScores)) {
      console.log(percentScores);
      //return res.status(400).json({ error: "Invalid data format" });
    }

    for (const score of percentScores) {
      console.log(score);
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

  // exporttoExcel_StudentList: async (req, res) => {
  //   try {
  //     const query = `SELECT user1."FullName", hs."StudentId"
  //                   FROM "HocSinh" hs
  //                   JOIN "HocSinhLopHoc" hslh ON hs."idHocSinh" = hslh."idHocSinh"
  //                   JOIN "User" user1 ON hs."idUser" = user1."idUser"
  //                   WHERE hslh."idLop" = $1`;

  //     // const TenLop = await postgre.query(
  //     //   `SELECT "TenLop" FROM "LopHoc" WHERE "idLop" = $1`,
  //     //   [req.params.idLop]
  //     // );

  //     const { rows } = await postgre.query(query, [req.params.idLop]);

  //     const workbook = new excel.Workbook();
  //     const worksheet = workbook.addWorksheet("Sheet 1");

  //     // Add headers to the worksheet
  //     worksheet.columns = [
  //       { header: "MSSV", key: "StudentId", width: 20 },
  //       { header: "FullName", key: "FullName", width: 20 },
  //     ];
  //     if (rows && rows.length <= 0) {
  //       return res.json({ msg: "Lớp học chưa có học sinh vào tham dự" });
  //     }
  //     // Add data to the worksheet
  //     rows.forEach((row) => {
  //       worksheet.addRow(row);
  //     });
  //     req.query.format;
  //     // Set headers for the response
  //     res.setHeader(
  //       "Content-Type",
  //       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //     );
  //     res.setHeader(
  //       "Content-Disposition",
  //       `attachment;filename=DanhSachHocSinh.xlsx`
  //     );

  //     // Pipe the workbook to the response
  //     await workbook.xlsx.write(res);

  //     // End the response
  //     res.end();
  //   } catch (error) {
  //     console.error("Error exporting to Excel:", error);
  //     res.status(500).send("Internal Server Error");
  //   }
  // },

  exporttoExcel_StudentList: async (req, res) => {
    try {
      const query = `SELECT user1."FullName", hs."StudentId"
                      FROM "HocSinh" hs
                      JOIN "HocSinhLopHoc" hslh ON hs."idHocSinh" = hslh."idHocSinh"
                      JOIN "User" user1 ON hs."idUser" = user1."idUser"
                      WHERE hslh."idLop" = $1`;

      const { rows } = await postgre.query(query, [req.params.idLop]);

      // Check if there are no rows
      if (rows && rows.length <= 0) {
        return res.json({ msg: "Lớp học chưa có học sinh vào tham dự" });
      }

      // Determine the desired format (xlsx or csv)
      const format = req.query.format || "xlsx";

      // Create a new workbook and worksheet
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

      // Set headers for the response based on the format
      if (format === "xlsx") {
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
          "Content-Disposition",
          `attachment;filename=DanhSachHocSinh.xlsx`
        );

        // Pipe the workbook to the response
        await workbook.xlsx.write(res);
      } else if (format === "csv") {
        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          `attachment;filename=DanhSachHocSinh.csv`
        );

        // Pipe the worksheet to the response as CSV
        const csvStream = fastcsv.format({ headers: true });
        csvStream.pipe(res);

        rows.forEach((row) => {
          csvStream.write(row);
        });

        csvStream.end();
      } else {
        return res.status(400).json({ msg: "Invalid format specified" });
      }

      // End the response
      res.end();
    } catch (error) {
      console.error("Error exporting to Excel/CSV:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  importtoExcel_StudentList: async (req, res) => {
    try {
      const fileBuffer = req.file.buffer;
      let data = [];

      // Kiểm tra định dạng file bằng cách kiểm tra đuôi mở rộng
      const fileExtension = req.file.originalname
        .split(".")
        .pop()
        .toLowerCase();

      if (fileExtension === "xlsx") {
        // Sử dụng exceljs để đọc dữ liệu từ file xlsx
        const workbook = new excel.Workbook();
        await workbook.xlsx.load(fileBuffer);

        const sheet = workbook.worksheets[0];

        sheet.eachRow({ includeEmpty: false }, (row) => {
          data.push(row.values);
        });
      } else if (fileExtension === "csv") {
        // Sử dụng fast-csv để đọc dữ liệu từ file CSV
        data = await new Promise((resolve, reject) => {
          const parsedData = [];
          fastcsv
            .parseString(fileBuffer.toString(), {
              headers: true,
              ignoreEmpty: true,
            })
            .on("data", (row) => {
              parsedData.push(row);
            })
            .on("end", () => {
              resolve(parsedData);
            })
            .on("error", (error) => {
              reject(error);
            });
        });
      } else {
        throw new Error("Unsupported file format");
      }

      // In dữ liệu ra console
      console.log(data);

      res.send("File uploaded successfully!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};
