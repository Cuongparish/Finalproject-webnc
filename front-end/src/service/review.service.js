import axios from "axios";

const API_URL = "https://finalproject-webnc.vercel.app";
//const API_URL = "http://localhost:5000";

const CreateReview = (idUser, idLop, idCotDiem, DiemMongMuon, NoiDung) => {
    return axios
        .post(`${API_URL}/api/v1/user/review`, { idUser, idLop, idCotDiem, DiemMongMuon, NoiDung })
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
}

const ReviewService = {
    CreateReview,
    LockReview,
};

export default ReviewService;