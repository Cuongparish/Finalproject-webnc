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

const logout = () => {
    window.open(`${API_URL}/auth/logout`, "_self");
}

const AuthService = {
    googleAuth,
    facebookAuth,
    logout,
}

export default AuthService;
