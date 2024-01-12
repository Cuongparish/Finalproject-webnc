import axios from "axios";

const API_URL = "https://finalproject-webnc.vercel.app";
//const API_URL = "http://localhost:5000";

const GetUser = () => {
  return axios.get(`${API_URL}/api/v1/user/getban`).then((res) => {
    //console.log("res: ", res);
    return res.data;
  });
};

const BanAccount = (idUser, ThoiGianKhoa, ThoiHanKhoa) => {
  return axios
    .post(`${API_URL}/api/v1/user/ban`, { idUser, ThoiGianKhoa, ThoiHanKhoa })
    .then((res) => {
      //console.log("res: ", res);
      return res.data;
    });
};

const UnBanAccount = (idUser) => {
  return axios.post(`${API_URL}/api/v1/user/unban`, { idUser }).then((res) => {
    //console.log("res: ", res);
    return res.data;
  });
};

const ManualMapping = (
  idUser,
  Email,
  Pw,
  FullName,
  DOB,
  Sex,
  Phone,
  StudentId
) => {
  return axios
    .put(`${API_URL}/api/v1/user/ban/manualMapID`, {
      idUser,
      Email,
      Pw,
      FullName,
      DOB,
      Sex,
      Phone,
      StudentId,
    })
    .then((res) => {
      //console.log("res: ", res);
      return res.data;
    });
};

//--------------------------------------------------------------------

const GetClass = () => {
  return axios.get(`${API_URL}/api/v1/user/ban/listClass`).then((res) => {
    //console.log("res: ", res);
    return res.data;
  });
};

const ChangeStateClass = (idLop, TenLop, ChuDe, Phong, MaLop, State) => {
  return axios
    .put(`${API_URL}/api/v1/user/ban/class`, {
      idLop,
      TenLop,
      ChuDe,
      Phong,
      MaLop,
      State,
    })
    .then((res) => {
      //console.log("res: ", res);
      return res.data;
    });
};

const AdminService = {
  GetUser,
  BanAccount,
  UnBanAccount,
  ManualMapping,
  GetClass,
  ChangeStateClass,
};

export default AdminService;
