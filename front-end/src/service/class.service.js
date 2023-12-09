import axios from "axios";

// const API_URL = "https://finalproject-webnc.vercel.app";
const API_URL = "http://localhost:5000";

const CreateClass = (idUser, TenLop, ChuDe, Phong) => {
    return axios
        .post(`${API_URL}/api/v1/user/${idUser}/createClass`, {TenLop, ChuDe, Phong}).then((res) => {
            //console.log("res: ", res);
            return res.data.data;
          });
}

const GetClasses = (idUser) => {
    return axios
        .get(`${API_URL}/api/v1/user/${idUser}/classes`).then((res) => {
            //console.log("res: ", res);
            return res.data;
          });
}

 const GetDetailClass = (MaLop) => {
    return axios
        .get(`${API_URL}/api/v1/user/${MaLop}/detailClass`).then((res) => {
            //console.log("res-detail-class: ", res);
            return res.data.data;
          });
 }

 const GetListUserInClass = (MaLop) => {
    return axios
        .get(`${API_URL}/api/v1/user/${MaLop}/listUserinClass`).then((res) => {
            console.log("res-list-user: ", res.data);
            return res.data;
          });
 }

const ClassService = {
    CreateClass,
    GetClasses,
    GetDetailClass,
    GetListUserInClass
}

export default ClassService;