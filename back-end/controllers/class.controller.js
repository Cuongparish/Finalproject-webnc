const classM = require("../models/class.models.js");

const nodemailer = require("nodemailer");
require("dotenv").config;

async function hanldSendEmail(EmailAddress_User, MaLop, Role, content) {
  console.log("LOCAL_HOST:", process.env.LOCAL_HOST);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var info = await transporter.sendMail({
    from: `ADMIN <${process.env.EMAIL_USERNAME}>`,
    to: `${EmailAddress_User}`,
    subject: "Invite class",
    text: `${content} ${process.env.LOCAL_HOST}join-class/${MaLop}/${Role}`, // plain text body
    html: `${content} ${process.env.LOCAL_HOST}join-class/${MaLop}/${Role}`,
    // html: `${content} <a href="${process.env.LOCAL_HOST}/join-class/${MaLop}/${Role}">Link</a>`,
  });
  return info;
}

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
      var data = [];
      // chi tiet lop hoc
      const { rows: Detail } = await classM.getDetail_inClass(req, res);

      if (Detail && Detail.length > 0) {
        data.push({ msg: "Detail", data: Detail });
        //res.json({ msg: "Detail", data: rows });
      } else {
        data.push({ msg: "Ma lop ban nhap khong ton tai" });
      }

      // vai tro khi tham gia lop hoc
      const { rows: Role } = await classM.Role_inClass(req, res);

      if (Role && Role.length > 0) {
        data.push({ msg: "Student" });
      } else {
        data.push({ msg: "Teacher" });
      }

      if (data.length > 0) {
        res.json(data);
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
    const iduser = req.body.idUser;
    const malop = req.params.malop;
    try {
      if (req.query.role === "hs") {
        const { rows } = await classM.AddStudent_inClass(iduser, malop);
        return res.json({
          msg: "them hoc sinh vao lop thanh cong",
          data: rows,
        });
      }

      if (req.query.role === "gv") {
        const { rows } = await classM.AddTeacher_inClass(iduser, malop);
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

  addStudentinClass: async (req, res) => {
    const iduser = req.params.id;
    const malop = req.body.MaLop;
    try {
      const { rows } = await classM.AddStudent_inClass(iduser, malop);
      return res.json({
        msg: "them hoc sinh vao lop thanh cong",
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({ msg: "Lỗi thêm user vào lớp học" });
    }
  },

  postSendEmailintoClass: async (req, res) => {
    // const { Email, Malop, Role } = req.body;
    if (!req.body.Email || !req.body.MaLop || !req.body.Role) {
      return res.json({
        errors: [
          {
            msg: "Thiếu trường dữ liệu",
          },
        ],
      });
    }
    var content = "Bạn đã được mời";
    if (req.body.Role === "hs") {
      content = "Bạn đã được mời tham gia lớp học : ";
    }
    if (req.body.Role === "gv") {
      content = "Bạn đã được mời tham gia cùng dạy : ";
    }
    try {
      var sendEmail = await hanldSendEmail(
        req.body.Email,
        req.body.MaLop,
        req.body.Role,
        content
      );

      return res.json({
        msg: "Gửi lời mời tham gia lớp học thành công",
      });
    } catch (error) {
      console.error("Lỗi khi gửi lời mời tham gia lớp học :", error);
      return res
        .status(500)
        .json({ msg: "Đã xảy ra lỗi khi gửi lời mời tham gia lớp học" });
    }
  },
};

module.exports = classC;
