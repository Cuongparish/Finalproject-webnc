const notifyM = require("../models/notify.models.js");

const notifyC = {
  //done
  getNotify: async (req, res) => {
    try {
      const { rows } = await notifyM.getNotify(req, res);
      if (rows && rows.length > 0) {
        res.json({ msg: "OKkkkk", data: rows });
      } else {
        res.json({
          errors: [
            {
              msg: "sai",
            },
          ],
        });
      }
    } catch (error) {
      console.log(error);
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

module.exports = notifyC;
