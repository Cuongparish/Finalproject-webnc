const notifyM = require("../models/notify.models.js");
const reviewM = require("../models/review.models.js");
const classM = require("../models/class.models.js");
const accountM = require("../models/account.models.js");
const gradeM = require("../models/grade.models.js");
const banAccountM = require("../models/banAccount.models.js");
const excel = require("exceljs");
const fastcsv = require("fast-csv");

const banAccountC = {
  // --------------------------------user
  // chi tiết đơn phúc khảo

  getAccount: async (req, res) => {
    try {
      const { rows: good } = await accountM.getAll();
      const { rows: bad } = await banAccountM.getAll();

      let data = { good: [], bad: [] };
      let count = 0;

      if (good && good.length > 0) {
        for (const user of good) {
          if (
            user.Role == null &&
            !bad.some((user_bad) => user.idUser === user_bad.idUser)
          ) {
            data.good.push(user);
          }
        }
      }

      if (bad && bad.length > 0) {
        data.bad = bad;
      }

      if (data.good.length > 0 || data.bad.length > 0) {
        return res.json({ msg: "OKkkkk", data });
      } else {
        return res.json({
          errors: [{ msg: "No account found or invalid credentials" }],
        });
      }
    } catch (error) {
      console.log(error);
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
      return res.json({ msg: "OKkkkk", data: data });
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

  unbanAccount: async (req, res) => {
    try {
      await banAccountM.removeAccount(req.body.idUser);
      return res.json({ msg: "OKkkkk" });
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

  changeStateStudentID: async (req, res) => {
    try {
      const id = await banAccountM.getIDHS(req.body.idUser);

      // kiểm tra xem StudentId này đã có người sử dụng hay chưa
      const { rows } = await accountM.getAll();
      for (user of rows) {
        if (
          user.StudentId != null &&
          user.StudentId == req.body.StudentId &&
          user.idUser != req.body.idUser
        ) {
          return res.json({ msg: "StudentId nãy đã có người sử dụng" });
        }
      }

      // dùng để unmapping
      if (id.length > 0) {
        await banAccountM.changeStateStudentID(
          id[0].idHocSinh,
          req.body.StudentId
        );
      }
      // dùng để remapping
      await accountM.editUser(
        req.body.idUser,
        req.body.Email,
        req.body.Pw,
        req.body.FullName,
        req.body.DOB,
        req.body.Sex,
        req.body.Phone,
        req.body.StudentId
      );

      if (req.body.StudentId == null) {
        return res.json({ msg: "unmaping" });
      } else {
        return res.json({ msg: "maping" });
      }
    } catch (error) {
      // console.log(error);
      return res.json({
        errors: [
          {
            msg: "Invalid credentials",
          },
        ],
      });
    }
  },

  mapStudentID: async (req, res) => {
    try {
      const fileBuffer = req.file.buffer;
      let data = [];
      let data1 = [];
      let isFirstRow = true;
      let sum = 0;

      // Kiểm tra định dạng file bằng cách kiểm tra đuôi mở rộng
      const fileExtension = req.file.originalname
        .split(".")
        .pop()
        .toLowerCase();

      if (fileExtension === "xlsx") {
        // Sử dụng exceljs để đọc dữ liệu từ file xlsx
        const workbook = new excel.Workbook();
        await workbook.xlsx.load(fileBuffer);

        const sheet = workbook.worksheets[0];

        sheet.eachRow({ includeEmpty: false }, (row) => {
          data1.push(row.values);
        });

        // kiểm tra số cột trong file
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

        // bỏ dòng đầu đi
        for (const row of data1) {
          if (isFirstRow) {
            isFirstRow = false;
            continue;
          }
          const student = {};
          student["Email"] = row[1];
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
      await banAccountM.mapStudentID(data);
      res.send("File uploaded successfully!");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },

  //----------------------------------class
  getAllClass: async (req, res) => {
    try {
      const { rows } = await classM.getAll();

      if (rows && rows.length > 0) {
        return res.json({ msg: "Danh sách lớp", data: rows });
      } else {
        return res.json({
          errors: [
            {
              msg: "Không có lớp nào hết",
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
        return res.json({ msg: "Đã mở lại active lớp" });
      } else {
        return res.json({ msg: "Đã inactive lớp" });
      }
    } catch (error) {
      // console.log(error);
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

module.exports = banAccountC;
