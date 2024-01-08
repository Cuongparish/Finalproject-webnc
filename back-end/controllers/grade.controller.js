const gradeM = require("../models/grade.models.js");
const notifyM = require("../models/notify.models.js");
const classM = require("../models/class.models.js");
const moment = require("moment");
const excel = require("exceljs");
const path = require("path");
const fs = require("fs");
const fastcsv = require("fast-csv");
const { DateTime } = require("luxon");

const nodemailer = require("nodemailer");
require("dotenv").config;

const gradeC = {
  getAll: async (req, res) => {
    try {
      const { rows } = await gradeM.getAll();

      if (rows && rows.length > 0) {
        res.json({ msg: "OKkkkk", data: rows });
      } else {
        res.json({
          errors: [
            {
              msg: "Invalid credentials",
            },
          ],
        });
      }
    } catch (error) {
      res.json({
        errors: [
          {
            msg: "Invalid credentials",
          },
        ],
      });
    }
  },

  getPercentScore_inClass: async (req, res) => {
    let sum = 0;
    try {
      const { rows } = await gradeM.getPercentScore_inClass(req.params.idLop);

      for (let i = 0; i < rows.length; i++) {
        sum += rows[i].PhanTramDiem;
        // console.log(rows[i].PhanTramDiem);
      }
      // console.log(sum);

      if (rows && rows.length > 0) {
        res.json({ msg: "OKkkkk", data: rows, SUM_PERCENT: sum });
      } else {
        res.json({
          errors: [
            {
              msg: "Bảng điểm thành phần đang trống",
            },
          ],
        });
      }
    } catch (error) {
      res.json({
        errors: [
          {
            msg: "Lỗi",
          },
        ],
      });
    }
  },

  addPercentScore_inClass: async (req, res) => {
    // score.TenCotDiem, score.PhanTramDiem
    if (!req.body.Data) {
      return res.json({ msg: "Không có dữ liệu req.body" });
    }
    try {
      gradeM.addPercentScore_inClass(req, res);
      return res.json({ msg: "Thêm thành công" });
    } catch (error) {
      res.json({
        errors: [
          {
            msg: "Lỗi",
          },
        ],
      });
    }
  },

  delPercentScore_inClass: async (req, res) => {
    if (!req.body.TenCotDiem) {
      return res.json({ msg: "Theo dữ liệu req.body" });
    }

    try {
      const { rows } = await gradeM.getCheckInputData(req, res);
      if (rows && rows.length <= 0) {
        return res.json({ msg: "Không có data" });
      }
      gradeM.delPercentScore_inClass(req, res);

      res.json({ msg: "Xóa thành công thành phần điểm", data: rows });
    } catch (error) {
      res.json({
        errors: [
          {
            msg: "Lỗi khi xóa thành phần điểm",
          },
        ],
      });
    }
  },

  updatePercentScore_inClass: async (req, res) => {
    if (!req.body.TenCotDiem || !req.body.PhanTramDiem || !req.body.idCotDiem) {
      return res.json({ msg: "Theo dữ liệu req.body" });
    }
    let AcpPhucKhao = 0;
    let Khoa = 0;
    try {
      const { rows } = await gradeM.updatePercentScore_inClass(
        req.body.TenCotDiem,
        req.body.PhanTramDiem,
        req.params.idLop,
        req.body.idCotDiem,
        Khoa,
        AcpPhucKhao
      );
      res.json({ msg: "Cập nhật thành công thành phần điểm", data: rows });
    } catch (error) {
      res.json({
        errors: [
          {
            msg: "Lỗi khi cập nhật thành phần điểm",
          },
        ],
      });
    }
  },

  exporttoExcel_StudentList: async (req, res) => {
    try {
      await gradeM.exporttoExcel_StudentList(req, res);
    } catch (error) {
      console.error("Error exporting to Excel/CSV:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  importtoExcel_StudentList: async (req, res) => {
    try {
      await gradeM.importtoExcel_StudentList(req.file);
      res.send("File uploaded successfully!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  getGradesBoard: async (req, res) => {
    try {
      const { rows: header } = await gradeM.getPercentScore_inClass(
        req.params.idLop
      );
      const { rows: gradeBoard } = await gradeM.getGradesBoard_inClass(
        req,
        res
      );
      var data = [];
      let sum = 0;
      const new_header = header.map((comp) => ({
        TenCotDiem: comp.TenCotDiem,
        PhanTramDiem: comp.PhanTramDiem,
        Khoa: comp.Khoa,
      }));

      let final_header = [];
      for (let i = 0; i < new_header.length; i++) {
        console.log(new_header[i].Khoa);
        if (new_header[i].Khoa == 1) {
          final_header.push(new_header[i]);
        }
      }

      // console.log(final_header);

      for (let i = 0; i < gradeBoard.length; i++) {
        const student = gradeBoard[i];

        for (let k = 0; k < final_header.length; k++) {
          const percent = final_header[k];
          if (student.Diem[k] != null) {
            sum += (student.Diem[k] * percent.PhanTramDiem) / 100;
          } else {
            sum += 0;
          }
        }
        sum = Number(sum.toFixed(2));
        if (sum > 10) {
          sum = 10;
        }
        student.total = sum;
        sum = 0;
      }

      data.push({ msg: "header", data: final_header });
      data.push({ msg: "Grade_Board", data: gradeBoard });

      res.json({ data });
    } catch (error) {
      console.log(error);
      res.json({
        errors: [
          {
            msg: "Lỗi",
          },
        ],
      });
    }
  },

  addScore_Student_inClass: async (req, res) => {
    // score.TenCotDiem, score.PhanTramDiem

    if (!req.body) {
      return res.json({ msg: "Theo dữ liệu req.body" });
    }
    let AllScore = req.body.Data;
    console.log(AllScore);
    try {
      //nếu chưa có điểm thì thêm
      //sửa điểm hoặc xóa điểm
      for (score of AllScore) {
        const { rows: Diem } = await gradeM.getGrade_Student_inClass(
          score.idHocSinh,
          score.idCotDiem,
          score.idLop
        );
        if (!Diem) {
          await gradeM.inputGrade_Student_inClass(
            score.idHocSinh,
            score.idCotDiem,
            score.idLop,
            score.Diem
          );
        } else {
          await gradeM.updateGrade_Student_inClass(
            score.idHocSinh,
            score.idCotDiem,
            score.idLop,
            score.Diem
          );
        }
      }

      res.json({ msg: "Thêm thành công" });
    } catch (error) {
      res.json({
        errors: [
          {
            msg: "Lỗi",
          },
        ],
      });
    }
  },

  exporttoExcel_Score: async (req, res) => {
    try {
      await gradeM.exporttoExcel_Score(req, res);
    } catch (error) {
      console.error("Error exporting to Excel/CSV:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  importtoExcel_Score: async (req, res) => {
    if (!req.body) {
      return res.json({ msg: "Không có dữ liệu req.body" });
    }

    try {
      const { rows } = await gradeM.importtoExcel_Score(
        req.file,
        req.body.idLop,
        req.body.TenCotDiem
      );
      res.json({ msg: "File uploaded successfully!", data: rows });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  exporttoExcel_FullScore: async (req, res) => {
    try {
      const { rows: header } = await gradeM.getPercentScore_inClass(
        req.params.idLop
      );
      const { rows: gradeBoard } = await gradeM.getGradesBoard_inClass(
        req,
        res
      );
      var data = [];
      let sum = 0;
      const new_header = header.map((comp) => ({
        TenCotDiem: comp.TenCotDiem,
        PhanTramDiem: comp.PhanTramDiem,
      }));

      for (let i = 0; i < gradeBoard.length; i++) {
        const student = gradeBoard[i];

        for (let k = 0; k < new_header.length; k++) {
          const percent = new_header[k];
          if (student.Diem[k] != null) {
            sum += (student.Diem[k] * percent.PhanTramDiem) / 100;
          } else {
            sum += 0;
          }
        }
        sum = Number(sum.toFixed(3));
        student.total = sum;
        sum = 0;
      }

      data.push({ msg: "header", data: new_header });
      data.push({ msg: "Grade_Board", data: gradeBoard });

      if (gradeBoard && gradeBoard.length <= 0) {
        return res.json({ msg: "Lớp học chưa có học sinh vào tham dự" });
      }

      // Determine the desired format (xlsx or csv)
      const format = req.query.format || "xlsx";

      // Create a new workbook and worksheet
      const workbook = new excel.Workbook();
      const worksheet = workbook.addWorksheet("Sheet 1");

      // Add headers to the worksheet
      const headerColumns = [
        { header: "FullName", key: "FullName", width: 20 },
        { header: "StudentId", key: "StudentId", width: 20 },
        ...new_header.map((comp) => ({
          header: comp.TenCotDiem,
          key: comp.TenCotDiem,
          width: 20,
        })),
        { header: "Total", key: "total", width: 20 },
      ];

      worksheet.columns = headerColumns;

      gradeBoard.forEach((student) => {
        const row = {
          FullName: student.FullName,
          StudentId: student.StudentId,
          ...student.Diem.reduce((acc, diem, index) => {
            const tenCotDiem = new_header[index].TenCotDiem;
            acc[tenCotDiem] = diem;
            return acc;
          }, {}),
          total: student.total,
        };

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
        const csvHeaders = [
          "FullName",
          "StudentId",
          ...new_header.map((comp) => comp.TenCotDiem),
          "total",
        ];

        // Đặt header cho file CSV
        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          `attachment;filename=DanhSachHocSinh.csv`
        );

        const csvStream = fastcsv.format({ headers: csvHeaders });
        csvStream.pipe(res);

        gradeBoard.forEach((student) => {
          const csvRow = {
            FullName: student.FullName,
            StudentId: student.StudentId,
            ...student.Diem.reduce((acc, diem, index) => {
              const tenCotDiem = new_header[index].TenCotDiem;
              acc[tenCotDiem] = diem;
              return acc;
            }, {}),
            total: student.total,
          };
          csvStream.write(csvRow);
        });

        csvStream.end();
      } else {
        return res.status(400).json({ msg: "Invalid format specified" });
      }

      // End the response
      res.end();

      // res.json({ data });
    } catch (error) {
      res.json({
        errors: [
          {
            msg: "Lỗi",
          },
        ],
      });
    }
  },

  publicScore_inClass: async (req, res) => {
    // score.TenCotDiem, score.PhanTramDiem
    let Khoa = 1;
    let AcpPhucKhao = 1;
    try {
      // cập nhật cho công bố điểm + được quyền phúc khảo
      await gradeM.updatePercentScore_inClass(
        req.body.TenCotDiem,
        req.body.PhanTramDiem,
        req.params.idLop,
        req.body.idCotDiem,
        Khoa,
        AcpPhucKhao
      );

      // gửi thông báo đến các học sinh rằng đã có điểm 1 thành phần
      let NoiDung = `Điểm ${req.body.TenCotDiem} đã được công bố `;
      const { rows } = await classM.getStudent_inClass(req.body.malop);
      for (user of rows) {
        await notifyM.addNotify(
          req.body.Malop,
          NoiDung,
          ThoiGian,
          user.idUser,
          null
        );
      }

      res.json({
        msg: "Đã công bố thành công và được phép phúc khảo thành phần điểm",
      });
    } catch (error) {
      res.json({
        errors: [
          {
            msg: "Lỗi",
          },
        ],
      });
    }
  },

  // đóng phúc khảo 1 thành phần điểm
  closeReview: async (req, res) => {
    let Khoa = 1;
    let AcpPhucKhao = 0;
    // let TenCotDiem;
    try {
      //lấy tên lớp học
      const NameClass = await classM.getNameClass(req.params.idLop);
      console.log(NameClass.rows[0].TenLop);

      // lấy tên cột điểm
      const NameGradeComposition = await gradeM.getAll_GradeComposition();
      for (grade of NameGradeComposition.rows) {
        // console.log(grade.idCotDiem);
        if (grade.idCotDiem == req.body.idCotDiem) {
          var TenCotDiem = grade.TenCotDiem;
        }
      }

      // thông báo đến học sinh
      let Notify_NoiDung_Student = `Cột điểm ${TenCotDiem} của lớp ${NameClass.rows[0].TenLop} đã khóa, bạn không thể phúc khảo nữa`;
      var idd;
      const { rows: idLop } = await classM.getAll();

      for (const id of idLop) {
        if (id.idLop == req.params.idLop) {
          idd = id.MaLop;
          console.log(idd);
          break;
        }
      }

      const { rows: studentRows } = await classM.getStudent_inClass(idd);

      if (studentRows && studentRows.length < 0) {
        return res.json({
          msg: "Không có học sinh nào trong lớp này",
        });
      }
      let idPK = null;
      for (const user of studentRows) {
        await notifyM.addNotify(
          req.params.idLop,
          Notify_NoiDung_Student,
          req.body.ThoiGian,
          user.idUser,
          idPK
        );
      }

      // cập nhật không cho phúc khảo nữa
      await gradeM.closeReview(
        req.params.idLop,
        req.body.idCotDiem,
        AcpPhucKhao
      );

      return res.json({
        msg: "cập nhật không cho phúc khảo nữa",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        errors: [
          {
            msg: "Lỗi",
          },
        ],
      });
    }
  },
};

module.exports = gradeC;
