/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import SideNavbar from '../../components/SideNavbar';
import TopNavbar from '../../components/TopNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWallet, createWallet } from '../../Redux/actions/walletAction';
import { getAllTasks } from '../../Redux/actions/taskActions';
import Swal from 'sweetalert2';
import { DataTable } from 'simple-datatables';

const Wallet = () => {
    const dispatch = useDispatch();
    const alltasks = useSelector(state => state.taskReducer.task);
    const wallet = useSelector(state => state.walletReducer.wallet);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        const getWallets = async () => {
            await Promise.all([
                dispatch(getAllWallet()),
                dispatch(getAllTasks())
            ]);
            setDataLoaded(true);
        };
        getWallets();
    }, []);

    useEffect(() => {
        if (dataLoaded) {
            const dataTable = new DataTable('#wallet-table', {
                searchable: true,
            });

            return () => {
                dataTable.destroy();
            };
        }
    }, [dataLoaded]);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

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
                    alltasks.data.filter(item => item.sent === false).forEach(function (task) {
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
        <>
            <SideNavbar />
            <div className="main-content" id="panel">
                <TopNavbar />
                <div className='container py-4'>
                    <div className="row align-items-center ">
                        <div className="col-xl-3 col-md-6 mt-2">
                            <div className="card card-stats">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <h5 className="card-title text-uppercase text-muted mb-0">الإجمالي</h5>
                                            <span className="h3 font-weight-bold mb-0">
                                                {Array.isArray(alltasks.data) && alltasks.data.length > 0 ? (
                                                    alltasks.data.length
                                                ) : ""}
                                            </span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-gradient-primary shadow-primary text-center rounded-circle">
                                                <i className="fas fa-chart-pie text-lg opacity-10" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-sm"></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mt-2">
                            <div className="card card-stats">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <h5 className="card-title text-uppercase text-muted mb-0">لم ترسل</h5>
                                            <span className="h3 font-weight-bold mb-0">
                                                {Array.isArray(alltasks.data) && alltasks.data.length > 0 ? (
                                                    alltasks.data.filter((item) => item.sent === false).length
                                                ) : ""}
                                            </span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-gradient-warning shadow-warning text-center rounded-circle">
                                                <i className="fas fa-paper-plane text-lg opacity-10" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-sm"></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mt-2">
                            <div className="card card-stats">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <h5 className="card-title text-muted mb-0" style={{ fontSize: '18.2px' }}>في انظار القبول او الرفض</h5>
                                            <span className="h3 font-weight-bold mb-0">
                                                {Array.isArray(alltasks.data) && alltasks.data.length > 0 ? (
                                                    alltasks.data.filter((item) => item.status === "pending").length
                                                ) : ""}
                                            </span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                                                <i className="fas fa-hourglass-half text-lg opacity-10" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-sm"></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6 mt-2">
                            <div className="card card-stats">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <h5 className="card-title text-uppercase text-muted mb-0">المكتمله</h5>
                                            <span className="h3 font-weight-bold mb-0">
                                                {Array.isArray(alltasks.data) && alltasks.data.length > 0 ? (
                                                    alltasks.data.filter((item) => item.completed === "true").length
                                                ) : ""}
                                            </span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-gradient-danger shadow-danger text-center rounded-circle">
                                                <i className="fas fa-check-circle text-lg opacity-10" aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-3 mb-0 text-sm"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container my-5 bg-white">
                    <div className='card'>
                        <div className="card-header rtl">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h5 className="mb-0">جميع المصروفات</h5>
                                    <p className="text-sm mb-0">يمكن عرض او اضافه بيانات للمواضيع التي تم ارسالها.</p>
                                </div>
                                <div>
                                    <div className="btn btn-icon bg-gradient-info CustomColorFunction" onClick={SendTask}>
                                        <p className="text-xl font-weight-bold mb-0">تسجيل مصروفات جديده</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='card-body'>
                            <table id='wallet-table' className="table table-dark table-striped table-bordered text-center">
                                <thead className=''>
                                    <tr>
                                        <th className="bg-dark">المستلم</th>
                                        <th className="bg-dark">المبلغ</th>
                                        <th className="bg-dark">التاريخ</th>
                                        <th className="bg-dark">الكود</th>
                                    </tr>
                                </thead>
                                <tbody id="tableData">
                                    {Array.isArray(wallet.data) && wallet.data.length > 0 && wallet.data.map((walletItem, index) => (
                                        <tr key={index}>
                                            <td>{walletItem.receiver}</td>
                                            <td>{walletItem.amount_received_from_customer}</td>
                                            <td>{formatDate(walletItem.updatedAt)}</td>
                                            <td>{walletItem.code}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Wallet;
