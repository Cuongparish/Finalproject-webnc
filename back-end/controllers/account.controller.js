const accountM = require("../models/account.models.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config;

async function hanldSendEmail(EmailAddress_User, newPassword, content) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //console.log(EmailAddress_User);
  var info = await transporter.sendMail({
    from: `ADMIN <${process.env.EMAIL_USERNAME}>`,
    // to: "20120447@student.hcmus.edu.vn",
    // from: process.env.EMAIL_USERNAME,
    to: `${EmailAddress_User}`,
    subject: "Verify",
    text: `${content} ${newPassword}`, // plain text body
    html: `${content}<b>${newPassword}</b>`,
  });
  return info;
}

const accountC = {
  getAll: async (req, res) => {
    try {
      const { rows } = await accountM.getAll();

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

  getUser: async (req, res) => {
    try {
      const { rows } = await accountM.getbyID(req, res);

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

  postLogin: async (req, res) => {
    const { rows } = await accountM.getbyEmail(req.body.Email);

    // console.log(rows[0].Pw);
    // console.log(req.body.Pw);
    if (rows && rows.length > 0) {
      let isMatch = await bcrypt.compare(req.body.Pw, rows[0].Pw);
      if (!isMatch) {
        return res.json({
          errors: [
            {
              msg: "Email or password is invalid",
            },
          ],
        });
      }
    } else {
      return res.json({
        errors: [
          {
            msg: "Email or password is invalid",
          },
        ],
      });
    }
    return res.json({ msg: "OK", data: rows });
  },

  postSignup: async (req, res) => {
    const { Email, Pw, FullName, Sex, DOB, Phone } = req.body;
    if (!Email || !Pw || !FullName || !Sex || !DOB || !Phone) {
      return res.json({
        errors: [
          {
            msg: "Thieu truong du lieu",
          },
        ],
      });
    }
    try {
      //const { rows } = await accountM.addUser(Email, hashedPassword, Role);
      const content = "Mã xác nhận là : ";

      let verify = (Math.random() + 1).toString(36).substring(6);
      var sendEmail = await hanldSendEmail(Email, verify, content);
      return res.json({ msg: "OK", data: verify });
    } catch (error) {
      return res.json({
        errors: [
          {
            msg: "Invalid credentials",
          },
        ],
      });
    }
  },

  postVerify: async (req, res) => {
    const { Email, Pw, FullName, Sex, DOB, Phone } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Pw, salt);

    const { rows } = await accountM.addUser(
      Email,
      hashedPassword,
      FullName,
      Sex,
      DOB,
      Phone
    );
    return res.json({ msg: "OK", data: rows });
  },

  postResetPW: async (req, res) => {
    if (!req.body.Email) {
      return res.json({
        errors: [
          {
            msg: "Thieu truong du lieu",
          },
        ],
      });
    }
    let newPassword = (Math.random() + 1).toString(36).substring(6);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const Email = req.body.Email;
    const { rows } = await accountM.resetPW(Email, hashedPassword);
    const content = "Mật khẩu mới của tài khoản là: ";

    var sendEmail = await hanldSendEmail(Email, newPassword, content);
    return res.json({ msg: "OK", data: rows });
  },

  postEditUser: async (req, res) => {
    const { Email, Pw, DOB, Sex, Phone, StudentId } = req.body;
    const IdUser = req.params.idUser;
    try {
      accountM.editUser(IdUser, Email, Pw, DOB, Sex, Phone, StudentId);
    } catch (error) {
      return res.json({
        errors: [
          {
            msg: "Lỗi hàm editUser",
          },
        ],
      });
    }
  },

  getStudentID: async (req, res) => {
    if (!req.body.idUser) {
      return res.json({ msg: "Không có dữ liệu req.body" });
    }

    try {
      const { rows } = await accountM.getStudentID(req, res);

      if (rows && rows.length > 0) {
        res.json({ msg: "OKkkkk", data: rows });
      } else {
        return res.json({ msg: "Không có StudentID" });
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
};

module.exports = accountC;
