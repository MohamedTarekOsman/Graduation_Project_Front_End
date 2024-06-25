/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import './SideNavbar.css' // Import the CSS file

const SideNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setCurrentUser(storedUser);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    }

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
                    {currentUser?.role == "admin" || currentUser?.role == "manager" ? (
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/newTask' ? "active" : ""}`} to="/newTask">
                                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="fas fa-plus-square text-success text-sm opacity-10"></i>
                                </div>
                                <span className="nav-link-text">مهمة جديدة</span>
                            </Link>
                        </li>
                    ) : ""}
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === '/allTasks' ? "active" : ""}`} to="/allTasks">
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-tasks text-warning text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text">عرض جميع المهام</span>
                        </Link>
                    </li>
                    {currentUser?.role == "admin" || currentUser?.role == "manager" ? (
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/wallet' ? "active" : ""}`} to="/wallet">
                                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="fas fa-wallet text-info text-sm opacity-10"></i>
                                </div>
                                <span className="nav-link-text">الخزنة</span>
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
                    {currentUser?.role == "admin" || currentUser?.role == "manager" ? (
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === '/report' ? "active" : ""}`} to="/report">
                                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="fas fa-file-alt text-primary text-sm opacity-10"></i>
                                </div>
                                <span className="nav-link-text">التقارير</span>
                            </Link>
                        </li>
                    ) : ""}
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
