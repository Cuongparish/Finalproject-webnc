const notifyM = require("../models/notify.models.js");
const reviewM = require("../models/review.models.js");
const classM = require("../models/class.models.js");
const accountM = require("../models/account.models.js");
const gradeM = require("../models/grade.models.js");
const banAccountM = require("../models/banAccount.models.js");

const banAccountC = {
  // --------------------------------user
  // chi tiết đơn phúc khảo
  getAccount: async (req, res) => {
    try {
      const { rows: good } = await accountM.getAll();
      let data = { good: [], bad: [] };

      if (good && good.length > 0) {
        for (const user of good) {
          if (user.Role == null) {
            data.good.push(user);
          }
        }
      }

      const { rows: bad } = await banAccountM.getAll();

      if (bad && bad.length > 0) {
        data.bad = bad;
      }

      if (data.good.length > 0 || data.bad.length > 0) {
        res.json({ msg: "OKkkkk", data });
      } else {
        res.json({
          errors: [{ msg: "No account found or invalid credentials" }],
        });
      }
    } catch (error) {
      res.status(500).json({
        errors: [{ msg: "Internal server error" }],
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

  changeStateStudentID: async (req, res) => {
    try {
      const id = await banAccountM.getIDHS(req.body.IdUser);
      await banAccountM.changeStateStudentID(id, req.body.StudentId);

      await accountM.editUser(
        req.body.IdUser,
        req.body.Email,
        req.body.Pw,
        req.body.DOB,
        req.body.Sex,
        req.body.Phone,
        req.body.StudentId
      );
      if (req.body.StudentId == null) {
        res.json({ msg: "unmaping" });
      } else {
        res.json({ msg: "maping" });
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