const postgre = require("./database");
const moment = require("moment");
const excel = require("exceljs");
const path = require("path");
const fs = require("fs");
const fastcsv = require("fast-csv");

module.exports = {
  getAll: async (req, res) => {
    const { rows } = await postgre.query(
      // 'SELECT cd."TenCotDiem", bd."Diem" FROM "BangDiemThanhPhan" bd JOIN "CotDiem" cd ON bd."idCotDiem" = cd."idCotDiem" WHERE bd."idHocSinh" = 100'
      'SELECT * FROM "BangDiemThanhPhan" '
    );
    return { rows };
  },

  getAll_GradeComposition: async () => {
    const { rows } = await postgre.query(
      // 'SELECT cd."TenCotDiem", bd."Diem" FROM "BangDiemThanhPhan" bd JOIN "CotDiem" cd ON bd."idCotDiem" = cd."idCotDiem" WHERE bd."idHocSinh" = 100'
      'SELECT * FROM "CotDiem" '
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

  getPercentScore_inClass: async (idLop) => {
    const { rows } = await postgre.query(
      'select * from "CotDiem" where "idLop"=$1',
      [idLop]
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

    let number = 0;
    for (const score of percentScores) {
      //console.log(score);
      const { rows } = await postgre.query(
        'INSERT INTO public."CotDiem"("idLop", "TenCotDiem", "PhanTramDiem", "Khoa", "AcpPhucKhao") VALUES ($1, $2, $3, $4, $5) RETURNING *;',
        [req.params.idLop, score.TenCotDiem, score.PhanTramDiem, number, number]
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

  updatePercentScore_inClass: async (
    TenCotDiem,
    PhanTramDiem,
    idLop,
    idCotDiem,
    Khoa,
    AcpPhucKhao
  ) => {
    const { rows } = await postgre.query(
      'UPDATE public."CotDiem" SET "TenCotDiem"=$1, "PhanTramDiem"=$2, "Khoa"=$5, "AcpPhucKhao"=$6 WHERE "idLop"=$3 and "idCotDiem"=$4;',
      [TenCotDiem, PhanTramDiem, idLop, idCotDiem, Khoa, AcpPhucKhao]
    );
    return { rows };
  },

  exporttoExcel_StudentList: async (req, res) => {
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
      const csvStream = fastcsv.format({
        headers: ["StudentId", "FullName"],
      });
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
  },

  importtoExcel_StudentList: async (file) => {
    const sql = ` UPDATE "User"
                  SET "FullName" = $2
                  FROM "HocSinh"
                  WHERE "User"."idUser" = "HocSinh"."idUser" AND "HocSinh"."StudentId" = $1`;
    const fileBuffer = file.buffer;
    let data = [];
    let data1 = [];
    let isFirstRow = true;
    let sum = 0;

    // Kiểm tra định dạng file bằng cách kiểm tra đuôi mở rộng
    const fileExtension = file.originalname.split(".").pop().toLowerCase();

    if (fileExtension === "xlsx") {
      // Sử dụng exceljs để đọc dữ liệu từ file xlsx
      const workbook = new excel.Workbook();
      await workbook.xlsx.load(fileBuffer);

      const sheet = workbook.worksheets[0];

      sheet.eachRow({ includeEmpty: false }, (row) => {
        data1.push(row.values);
      });

      for (const row of data1) {
        for (const column of row) {
          if (column) {
            sum += 1;
          }
        }
        break;
      }
      if (sum != 2) {
        throw new Error("Unsupported file format");
      }

      for (const row of data1) {
        if (isFirstRow) {
          isFirstRow = false;
          continue;
        }
        const student = {};
        student["FullName"] = row[1];
        for (const column of row) {
          if (column) {
            student["StudentId"] = column;
          }
        }

        data.push(student);
      }
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
    // console.log(data);

    for (const row of data) {
      //console.log(row.StudentId);
      postgre.query(sql, [row.StudentId, row.FullName]);
    }
  },

  getGradesBoard_inClass: async (idLop, Khoa) => {
    const sql = `
    SELECT
        U."FullName",
        HS."StudentId",
        ARRAY_AGG(BDTP."Diem" ORDER BY CD."idCotDiem") AS "Diem"
    FROM
        public."LopHoc" LH
    JOIN
        public."HocSinhLopHoc" HSLH ON LH."idLop" = HSLH."idLop"
    JOIN
        public."HocSinh" HS ON HSLH."idHocSinh" = HS."idHocSinh"
    JOIN
        public."User" U ON HS."idUser" = U."idUser"
    LEFT JOIN
        public."BangDiemThanhPhan" BDTP ON HSLH."idHocSinh" = BDTP."idHocSinh" AND LH."idLop" = BDTP."idLop"
    LEFT JOIN
        public."CotDiem" CD ON BDTP."idCotDiem" = CD."idCotDiem" AND BDTP."idLop" = CD."idLop"
    WHERE
        LH."idLop" = $1 and CD."Khoa"=$2
    GROUP BY
        U."FullName", HS."StudentId"
    ORDER BY
        U."FullName";
`;

    const { rows } = await postgre.query(sql, [idLop, Khoa]);

    return { rows };
  },

  inputGrade_Student_inClass: async (idHocSinh, idCotDiem, idLop, Diem) => {
    const sql = `INSERT INTO "BangDiemThanhPhan"("idHocSinh", "idCotDiem", "idLop", "Diem") VALUES ($1, $2, $3, $4);`;
    const { rows } = await postgre.query(sql, [
      idHocSinh,
      idCotDiem,
      idLop,
      Diem,
    ]);
    return { rows };
  },

  updateGrade_Student_inClass: async (idHocSinh, idCotDiem, idLop, Diem) => {
    const sql = `UPDATE public."BangDiemThanhPhan" SET "Diem"=$4 WHERE "idHocSinh"=$1 AND "idCotDiem"=$2 AND "idLop"=$3`;
    const { rows } = await postgre.query(sql, [
      idHocSinh,
      idCotDiem,
      idLop,
      Diem,
    ]);
  },

  getGrade_Student_inClass: async (idHocSinh, idCotDiem, idLop) => {
    const sql = `
    SELECT "BangDiemThanhPhan"."idCotDiem"
    FROM
    "BangDiemThanhPhan"
    WHERE
    "BangDiemThanhPhan"."idHocSinh"=$1 AND "BangDiemThanhPhan"."idCotDiem"=$2 AND "BangDiemThanhPhan"."idLop"=$3;
`;
    const { rows } = await postgre.query(sql, [idHocSinh, idCotDiem, idLop]);
    return { rows };
  },

  exporttoExcel_Score: async (req, res) => {
    const sql = `
    SELECT
        "HocSinh"."StudentId",
        "BangDiemThanhPhan"."Diem"
    FROM
        "HocSinhLopHoc"
    JOIN
        "HocSinh" ON "HocSinhLopHoc"."idHocSinh" = "HocSinh"."idHocSinh"
    JOIN
        "BangDiemThanhPhan" ON "HocSinhLopHoc"."idHocSinh" = "BangDiemThanhPhan"."idHocSinh"
    JOIN
        "CotDiem" ON "BangDiemThanhPhan"."idCotDiem" = "CotDiem"."idCotDiem" AND "BangDiemThanhPhan"."idLop" = "CotDiem"."idLop"
    WHERE
        "HocSinhLopHoc"."idLop" = $1
        AND "CotDiem"."TenCotDiem" = $2;`;

    const { rows } = await postgre.query(sql, [
      req.params.idLop,
      req.params.TenCotDiem,
    ]);

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
      { header: "StudentId", key: "StudentId", width: 20 },
      { header: "Grade", key: "Diem", width: 20 },
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
      const csvStream = fastcsv.format({
        headers: ["StudentId", "Grade"],
      });
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
  },

  importtoExcel_Score: async (file, idLop, TenCotDiem, Diem, StudentId) => {
    const fileBuffer = file.buffer;
    let data = [];
    let data1 = [];
    let isFirstRow = true;
    let sum = 0;

    // Kiểm tra định dạng file bằng cách kiểm tra đuôi mở rộng
    const fileExtension = file.originalname.split(".").pop().toLowerCase();

    if (fileExtension === "xlsx") {
      // Sử dụng exceljs để đọc dữ liệu từ file xlsx
      const workbook = new excel.Workbook();
      await workbook.xlsx.load(fileBuffer);

      const sheet = workbook.worksheets[0];

      sheet.eachRow({ includeEmpty: false }, (row) => {
        data1.push(row.values);
      });

      for (const row of data1) {
        for (const column of row) {
          if (column) {
            sum += 1;
          }
        }
        break;
      }
      if (sum != 2) {
        throw new Error("Unsupported file format");
      }

      for (const row of data1) {
        if (isFirstRow) {
          isFirstRow = false;
          continue;
        }
        const student = {};
        student["StudentId"] = row[1];
        for (const column of row) {
          if (column) {
            student["Diem"] = column;
          }
        }

        data.push(student);
      }
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
    // console.log(data);
    let buggg = [];
    for (const row of data) {
      let rows = await postgre.query(
        "CALL addScoreforaStudent($1, $2, $3, $4, $5)",
        [idLop, TenCotDiem, row.Diem, row.StudentId, { out: "p_Result" }]
      );
      // nếu trong file có StudentId không có trong lớp học thì được push vô buggg
      if (rows.rows[0].p_result !== "Success") {
        buggg.push(row.StudentId);
      }
    }
    return { buggg };
  },

  getScore_inClass: async (idHocSinh, idCotDiem, idLop) => {
    const { rows } = await postgre.query(
      'select "Diem" from "BangDiemThanhPhan" where "idHocSinh"=$1 and "idCotDiem"=$2 and "idLop"=$3',
      [idHocSinh, idCotDiem, idLop]
    );
    return { rows };
  },

  getAll_HocSinh: async () => {
    const { rows } = await postgre.query('SELECT * FROM "HocSinh" ');
    return { rows };
  },

  getGradesBoard_inClass_Teacher: async (idLop) => {
    const sql = `
    SELECT
        U."FullName",
        HS."StudentId",
        ARRAY_AGG(BDTP."Diem" ORDER BY CD."idCotDiem") AS "Diem"
    FROM
        public."LopHoc" LH
    JOIN
        public."HocSinhLopHoc" HSLH ON LH."idLop" = HSLH."idLop"
    JOIN
        public."HocSinh" HS ON HSLH."idHocSinh" = HS."idHocSinh"
    JOIN
        public."User" U ON HS."idUser" = U."idUser"
    LEFT JOIN
        public."BangDiemThanhPhan" BDTP ON HSLH."idHocSinh" = BDTP."idHocSinh" AND LH."idLop" = BDTP."idLop"
    LEFT JOIN
        public."CotDiem" CD ON BDTP."idCotDiem" = CD."idCotDiem" AND BDTP."idLop" = CD."idLop"
    WHERE
        LH."idLop" = $1 
    GROUP BY
        U."FullName", HS."StudentId"
    ORDER BY
        U."FullName";
`;

    const { rows } = await postgre.query(sql, [idLop]);

    return { rows };
  },
};
