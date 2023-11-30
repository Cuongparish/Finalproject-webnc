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
    try {
      const { rows } = await accountM.getbyEmail(req.body.Email);

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

  postSignup: async (req, res) => {
    const { Email, Pw, Role } = req.body;
    try {
      const { rows } = await accountM.addUser(Email, Pw, Role);

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
