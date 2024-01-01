const notifyM = require("../models/notify.models.js");
const reviewM = require("../models/review.models.js");
const classM = require("../models/class.models.js");

const reviewC = {
  // tạo đơn phúc khảo, thông báo đến các giáo viên trong lớp, thông báo đến học sinh tạo đơn phúc khảo
  addReview_Student: async (req, res) => {
    if (
      !req.body.ThoiGian ||
      !req.body.DiemMongMuon ||
      !req.body.NoiDung ||
      !req.body.idCotDiem ||
      !req.body.idLop ||
      !req.body.idUser
    ) {
      res.json({ msg: "Dữ liệu trống" });
    }
    try {
      //tạo đơn phúc khảo
      await reviewM.addReview_Student(
        req.body.ThoiGian,
        req.body.DiemMongMuon,
        req.body.NoiDung,
        req.body.idCotDiem,
        req.body.idLop
      );

      const idPK = await reviewM.getLastReview();
      // console.log(idPK.rows[0].idLop);
      const NameClass = await classM.getNameClass(req.body.idLop);

      // tạo thông báo đến học sinh tạo đơn phúc khảo
      // console.log(NameClass.rows[0].TenLop);
      let Notify_NoiDung_Student = `Đơn phúc khảo của bạn đã được tạo thành công, lớp ${NameClass.rows[0].TenLop}`;
      await notifyM.addNotify(
        req.body.idLop,
        Notify_NoiDung_Student,
        req.body.ThoiGian,
        req.body.idUser,
        idPK.rows[0].idLop
      );

      //Tạo thông báo đến các giáo viên trong lớp
      let Notify_NoiDung_Teacher = `Có đơn phúc khảo của lớp ${NameClass.rows[0].TenLop}`;
      const idTeacher = await classM.getIDTeacher(req.body.idLop);
      for (const teacher of idTeacher.rows) {
        console.log(teacher.idUser);
        await notifyM.addNotify(
          req.body.idLop,
          Notify_NoiDung_Teacher,
          req.body.ThoiGian,
          teacher.idUser,
          idPK.rows[0].idLop
        );
      }

      res.json({ msg: "Success" });
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

module.exports = reviewC;
