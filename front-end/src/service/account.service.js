import axios from "axios";

//const API_URL = "https://finalproject-webnc.vercel.app";
const API_URL = "http://localhost:5000";

const GetAccount = (idUser) => {
    return axios.get(`${API_URL}/api/v1/user/profile/${idUser}`).then((res) => {
        //console.log(res.data.data.rows[0]);
        return res.data;
    });
}

const UpdateAccount = (idUser, Email, Pw, DOB, Sex, Phone, StudentId) => {
    return axios.put(`${API_URL}/api/v1/user/profile/${idUser}`, { Email, Pw, DOB, Sex, Phone, StudentId }).then((res) => {
        console.log(res.data);
        return res.data;
    });
}

const AccountService = {
    GetAccount,
    UpdateAccount,
};

export default AccountService;