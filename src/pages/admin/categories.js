import AdminService from "../../services/adminService";
import Header from "../../components/utils/header";
import Loading from "../../components/utils/loading";
import useCategories from "../../hooks/useCategories";
import { useNavigate } from "react-router-dom";
import Info from "../../components/utils/Info";
import Container from "../../components/utils/Container";
import { Toaster } from "react-hot-toast";

function AdminCategoriesManagement() {

    const [data, isFetching] = useCategories([])

    return (
        <Container activeNavId={6}>
            <Header title="Categories" />
            <Toaster />
            {(isFetching) && <Loading />}
            {(!isFetching) && (data.length === 0) && <Info text={"No categories found!"} />}
            {(!isFetching) && (data.length !== 0) && (
                <table>
                    <CategoriesTableHeader />
                    <CategoriesTableBody data={data} />
                </table>
            )}
        </Container>
    )
}

export default AdminCategoriesManagement;

function CategoriesTableHeader() {
    return (
        <thead>
            <tr>
                <th>Category Id</th>
                <th>Category Name</th>
                <th>Type</th>
                <th>Action</th>
            </tr>
        </thead>
    )
}

function CategoriesTableBody({ data }) {

    const navigate = useNavigate();

    const onEditClick = (category) => {
        localStorage.setItem("categoryToEdit", JSON.stringify(category))
        console.log(category, data);
        navigate(`/admin/editCategory/${category.id}`)
    }

    return (
        data.map((item) => {
            return (
                <tbody>
                    <tr key={item.id}>

                        <td>{"C" + String(item.id).padStart(5, '0')}</td>

                        <td>{item.name}</td>

                        <td>{item.transaction_type_name}</td>
                        {/* {
                        item.enabled ? <td style={{ color: '#6aa412' }}>Enabled</td> : <td style={{ color: '#ff0000' }}>Disabled</td>
                    } */}

                        <td style={{ display: 'flex', gap: '5px' }}>
                            <button
                                onClick={() => onEditClick(item)}
                            >
                                Edit
                            </button>

                        </td>
                    </tr>
                </tbody>
            )
        })
    )
}