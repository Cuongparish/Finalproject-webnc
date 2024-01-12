import axios from "axios";

// const API_URL = "https://finalproject-webnc.vercel.app";
const API_URL = "http://localhost:5000";

const GetReview = (idLop, idUser) => {
  return axios
    .get(`${API_URL}/api/v1/user/review/listReview/${idLop}/${idUser}`)
    .then((res) => {
      //console.log("res: ", res);
      return res.data;
    });
};

const CreateReview = (idUser, idLop, idCotDiem, DiemMongMuon, NoiDung) => {
  return axios
    .post(`${API_URL}/api/v1/user/review`, {
      idUser,
      idLop,
      idCotDiem,
      DiemMongMuon,
      NoiDung,
    })
    .then((res) => {
      //console.log("res: ", res);
      return res.data;
    });
};

const GetDetailReview = (idUser, idPhucKhao) => {
  return axios
    .post(`${API_URL}/api/v1/user/review/detailReview`, { idUser, idPhucKhao })
    .then((res) => {
      //console.log("res: ", res);
      return res.data;
    });
};

const GetReplies = (idPhucKhao) => {
  return axios
    .get(`${API_URL}/api/v1/user/review/listReplies/${idPhucKhao}`)
    .then((res) => {
      //console.log("res: ", res);
      return res.data;
    });
};

const SendReply = (idLop, idPhucKhao, idUser, idCotDiem, TraoDoi) => {
  return axios
    .post(`${API_URL}/api/v1/user/review/replies/${idLop}/${idPhucKhao}`, {
      idUser,
      idCotDiem,
      TraoDoi,
    })
    .then((res) => {
      //console.log("res: ", res);
      return res.data;
    });
};

const LockReview = (idLop, idCotDiem) => {
  return axios
    .post(`${API_URL}/api/v1/user/review/closeReview/${idLop}`, { idCotDiem })
    .then((res) => {
      //console.log("res: ", res);
      return res.data;
    });
};

const ReviewService = {
  GetReview,
  CreateReview,
  GetDetailReview,
  LockReview,
  GetReplies,
  SendReply,
};

export default ReviewService;
