/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'

const SideNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4" id="sidenav-main">
            <div className="sidenav-header">
                <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
                <a className="navbar-brand m-0">
                    <img src={logo} className="navbar-brand-img h-100 rounded-circle" alt="main_logo" />
                    <span className="ms-1 font-weight-bold">PapperLess</span>
                </a>
            </div>
            <hr className="horizontal dark mt-0" />
            <div className="w-auto" id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className={location.pathname === '/' ? "nav-link active" : "nav-link"} to="/">
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-home text-primary text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text">الرئيسية</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={location.pathname === '/newTask' ? "nav-link active" : "nav-link"} to="/newTask">
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-plus-square text-primary text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text">مهمة جديدة</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={location.pathname === '/allTasks' ? "nav-link active" : "nav-link"} to="/allTasks">
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-tasks text-primary text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text">عرض جميع المهام</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={location.pathname === '/wallet' ? "nav-link active" : "nav-link"} to="/wallet">
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-wallet text-primary text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text">الخزنة</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={location.pathname === '/addUser' ? "nav-link active" : "nav-link"} to="/addUser">
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-user-plus text-primary text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text">اضافة مستخدم</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={location.pathname === '/alluser' ? "nav-link active" : "nav-link"} to="/alluser">
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-users-cog text-primary text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text">ادارة المستخدمين</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={location.pathname === '/attendanceCalender' ? "nav-link active" : "nav-link"} to="/attendanceCalender">
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-calendar-alt text-primary text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text">سجل الحضور</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={location.pathname === '/messages' ? "nav-link active" : "nav-link"} to="/messages">
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-envelope text-primary text-sm opacity-10"></i>
                            </div>
                            <span className="nav-link-text">الرسائل</span>
                        </Link>
                    </li>
                    <li onClick={handleLogout} className="nav-item">
                        <Link className="nav-link" to="">
                            <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                                <i className="fas fa-sign-out-alt text-primary text-sm opacity-10"></i>
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
