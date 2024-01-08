import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
//import axios from "axios";
//import { Navbar, Container, Image, Nav} from 'react-bootstrap';

import Loader from "./components/Loader";

import LandingPage from "./views/LandingPage";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import ResetPW from "./views/ResetPW";
import DetailClass from "./views/DetailClass";
import Profile from "./views/Profile";
import VerifyJoin from "./views/VerifyJoin";
import VerifyJoinNoUser from "./views/VerifyJoinNoUser";

import AdminManagement from "./views/AdminManagement";

import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "./service/auth.service";

//const API_URL = "http://localhost:5000";
//const API_URL = "https://finalproject-webnc.vercel.app";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // const getSocialUser = async () => {
  //   try {
  //     const url = `${API_URL}/auth/login/success`;
  //     const { data } = await axios.get(url, { withCredentials: true });
  //     setUser(data.user._json);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getSocialUser();
  // }, []);

  useEffect(() => {
    const localUser = AuthService.getLocalUser;

    if (localUser) {
      setUser(localUser);
    }
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loader /> // Hiển thị Loader khi loading là true
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/introduction" />} />
          <Route path="/introduction" exact element={<LandingPage />} />
          <Route
            exact
            path="/login"
            element={
              user ? (
                user.Role === 1 ? (
                  <Navigate to="/admin" />
                ) : (
                  <Navigate to="/home" />
                )
              ) : (
                <Login />
              )
            }
          />
          <Route
            exact
            path="/signup"
            element={user ? <Navigate to="/home" /> : <Signup />}
          />
          <Route
            exact
            path="/home"
            element={user ? <Home user={user} /> : <Navigate to="/login" />}
          />
          <Route exact path="/ResetPw" element={<ResetPW />} />
          <Route exact path="/logout" element={<Navigate to="/login" />} />
          <Route
            path="/detail-class/:malop"
            element={
              user ? <DetailClass user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile"
            element={user ? <Profile user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="/join-class/:malop/:role"
            element={user ? <VerifyJoin user={user} /> : <VerifyJoinNoUser />}
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              user ? <AdminManagement user={user} /> : <Navigate to="/login" />
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
