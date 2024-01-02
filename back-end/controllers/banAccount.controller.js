const notifyM = require("../models/notify.models.js");
const reviewM = require("../models/review.models.js");
const classM = require("../models/class.models.js");
const accountM = require("../models/account.models.js");
const gradeM = require("../models/grade.models.js");
const banAccountM = require("../models/banAccount.models.js");

const banAccountC = {
  // chi tiết đơn phúc khảo
  getAccount: async (req, res) => {
    try {
      const { rows: good } = await accountM.getAll();
      let data = [];
      let data1 = [];
      let data2 = [];

      if (good && good.length > 0) {
        for (const user of good) {
          if (user.Role == null) {
            // console.log("hihi");
            data1.push(user);
          }
        }
        data.push({ msg: "acc good", data: data1 });
      } else {
        res.json({
          errors: [
            {
              msg: "Invalid credentials",
            },
          ],
        });
      }

      const { rows: bad } = await banAccountM.getAll();

      if (bad && bad.length > 0) {
        data.push({ msg: "acc bad", data: bad });
      } else {
        res.json({
          errors: [
            {
              msg: "Invalid credentials",
            },
          ],
        });
      }
      res.json({ msg: "OKkkkk", data: data });
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

  banAccount: async (req, res) => {
    try {
      await banAccountM.addAccount(
        req.body.idUser,
        req.body.ThoiGianKhoa,
        req.body.ThoiHanKhoa
      );
      res.json({ msg: "OKkkkk", data: data });
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

  unbanAccount: async (req, res) => {
    try {
      await banAccountM.removeAccount(req.body.idUser);
      res.json({ msg: "OKkkkk" });
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

  //----------------------------------class
  getAllClass: async (req, res) => {
    try {
      const { rows } = await classM.getAll();

      if (rows && rows.length > 0) {
        res.json({ msg: "Danh sách lớp", data: rows });
      } else {
        res.json({
          errors: [
            {
              msg: "Không có lớp nào hết",
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

  changeState: async (req, res) => {
    try {
      // console.log(1);
      await banAccountM.changeSate(
        req.body.idLop,
        req.body.TenLop,
        req.body.ChuDe,
        req.body.Phong,
        req.body.MaLop,
        req.body.State
      );

      if (req.body.State == 1) {
        res.json({ msg: "Đã mở lại active lớp" });
      } else {
        res.json({ msg: "Đã inactive lớp" });
      }
    } catch (error) {
      // console.log(error);
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

module.exports = banAccountC;
