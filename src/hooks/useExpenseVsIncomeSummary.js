import { useEffect, useState } from "react";
import UserService from "../services/userService";
import AuthService from "../services/auth.service";

function useExpenseVsIncomeSummary(months) {
    const [data, setData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            const income_response = await UserService.getMonthlySummary(AuthService.getCurrentUser().user.email).then(
                (response) => {
                    if (response.data.status === "SUCCESS") {
                        generateData(response.data.response)
                    }
                },
                (error) => {
                    setIsError(true)
                }
            )
            setIsLoading(false)
        }

        getData()
    }, [])

    const generateData = (fetchedData) => {
        const finalData = months.map(({ id, monthName }) => {
            console.log(months, fetchedData);
            const monthData = fetchedData.find((t) => t.month === id)
            return {
                id, monthName,
                totalIncome: monthData ? monthData.income : 0,
                totalExpense: monthData ? monthData.expense : 0
            }
        })
        setData(finalData)
    }

    return [data, isLoading, isError]
}

export default useExpenseVsIncomeSummary;