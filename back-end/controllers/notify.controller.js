const notifyM = require("../models/notify.models.js");

const notifyC = {
  //done
  getNotify: async (req, res) => {
    try {
      const { rows } = await notifyM.getNotify(req, res);
      if (rows && rows.length > 0) {
        return res.json({ msg: "OKkkkk", data: rows });
      } else {
        return res.json({
          errors: [
            {
              msg: "Không có thông báo nào hết",
            },
          ],
        });
      }
    } catch (error) {
      console.log(error);
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

module.exports = notifyC;
