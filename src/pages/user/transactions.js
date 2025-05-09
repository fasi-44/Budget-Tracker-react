import { useEffect, useState } from 'react';
import UserService from '../../services/userService';
import Header from '../../components/utils/header';
import Loading from '../../components/utils/loading';
import usePagination from '../../hooks/usePagination';
import PageInfo from '../../components/utils/pageInfo';
import TransactionList from '../../components/userTransactions/transactionList.js';
import { useLocation } from 'react-router-dom';
import Info from '../../components/utils/Info.js';
import Container from '../../components/utils/Container.js';
import toast, { Toaster } from 'react-hot-toast';
import AuthService from '../../services/auth.service.js';

function Transactions() {

    const [userTransactions, setUserTransactions] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [transactionType, setTransactionType] = useState('')
    const location = useLocation();

    const {
        pageSize, pageNumber, noOfPages, sortField, sortDirec,
        onNextClick, onPrevClick, setNoOfPages, setNoOfRecords, getPageInfo
    } = usePagination('date')

    const getTransactions = async () => {
        await UserService.get_transactions(AuthService.getCurrentUser().user.email, pageNumber,
            pageSize, sortField, sortDirec, transactionType).then(
                (response) => {
                    if (response.data.status === "SUCCESS") {
                        setUserTransactions(response.data.response.data)
                        setNoOfPages(response.data.response.totalNoOfPages)
                        setNoOfRecords(response.data.response.totalNoOfRecords)
                        return
                    }
                },
                (error) => {
                    toast.error("Failed to fetch all transactions: Try again later!")
                }
            )
        setIsFetching(false)
    }

    useEffect(() => {
        getTransactions()
    }, [pageNumber, transactionType, sortDirec, sortField])

    useEffect(() => {
        location.state && toast.success(location.state.text)
        location.state = null
    }, [])

    return (
        <Container activeNavId={1}>
            <Header title="Transactions History" />
            <Toaster />

            {(userTransactions.length === 0 && isFetching) && <Loading />}
            {(!isFetching) &&
                <>
                    <div className='utils'>
                        <Filter
                            setTransactionType={(val) => setTransactionType(val)}
                        />
                        <div className='page'>
                            <PageInfo
                                info={getPageInfo()}
                                onPrevClick={onPrevClick}
                                onNextClick={onNextClick}
                                pageNumber={pageNumber}
                                noOfPages={noOfPages}
                            />
                        </div>
                    </div>
                    {(userTransactions.length === 0) && <Info text={"No transactions found!"} />}
                    {(userTransactions.length !== 0) && <TransactionList list={userTransactions} />}
                </>
            }
        </Container>
    )
}

export default Transactions;


function Filter({ setTransactionType }) {
    return (
        <select onChange={(e) => setTransactionType(e.target.value)} style={{ margin: '0 15px 0 0' }}>
            <option value="">All</option>
            <option value="1">Income</option>
            <option value="2">Expense</option>
        </select>
    )
}


