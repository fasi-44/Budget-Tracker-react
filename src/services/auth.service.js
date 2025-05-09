import axios from "axios";
import API_BASE_URL from "../auth.config";


const login_req = async (email, password) => {
    const response = await axios.post(API_BASE_URL + '/auth/signin', { email, password })

    if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.reload()
    }

    return response;
}

const logout_req = () => {
    localStorage.removeItem("user");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const authHeader = () => {
    const user = getCurrentUser();
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}

const AuthService = {
    login_req,
    getCurrentUser,
    logout_req,
    authHeader
}

export default AuthService;