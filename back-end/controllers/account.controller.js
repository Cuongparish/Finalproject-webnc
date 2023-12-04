// const postgre = require("../models/database");
// const userController = {
//   getAll: async (req, res) => {
//     try {
//       const { rows } = await postgre.query('select * from "User"');
//       res.json({ msg: "OK", data: rows });
//     } catch (error) {
//       res.json({ msg: error.msg });
//     }
//   },
//   getById: async(req, res) => {
//       try {
//           const { rows } = await postgre.query('select * from  where book_id = $1', [req.params.id])

//           if (rows[0]) {
//               return res.json({msg: "OK", data: rows})
//           }

//           res.status(404).json({msg: "not found"})
//       } catch (error) {
//           res.json({msg: error.msg})
//       }
//   },
//   create: async (req, res) => {
//     try {
//       const { Email, Pw, Role } = req.body;

//       const sql =
//         'INSERT INTO "User"(Email, Pw, Role) VALUES($1, $2, $3) RETURNING *';
//         `INSERT INTO "User"(
//           "Email", "Pw", "Role")
//           VALUES ($1, $2, $3) RETURNING *`;

//       const { rows } = await postgre.query(sql, [Email, Pw, Role]);

//       res.json({ msg: "OK", data: rows[0] });
//     } catch (error) {
//       res.json({ msg: error.msg });
//     }
//   },
//   updateById: async(req, res) => {
//       try {
//           const { name, price } = req.body

//           const sql = 'UPDATE books set name = $1, price = $2 where book_id = $3 RETURNING *'

//           const { rows } = await postgre.query(sql, [name, price, req.params.id])

//           res.json({msg: "OK", data: rows[0]})

//       } catch (error) {
//           res.json({msg: error.msg})
//       }
//   },
//   deleteById: async(req, res) => {
//       try {
//           const sql = 'DELETE FROM books where book_id = $1 RETURNING *'

//           const { rows } = await postgre.query(sql, [req.params.id])

//           if (rows[0]) {
//               return res.json({msg: "OK", data: rows[0]})
//           }

//           return res.status(404).json({msg: "not found"})

//       } catch (error) {
//           res.json({msg: error.msg})
//       }
//   }
// };

// module.exports = userController;

const accountM = require("../models/account.models.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config;

async function hanldSendEmail(EmailAddress_User, newPassword, content) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //console.log(EmailAddress_User);
  var info = await transporter.sendMail({
    from: `ADMIN ${EmailAddress_User}`,
    to: process.env.EMAIL_USERNAME,

    // from: process.env.EMAIL_USERNAME,
    // to: `${EmailAddress_User}`,
    subject: "Reset Password",
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
    const { Email, Pw, Role } = req.body;
    if (!Email || !Pw) {
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
    const { Email, Pw, Role } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Pw, salt);
    const { rows } = await accountM.addUser(Email, hashedPassword, Role);

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
    const { IdUser, Email, Pw, Role } = req.body;
    try {
      const { rows } = await accountM.editUser(IdUser, Email, Pw, Role);

      if (rows && rows.length > 0) {
        return res.json({ msg: "OK", data: rows });
      } else {
        return res.json({
          errors: [
            {
              msg: "Invalid credentials",
            },
          ],
        });
      }
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
};

module.exports = accountC;
