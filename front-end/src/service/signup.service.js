import axios from "axios";

const API_URL = "https://finalproject-webnc.vercel.app";
// const API_URL = "http://localhost:5000";

const signup = (Email, Pw, Role) => {
  return axios
    .post(`${API_URL}/api/v1/user/signup`, { Email, Pw, Role })
    .then((res) => {
      //console.log("Verify: ", res.data.data);
      return res.data.data;
    });
};

const verify = (Email, Pw, Role) => {
  return axios
    .post(`${API_URL}/api/v1/user/verify`, { Email, Pw, Role })
    .then((res) => {
      console.log(res);
      return res.data;
    });
};

const resetPw = (Email) => {
  return axios.post(`${API_URL}/api/v1/user/resetPW`, { Email });
};

const SignupService = {
  signup,
  verify,
  resetPw,
};

export default SignupService;
