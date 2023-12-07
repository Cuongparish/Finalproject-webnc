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

  // getTeacher: async (req, res) => {
  //   try {
  //     const { rows } = await classM.getTeacherinClass(req, res);

  //     if (rows && rows.length > 0) {
  //       res.json({ msg: "OKkkkk", data: rows });
  //     } else {
  //       res.json({
  //         errors: [
  //           {
  //             msg: "Invalid credentials",
  //           },
  //         ],
  //       });
  //     }
  //   } catch (error) {
  //     res.json({
  //       errors: [
  //         {
  //           msg: "Invalid credentials",
  //         },
  //       ],
  //     });
  //   }
  // },

  postCreateClass: async (req, res) => {
    // const { iduser, tenlop, chude, phong, malop } = req.body;
    const { rows } = await classM.postCreateClass(req, res);

    // console.log(rows[0].Pw);
    // console.log(req.body.Pw);
    return res.json({ msg: "OK", data: rows });
  },

  getListUserinClass: async (req, res) => {
    // const { rows: teacherRows } = await classM.getTeacher_inClass(req, res);
    // console.log(teacherRows);
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
            msg: "Invalid credentials",
          },
        ],
      });
    }
  },

  getDetailinClass: async (req, res) => {
    // const { rows: teacherRows } = await classM.getTeacher_inClass(req, res);
    // console.log(teacherRows);
    try {
      const { rows } = await classM.getDetail_inClass(req, res);

      if (rows && rows.length > 0) {
        res.json({ msg: "Detail", data: rows });
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
};

module.exports = classC;
