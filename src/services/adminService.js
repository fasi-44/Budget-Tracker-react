import axios from "axios";
import AuthService from "./auth.service";
import API_BASE_URL from "./auth.config";


const getAllcategories = () => {
    return axios.get(
        API_BASE_URL + '/category/getAll',
        {
            headers: AuthService.authHeader()
        }
    )
}

const addNewcategory = (categoryName, transactionTypeId) => {
    return axios.post(
        API_BASE_URL + '/category/new',
        {
            categoryName: categoryName,
            transactionTypeId: transactionTypeId
        },
        {
            headers: AuthService.authHeader()
        }
    )
}

const updatecategory = (categoryId, categoryName, transactionTypeId) => {
    return axios.put(
        API_BASE_URL + '/category/update',
        {
            categoryName: categoryName,
            transactionTypeId: transactionTypeId
        },
        {
            headers: AuthService.authHeader(),
            params: {
                categoryId: categoryId
            }
        }
    )
}

const disableOrEnableCategory = (categoryId) => {
    return axios.delete(
        API_BASE_URL + "/category/delete",
        {
            headers: AuthService.authHeader(),
            params: {
                categoryId: categoryId
            }
        }
    )
}

const AdminService = {
    getAllcategories,
    addNewcategory,
    updatecategory,
    disableOrEnableCategory,
}

export default AdminService;