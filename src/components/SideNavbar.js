/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import './SideNavbar.css' // Import the CSS file
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { createWallet, getAllWallet } from '../Redux/actions/walletAction'
import { getAllTasks } from '../Redux/actions/taskActions'

const SideNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [dataLoaded, setDataLoaded] = useState(false);
    const alltasks = useSelector(state => state.taskReducer.task);
    const dispatch = useDispatch();

    useEffect(() => {
        const getWallets = async () => {
            await Promise.all([
                dispatch(getAllWallet()),
                dispatch(getAllTasks())
            ]);
            setDataLoaded(true);
        };
        getWallets();
    }, [dispatch]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setCurrentUser(storedUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    }

    const SendTask = () => {
        Swal.fire({
            title: 'اختر كود المهمة',
            html: `
                <style>
                    .swal-container {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    .swal-select {
                        width: 100%;
                        padding: 10px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        font-size: 14px;
                        margin-top: 25px;
                    }
                    .swal-select:focus {
                        outline: none;
                        border-color: #66afe9;
                        box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
                    }
                </style>
                <div class="swal-container">
                    <select required name="Mission_name" id="Mission_name" class="swal-select" placeholder="المهمة"></select>
                    <input type="number" id="amount_received_from_customer" style="width:100%;margin-top:25px;outline:0; border:1px solid wheat;" min="0" placeholder="Enter amount of money with Egyptian pound"></input>
                </div>
            `,
            didOpen: function () {
                var missionSelect = document.getElementById('Mission_name');
                var container_height = document.getElementById('swal2-html-container');
                container_height.style.height = '200px';

                if (dataLoaded) {
                    alltasks.data.filter(item => item.status === "تم القبول").forEach(function (task) {
                        var option = document.createElement('option');
                        option.value = task.code;
                        option.textContent = task.code.split('(')[1]?.split(')')[0] || task.code;
                        missionSelect.appendChild(option);
                    });
                }
            },
            inputAttributes: {
                autocapitalize: 'off',
            },
            showCancelButton: true,
            confirmButtonText: 'Send',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const selectedTask = document.getElementById('Mission_name').value;
                const amountReceived = document.getElementById('amount_received_from_customer').value;
                const current_user = JSON.parse(localStorage.getItem('user'));
                return { code: selectedTask, amount_received_from_customer: amountReceived, receiver: current_user.username };
            },
            allowOutsideClick: () => !Swal.isLoading(),
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value) {
                    dispatch(createWallet(result.value));
                    Swal.fire({
                        title: 'Success!',
                        text: 'تم تسجيل المبلغ بنجاح',
                        icon: 'success',
                    });
                    dispatch(getAllWallet());
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to send subject',
                        icon: 'error',
                    });
                }
            }
        });
    };
    return (
        <aside className="sidenav bg-light navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 shadow">
            <div className="sidenav-header">
                <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
                <a className="navbar-brand m-0 d-flex align-items-center">
                    <img src={logo} className="navbar-brand-img h-100 rounded-circle me-2" alt="main_logo" />
                    <span className="ms-1 font-weight-bold">PapperLess</span>
                </a>
            </div>
            <hr className="horizontal dark mt-0" />
            <div className="w-auto" id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} to="/">
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-home text-primary text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text">الرئيسية</span>
                        </Link>
                    </li>
                    {currentUser?.role == "manager" ? (
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/newTask' ? "active" : ""}`} to="/newTask">
                                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="fas fa-plus-square text-success text-sm opacity-10"></i>
                                </div>
                                <span className="nav-link-text">مهمة جديدة</span>
                            </Link>
                        </li>
                    ) : ""}
                    {currentUser?.role=="employee"?
                    <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === '/allTasks' ? "active" : ""}`} to="/allTasks">
                        <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                            <i className="fas fa-tasks text-warning text-sm opacity-10"></i>
                        </div>
                        <span className="nav-link-text">نافذة العمل</span>
                    </Link>
                    </li>
                    :
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === '/allTasks' ? "active" : ""}`} to="/allTasks">
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-tasks text-warning text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text">عرض جميع المهام</span>
                        </Link>
                    </li>}
                    {currentUser?.role == "admin" ? (
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/wallet' ? "active" : ""}`} to="/wallet">
                                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="fas fa-wallet text-info text-sm opacity-10"></i>
                                </div>
                                <span className="nav-link-text">الخزنة</span>
                            </Link>
                        </li>
                    ) : ""}
                    {currentUser?.role == "manager" ? (
                        <li className="nav-item" onClick={SendTask}>
                            <Link className="nav-link" to="#">
                                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="fas fa-wallet text-info text-sm opacity-10"></i>
                                </div>
                                <span className="nav-link-text">تسجيل مصروف جديد</span>
                            </Link>
                        </li>
                    ) : ""}
                    {currentUser?.role == "admin" ? (
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/addUser' ? "active" : ""}`} to="/addUser">
                                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="fas fa-user-plus text-danger text-sm opacity-10"></i>
                                </div>
                                <span className="nav-link-text">اضافة مستخدم</span>
                            </Link>
                        </li>
                    ) : ""}
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/report' ? "active" : ""}`} to="/report">
                                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="fas fa-file-alt text-primary text-sm opacity-10"></i>
                                </div>
                                <span className="nav-link-text">التقارير</span>
                            </Link>
                        </li>
                    {currentUser?.role == "admin" || currentUser?.role == "manager" ? (
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/alluser' ? "active" : ""}`} to="/alluser">
                                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="fas fa-users-cog text-secondary text-sm opacity-10"></i>
                                </div>
                                <span className="nav-link-text">ادارة المستخدمين</span>
                            </Link>
                        </li>
                    ) : ""}
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === '/attendanceCalender' ? "active" : ""}`} to="/attendanceCalender">
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-calendar-alt text-success text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text">سجل الحضور</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === '/chat' ? "active" : ""}`} to="/chat">
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-envelope text-primary text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text">الرسائل</span>
                        </Link>
                    </li>
                    <li onClick={handleLogout} className="nav-item">
                        <Link className="nav-link" to="">
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-sign-out-alt text-danger text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text">تسجيل الخروج</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default SideNavbar
