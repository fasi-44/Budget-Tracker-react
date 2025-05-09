import axios from "axios";
import AuthService from "./auth.service";
import API_BASE_URL from "./auth.config";


const get_categories = () => {
    return axios.get(
        API_BASE_URL + '/category/getAll',
        {
            headers: AuthService.authHeader()
        }
    )
}

const add_transaction = (email, categoryId, descripiton, amount, date) => {
    console.log(email, categoryId, descripiton, amount);
    return axios.post(
        API_BASE_URL + '/transaction/new',
        {
            userEmail: email,
            categoryId: categoryId,
            description: descripiton,
            amount: amount,
            date: date
        },
        {
            headers: AuthService.authHeader()
        }
    )
}

const get_transactions = (email, pageNumber, pageSize, sortField, sortDirec, transactionType) => {
    return axios.get(
        API_BASE_URL + '/transaction/getByUser',
        {
            headers: AuthService.authHeader(),
            params: {
                email: email, pageNumber: pageNumber, pageSize: pageSize, sortField: sortField, sortDirec: sortDirec, transactionType: transactionType
            }
        }
    )
}

const get_single_transaction = (id) => {
    return axios.get(
        API_BASE_URL + '/transaction/getById',
        {
            headers: AuthService.authHeader(),
            params: {
                id: id
            }
        }
    )
}
const update_transaction = (transactionId, email, categoryId, descripiton, amount, date) => {
    return axios.put(API_BASE_URL + '/transaction/update',
        {
            userEmail: email,
            categoryId: categoryId,
            description: descripiton,
            amount: amount,
            date: date
        },
        {
            headers: AuthService.authHeader(),
            params: {
                transactionId: transactionId
            }
        }
    )
}

const delete_transaction = (id) => {
    return axios.delete(
        API_BASE_URL + '/transaction/delete',
        {
            headers: AuthService.authHeader(),
            params: {
                transactionId: id
            }
        }
    )
}

const getTotalIncomeOrExpense = async (userId, transactionTypeId, month, year) => {
    return axios.get(
        API_BASE_URL + '/report/getTotalIncomeOrExpense',
        {
            headers: AuthService.authHeader(),
            params: {
                userId: userId,
                transactionTypeId: transactionTypeId,
                month: month,
                year: year
            }
        }
    )
}

const getTotalNoOfTransactions = async (userId, month, year) => {
    return axios.get(
        API_BASE_URL + '/report/getTotalNoOfTransactions',
        {
            headers: AuthService.authHeader(),
            params: {
                userId: userId,
                month: month,
                year: year
            }
        }
    )
}

const getTotalByCategory = async (email, categoryId, month, year) => {
    return await axios.get(
        API_BASE_URL + '/report/getTotalByCategory',
        {
            headers: AuthService.authHeader(),
            params: {
                email: email,
                categoryId: categoryId,
                month: month,
                year: year
            }
        }
    )
}

const getMonthlySummary = async (email) => {
    return await axios.get(
        API_BASE_URL + '/report/getMonthlySummaryByUser',
        {
            headers: AuthService.authHeader(),
            params: {
                email: email,
            }
        }
    )
}

const getBudget = async (month, year) => {
    return await axios.get(
        API_BASE_URL + '/budget/get',
        {
            headers: AuthService.authHeader(),
            params: {
                userId: AuthService.getCurrentUser().user.userId,
                month: month,
                year: year
            }
        }
    )
}

const createBudget = (amount) => {
    return axios.post(
        API_BASE_URL + '/budget/create',
        {
            userId: AuthService.getCurrentUser().user.userId,
            amount: amount
        },
        {
            headers: AuthService.authHeader()
        }
    )
}

const createSavedTransaction = (categoryId, amount, description, frequency, upcomingDate) => {
    return axios.post(
        API_BASE_URL + '/saved/create',
        {
            userId: AuthService.getCurrentUser().user.id,
            categoryId: categoryId,
            amount: amount,
            description: description,
            frequency: frequency,
            upcomingDate: upcomingDate
        },
        {
            headers: AuthService.authHeader()
        }
    )
}

const getSavedTransactionById = (id) => {
    return axios.get(
        API_BASE_URL + '/saved/',
        {
            headers: AuthService.authHeader(),
            params: {
                id: id
            }
        }
    )
}
const updateSavedTransaction = (id, categoryId, amount, description, frequency, upcomingDate) => {
    return axios.put(API_BASE_URL + '/saved/',
        {
            userId: AuthService.getCurrentUser().id,
            categoryId: categoryId,
            amount: amount,
            description: description,
            frequency: frequency,
            upcomingDate: upcomingDate
        },
        {
            headers: AuthService.authHeader(),
            params: {
                id: id
            }
        }
    )
}

const deleteSavedTransaction = (id) => {
    return axios.delete(
        API_BASE_URL + '/saved/',
        {
            headers: AuthService.authHeader(),
            params: {
                id: id
            }
        }
    )
}


const UserService = {
    get_categories,
    add_transaction,
    get_transactions,
    get_single_transaction,
    update_transaction,
    delete_transaction,
    getTotalIncomeOrExpense,
    getTotalNoOfTransactions,
    getTotalByCategory,
    getMonthlySummary,
    getBudget,
    createBudget,
    createSavedTransaction,
    getSavedTransactionById,
    updateSavedTransaction,
    deleteSavedTransaction,
}
export default UserService;