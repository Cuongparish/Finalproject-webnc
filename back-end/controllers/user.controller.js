const postgre = require("../models/database");
const userController = {
  getAll: async (req, res) => {
    try {
      const { rows } = await postgre.query('select * from "User"');
      res.json({ msg: "OK", data: rows });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
  // getById: async(req, res) => {
  //     try {
  //         const { rows } = await postgre.query('select * from  where book_id = $1', [req.params.id])

  //         if (rows[0]) {
  //             return res.json({msg: "OK", data: rows})
  //         }

  //         res.status(404).json({msg: "not found"})
  //     } catch (error) {
  //         res.json({msg: error.msg})
  //     }
  // },
  create: async (req, res) => {
    try {
      const { Email, Pw, Role } = req.body;

      const sql =
        // 'INSERT INTO "User"(Email, Pw, Role) VALUES($1, $2, $3) RETURNING *';
        `INSERT INTO "User"(
          "Email", "Pw", "Role")
          VALUES ($1, $2, $3) RETURNING *`;

      const { rows } = await postgre.query(sql, [Email, Pw, Role]);

      res.json({ msg: "OK", data: rows[0] });
    } catch (error) {
      res.json({ msg: error.msg });
    }
  },
  // updateById: async(req, res) => {
  //     try {
  //         const { name, price } = req.body

  //         const sql = 'UPDATE books set name = $1, price = $2 where book_id = $3 RETURNING *'

  //         const { rows } = await postgre.query(sql, [name, price, req.params.id])

  //         res.json({msg: "OK", data: rows[0]})

  //     } catch (error) {
  //         res.json({msg: error.msg})
  //     }
  // },
  // deleteById: async(req, res) => {
  //     try {
  //         const sql = 'DELETE FROM books where book_id = $1 RETURNING *'

  //         const { rows } = await postgre.query(sql, [req.params.id])

  //         if (rows[0]) {
  //             return res.json({msg: "OK", data: rows[0]})
  //         }

  //         return res.status(404).json({msg: "not found"})

  //     } catch (error) {
  //         res.json({msg: error.msg})
  //     }
  // }
};

module.exports = userController;
