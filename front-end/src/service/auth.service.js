import axios from "axios";

const API_URL = "http://localhost:5000";

const googleAuth = () => {
    window.open(
        `${API_URL}/auth/google/callback`,
        "_self"
    );
};

const facebookAuth = () => {
    window.open(
        `${API_URL}/auth/facebook/callback`,
        "_self"
    );
};

// const localAuth = async (Email, Pw) => {
//     try {
//       const res = await axios.post(`${API_URL}/auth/login`, { Email, Pw });
//       console.log(res);
//       return res;
//     } catch (err) {
//       console.log(err);
//     }
//   };

const localAuth = (Email, Pw) => {
    return axios.post(`${API_URL}/auth/login`, { Email, Pw }).then(
        (res) => {
            console.log(res.data.data.rows[0]);
            return res.data.data.rows[0];
        }     
    ); 
};

const getLocalUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

const logout = () => {
    localStorage.removeItem("user");
    window.open(`${API_URL}/auth/logout`, "_self");
}

const AuthService = {
    googleAuth,
    facebookAuth,
    localAuth,
    getLocalUser,
    logout,
}

export default AuthService;
