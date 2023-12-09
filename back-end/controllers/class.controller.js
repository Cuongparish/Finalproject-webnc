const classM = require("../models/class.models.js");

require("dotenv").config;

const classC = {
  getClass: async (req, res) => {
    try {
      const { rows: teacherRows } = await classM.getTeacherClass(req, res);
      var data = [];

      if (teacherRows && teacherRows.length > 0) {
        data.push({ msg: "Teacher", data: teacherRows });
      } else {
        data.push({ msg: "Teacher empty" });
      }

      const { rows: studentRows } = await classM.getStudentClass(req, res);

      if (studentRows && studentRows.length > 0) {
        data.push({ msg: "Student", data: studentRows });
      } else {
        data.push({ msg: "Student empty" });
      }

      if (data.length > 0) {
        res.json(data);
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

  postCreateClass: async (req, res) => {
    try {
      let malop = (Math.random() + 1).toString(36).substring(6);
      const { rows } = await classM.postCreateClass(req, res, malop);
      return res.json({ msg: "Tạo lớp học thành công", data: malop });
    } catch (error) {
      console.error("Lỗi khi tạo lớp:", error);
      return res.status(500).json({ msg: "Đã xảy ra lỗi khi tạo lớp" });
    }
  },

  getListUserinClass: async (req, res) => {
    try {
      const { rows: teacherRows } = await classM.getTeacher_inClass(req, res);
      var data = [];

      if (teacherRows && teacherRows.length > 0) {
        data.push({ msg: "Teacher", data: teacherRows });
      } else {
        data.push({ msg: "Teacher empty" });
      }

      const { rows: studentRows } = await classM.getStudent_inClass(req, res);

      if (studentRows && studentRows.length > 0) {
        data.push({ msg: "Student", data: studentRows });
      } else {
        data.push({ msg: "Student empty" });
      }

      if (data.length > 0) {
        res.json(data);
      }
    } catch (error) {
      res.json({
        errors: [
          {
            msg: "Lấy danh sách thất bại",
          },
        ],
      });
    }
  },

  getDetailinClass: async (req, res) => {
    try {
      const { rows } = await classM.getDetail_inClass(req, res);

      if (rows && rows.length > 0) {
        res.json({ msg: "Detail", data: rows });
      } else {
        res.json({
          errors: [
            {
              msg: "Ma lop ban nhap khong ton tai",
            },
          ],
        });
      }
    } catch (error) {
      res.json({
        errors: [
          {
            msg: "Lay danh sach that bai",
          },
        ],
      });
    }
  },

  addUserinClass: async (req, res) => {
    // const { iduser, tenlop, chude, phong, malop } = req.body;
    try {
      if (req.query.role === "hs") {
        const { rows } = await classM.AddStudent_inClass(req, res);
        return res.json({
          msg: "them hoc sinh vao lop thanh cong",
          data: rows,
        });
      }

      if (req.query.role === "gv") {
        const { rows } = await classM.AddTeacher_inClass(req, res);
        return res.json({
          msg: "them giao vien vao lop thanh cong",
          data: rows,
        });
      }
    } catch (error) {
      //console.error("Lỗi :", error);
      return res.status(500).json({ msg: "Lỗi thêm user vào lớp học" });
    }
  },
};

module.exports = classC;