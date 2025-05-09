const SideBarLinks = [
    {
        "id": 0,
        "name": "Dashboard",
        "icon": "fa fa-th-large",
        "to": "/user/dashboard",
        "role": "ROLE_USER"
    },
    {
        "id": 1,
        "name": "Transactions History",
        "icon": "fa fa-exchange",
        "to": "/user/transactions",
        "role": "ROLE_USER"
    },
    {
        "id": 2,
        "name": "New Transaction",
        "icon": "fa fa-calendar-plus-o",
        "to": "/user/newTransaction",
        "role": "ROLE_USER"
    },
    {
        "id": 9,
        "name": "Statistics",
        "icon": "fa fa-line-chart",
        "to": "/user/statistics",
        "role": "ROLE_USER"
    },
    {
        "id": 6,
        "name": "Categories",
        "icon": "fa fa-th-large",
        "to": "/admin/categories",
        "role": "ROLE_ADMIN"
    },
    {
        "id": 7,
        "name": "New category",
        "icon": "fa fa-plus-square",
        "to": "/admin/newCategory",
        "role": "ROLE_ADMIN"
    },

]

export default SideBarLinks;