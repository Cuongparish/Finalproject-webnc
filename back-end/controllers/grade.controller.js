const gradeM = require("../models/grade.models.js");

const nodemailer = require("nodemailer");
require("dotenv").config;

const accountC = {
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
      const { rows } = await gradeM.getPercentScore_inClass(req, res);

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
      return res.json({ msg: "Theo dữ liệu req.body" });
    }
    try {
      gradeM.addPercentScore_inClass(req, res);
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

    try {
      const { rows } = await gradeM.updatePercentScore_inClass(req, res);
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
    // const directory = "D:/";

    // return res.json({ msg: "Xuất file danh sách học sinh thành công" });
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
};

module.exports = accountC;
