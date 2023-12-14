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
    try {
      const { rows } = await gradeM.getPercentScore_inClass(req, res);

      if (rows && rows.length > 0) {
        res.json({ msg: "OKkkkk", data: rows });
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
};

module.exports = accountC;
