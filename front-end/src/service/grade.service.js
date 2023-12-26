import axios from "axios";

const API_URL = "https://finalproject-webnc.vercel.app";
//const API_URL = "http://localhost:5000";

const GetGradeStructure = (idLop) => {
    return axios
        .get(`${API_URL}/api/v1/user/grade/listPercentScore/${idLop}`)
        .then((res) => {
            //console.log("res: ", res);
            return res.data;
        });
}

const CreateGradeStructure = (idLop, TenCotDiem, PhanTramDiem) => {
    return axios
        .post(`${API_URL}/api/v1/user/grade/addPercentScore/${idLop}`, {
            TenCotDiem,
            PhanTramDiem
        })
        .then((res) => {
            //console.log("res: ", res);
            return res.data;
        });
};

const DelGradeStructure = (idLop, TenCotDiem) => {
    return axios
        .delete(`${API_URL}/api/v1/user/grade/delPercentScore/${idLop}`, {
            TenCotDiem
        })
        .then((res) => {
            //console.log("res: ", res);
            return res.data;
        });
};

const UpdateGradeStructure = (idLop, TenCotDiem, PhanTramDiem, idCotDiem) => {
    return axios
        .put(`${API_URL}/api/v1/user/grade/updatePercentScore/${idLop}`, {
            TenCotDiem,
            PhanTramDiem,
            idCotDiem
        })
        .then((res) => {
            //console.log("res: ", res);
            return res.data;
        });
};

const GradeService = {
    CreateGradeStructure,
    GetGradeStructure,
    DelGradeStructure,
    UpdateGradeStructure,
};

export default GradeService;