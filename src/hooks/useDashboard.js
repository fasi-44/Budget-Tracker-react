import { useEffect, useState } from "react";
import useCategories from "./useCategories";
import UserService from "../services/userService";
import AuthService from "../services/auth.service";

function useDashboard(currentMonth) {
    const [total_income, setIncome] = useState(0)
    const [total_expense, setExpense] = useState(0)
    const [no_of_transactions, setTransactions] = useState(0)
    const cash_in_hand = total_income > total_expense ? Number((total_income - total_expense)?.toFixed(2)) : 0;
    const [categories] = useCategories()
    const [categorySummary, setCategorySummary] = useState([])
    const [budgetAmount, setBudgetAmount] = useState(0)
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);


    const generateTransactionSummary = async () => {
        setIsLoading(true)

        // fetching the income (1=Income)
        const income_response = await UserService.getTotalIncomeOrExpense(AuthService.getCurrentUser().user.userId, 1, currentMonth.id, currentMonth.year).then(
            (response) => {
                if (response.data.status === "SUCCESS") {
                    setIncome(Number((response.data.response) ? response.data.response.toFixed(2) : 0))
                }
            },
            (error) => {
                setIsError(true)
            }
        )

        // fetching the expense (2=Expense)
        const expense_response = await UserService.getTotalIncomeOrExpense(AuthService.getCurrentUser().user.userId, 2, currentMonth.id, currentMonth.year).then(
            (response) => {
                if (response.data.status === "SUCCESS") {
                    setExpense(Number((response.data.response) ? response.data.response.toFixed(2) : 0))
                }
            },
            (error) => {
                setIsError(true)
            }
        )

        // fetching the no of transactions
        const no_response = await UserService.getTotalNoOfTransactions(AuthService.getCurrentUser().user.userId, currentMonth.id, currentMonth.year).then(
            (response) => {
                if (response.data.status === "SUCCESS") {
                    setTransactions(response.data.response)
                }
            },
            (error) => {
                setIsError(true)
            }
        )
        setIsLoading(false)

    }

    // fetching the expeneses for each category and storing it in the categorySummary state
    const generateCategorySummary = async () => {
        setIsLoading(true)
        const filtered = [];
        await Promise.all(categories.filter(cat => cat.transaction_type_id === 2).map(async (cat) => {
            try {
                const response = await UserService.getTotalByCategory(AuthService.getCurrentUser().user.email, cat.id, currentMonth.id, currentMonth.year);
                if (response.data.status === "SUCCESS" && response.data.response) {
                    filtered.push({ name: cat.name, amount: Number(response.data.response ? response.data.response.toFixed(2) : 0) });
                }
            } catch (error) {
                setIsError(true)
            }
        }));
        setCategorySummary(filtered)
        setIsLoading(false)
    }

    // feching the budget amount for the current month, if not found,it will be 0
    const fetchBudget = async () => {
        setIsLoading(true)
        const response = await UserService.getBudget(currentMonth.id, currentMonth.year)
            .then((response) => {
                setBudgetAmount(response.data.response)
            })
            .catch((error) => {
                setIsError(true)
            })
        setIsLoading(false)
    }

    // saving the budget amount for the current month
    const saveBudget = async (d) => {
        const response = await UserService.createBudget(d.amount)
            .then((response) => {
            })
            .catch((error) => {
                setIsError(true)
            })
        fetchBudget()
    }

    useEffect(() => {
        generateTransactionSummary()
        if (categories) {
            generateCategorySummary()
        }
        fetchBudget()
    }, [currentMonth, categories])

    return [
        total_expense,
        total_income,
        cash_in_hand,
        no_of_transactions,
        categorySummary,
        budgetAmount,
        saveBudget,
        isLoading,
        isError
    ]


}

export default useDashboard;