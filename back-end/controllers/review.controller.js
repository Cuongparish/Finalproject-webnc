const notifyM = require("../models/notify.models.js");
const reviewM = require("../models/review.models.js");
const classM = require("../models/class.models.js");
const accountM = require("../models/account.models.js");
const gradeM = require("../models/grade.models.js");

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
      return res.json({ msg: "Dữ liệu trống" });
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

      return res.json({ msg: "Success" });
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

  // chi tiết đơn phúc khảo
  getDetailReview: async (req, res) => {
    if (!req.body.idPhucKhao || !req.body.idUser) {
      return res.json({ msg: "Dữ liệu trống" });
    }
    try {
      let data = [];
      //lấy DiemMongMuon, NoiDung
      const { rows: part1 } = await reviewM.getReview_Student(
        req.body.idPhucKhao
      );
      let temp = part1[0].DiemMongMuon;
      data.push({ DiemMongMuon: temp });
      temp = part1[0].NoiDung;
      data.push({ NoiDung: temp });
      // console.log(part1[0].idLop);

      // lấy FullName, StudentId, idHocSinh
      const { rows: part2 } = await accountM.getbyID(req.body.idUser);
      console.log(part2[0].idHocSinh);
      temp = part2[0].FullName;
      data.push({ FullName: temp });

      temp = part2[0].StudentId;
      data.push({ StudentId: temp });

      const { rows: part3 } = await gradeM.getPercentScore_inClass(
        part1[0].idLop
      );
      // console.log(part3);

      // lấy TenCotDiem, PhanTramDiem
      for (const PercentScore of part3) {
        if (PercentScore.idCotDiem == part1[0].idCotDiem) {
          // console.log(PercentScore);
          temp = PercentScore.TenCotDiem;
          data.push({ TenCotDiem: temp });

          temp = PercentScore.PhanTramDiem;
          data.push({ PhanTramDiem: temp });
        }
      }

      // lấy điểm
      const { rows: part4 } = await gradeM.getScore_inClass(
        part2[0].idHocSinh,
        part1[0].idCotDiem,
        part1[0].idLop
      );

      temp = part4[0].Diem;
      data.push({ Diem: temp });

      // merge
      const consolidatedData = {};

      data.forEach((item) => {
        const key = Object.keys(item)[0];
        consolidatedData[key] = item[key];
      });
      return res.json({ msg: "Success", data: consolidatedData });
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

  // đóng phúc khảo 1 thành phần điểm
  //(req.params.idLop, req.body.idCotDiem, req.body.ThoiGian)
  closeReview: async (req, res) => {
    let Khoa = 1;
    let AcpPhucKhao = 0;

    try {
      //lấy tên lớp học
      const NameClass = await classM.getNameClass(req.params.idLop);
      console.log(NameClass.rows[0].TenLop);

      // lấy tên cột điểm
      const NameGradeComposition = await gradeM.getAll_GradeComposition();
      for (grade of NameGradeComposition.rows) {
        // console.log(grade.idCotDiem);
        if (grade.idCotDiem == req.body.idCotDiem) {
          var TenCotDiem = grade.TenCotDiem;
        }
      }

      // lấy malop
      var idd;
      const { rows: idLop } = await classM.getAll();

      for (const id of idLop) {
        if (id.idLop == req.params.idLop) {
          idd = id.MaLop;
          console.log(idd);
          break;
        }
      }

      // thông báo đến học sinh
      let Notify_NoiDung_Student = `Cột điểm ${TenCotDiem} của lớp ${NameClass.rows[0].TenLop} đã dừng nhận phúc khảo`;

      const { rows: studentRows } = await classM.getStudent_inClass(idd);

      if (studentRows && studentRows.length < 0) {
        return res.json({
          msg: "Không có học sinh nào trong lớp này",
        });
      }
      let idPK = null;
      for (const user of studentRows) {
        await notifyM.addNotify(
          req.params.idLop,
          Notify_NoiDung_Student,
          req.body.ThoiGian,
          user.idUser,
          idPK
        );
      }

      // thông báo đến giáo viên
      const { rows: teacherRows } = await classM.getTeacher_inClass(idd);

      for (const user of teacherRows) {
        await notifyM.addNotify(
          req.params.idLop,
          Notify_NoiDung_Student,
          req.body.ThoiGian,
          user.idUser,
          idPK
        );
      }

      // cập nhật không cho phúc khảo nữa
      await reviewM.closeReview(
        req.params.idLop,
        req.body.idCotDiem,
        AcpPhucKhao
      );

      return res.json({
        msg: "cập nhật không cho phúc khảo nữa",
      });
    } catch (error) {
      console.log(error);
      return res.json({
        errors: [
          {
            msg: "Lỗi",
          },
        ],
      });
    }
  },

  // trả lời qua lại đơn phúc khảo
  //(req.params.idPhucKhao, req.body.idUser, req.body.TraoDoi,
  //req.body.ThoiGian, req.params.idLop, req.body.idCotDiem)
  repliesReview: async (req, res) => {
    if (
      !req.params.idPhucKhao ||
      !req.body.idUser ||
      !req.body.TraoDoi ||
      !req.body.ThoiGian ||
      !req.params.idLop ||
      !req.body.idCotDiem
    ) {
      return res.json({ msg: "Dữ liệu trống" });
    }
    try {
      // tra loi
      reviewM.repliesReview(
        req.params.idPhucKhao,
        req.body.idUser,
        req.body.TraoDoi,
        req.body.ThoiGian
      );

      // lấy malop
      var idd;
      const { rows: idLop } = await classM.getAll();

      for (const id of idLop) {
        if (id.idLop == req.body.idLop) {
          idd = id.MaLop;
          console.log(idd);
          break;
        }
      }

      //lấy tên lớp học
      const NameClass = await classM.getNameClass(req.params.idLop);
      // console.log(NameClass.rows[0].TenLop);

      // lấy tên cột điểm
      const NameGradeComposition = await gradeM.getAll_GradeComposition();
      for (const grade of NameGradeComposition.rows) {
        // console.log(grade.idCotDiem);
        if (grade.idCotDiem == req.body.idCotDiem) {
          var TenCotDiem = grade.TenCotDiem;
        }
      }

      // kiểm tra xem idUser nhập nội dung trả lời đơn phúc khảo là hs hay gv của lớp học này
      const { rows: studentRows } = await classM.getStudent_inClass(idd);
      let hs = false;
      let ten;
      for (let user of studentRows) {
        if (user.idUser == req.body.idUser) {
          hs = true;
          ten = user.FullName;
        }
      }
      // nếu idUser này là giáo viên
      if (hs == false) {
        // lấy học sinh tạo đơn phúc khảo
        const notify = await notifyM.getAll();
        for (const user of notify.rows) {
          if (req.params.idPhucKhao == user.idPhucKhao) {
            var idUser_Cre_Review = user.idUser;
          }
        }

        // thông báo đến học sinh
        let Notify_NoiDung_Student = `Giáo viên ${ten} đã phản hồi đơn phúc khảo của bạn của cột điểm ${TenCotDiem} của lớp ${NameClass.rows[0].TenLop}`;

        let idPK = null;
        await notifyM.addNotify(
          req.params.idLop,
          Notify_NoiDung_Student,
          req.body.ThoiGian,
          idUser_Cre_Review,
          req.params.idPhucKhao
        );
      }

      //nếu idUser là học sinh
      if (hs == true) {
        // thông báo đến giáo viên
        const { rows: teacherRows } = await classM.getTeacher_inClass(idd);

        for (const user of teacherRows) {
          let Notify_NoiDung_Teacher = `Học sinh ${user.FullName} đã phản hồi đơn phúc khảo, của cột điểm ${TenCotDiem} của lớp ${NameClass.rows[0].TenLop}`;
          await notifyM.addNotify(
            req.params.idLop,
            Notify_NoiDung_Teacher,
            req.body.ThoiGian,
            user.idUser,
            req.params.idPhucKhao
          );
        }
      }
      return res.json({ msg: "Success" });
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

module.exports = reviewC;
