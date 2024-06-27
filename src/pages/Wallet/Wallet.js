import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWallet, createWallet, deleteWallet, updateWallet } from '../../Redux/actions/walletAction'; // Update with your specific actions
import { getAllTasks } from '../../Redux/actions/taskActions';
import Swal from 'sweetalert2';
import DataTable from 'datatables.net-dt';
import SideNavbar from '../../components/SideNavbar';
import TopNavbar from '../../components/TopNavbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Wallet = () => {
    const dispatch = useDispatch();
    const user=JSON.parse(localStorage.getItem('user'))
    const alltasks = useSelector(state => state.taskReducer.task);
    const wallet = useSelector(state => state.walletReducer.wallet);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [amountReceived, setAmountReceived] = useState('');
    const [totalAmountReceived, setTotalAmountReceived] = useState(0);

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
        if (dataLoaded) {
            const dataTable = new DataTable('#wallet-table', {
                searchable: true,
            });

            return () => {
                dataTable.destroy();
            };
        }
    }, [dataLoaded]);

    useEffect(() => {
        if (wallet.data && wallet.data.length > 0) {
            const totalAmount = wallet.data.reduce((acc, item) => acc + parseFloat(item.amount_received_from_customer || 0), 0);
            setTotalAmountReceived(totalAmount);
        } else {
            setTotalAmountReceived(0);
        }
    }, [wallet.data]);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
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

    const handleEdit = (walletItem) => {
        setEditItem(walletItem);
        setAmountReceived(walletItem.amount_received_from_customer || '');
        setShowEditModal(true);
    };

    const saveEditedItem = () => {
        if (!editItem) return; // Return if editItem is null or undefined

        const updatedItem = {
            ...editItem,
            amount_received_from_customer: amountReceived,
        };

        dispatch(updateWallet(editItem._id, updatedItem)); // Pass editItem._id and updatedItem to updateWallet
        setShowEditModal(false);
        Swal.fire({
            title: 'تم التعديل!',
            text: 'تم تحديث السجل بنجاح.',
            icon: 'success',
        });
        dispatch(getAllWallet());
    };

    const handleDelete = async (walletId) => {
        Swal.fire({
            title: 'هل أنت متأكد؟',
            text: 'سيتم حذف هذا السجل نهائيًا!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'نعم، احذف',
            cancelButtonText: 'إلغاء',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(deleteWallet(walletId));
                Swal.fire({
                    title: 'تم الحذف!',
                    text: 'تم حذف السجل بنجاح.',
                    icon: 'success',
                });
                dispatch(getAllWallet()); 
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
                        <div className="col-xl-6 col-md-6 mt-2">
                            <div className="card card-stats">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <h5 className="card-title text-uppercase text-muted mb-0">إجمالي المهام</h5>
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
                        <div className="col-xl-6 col-md-6 mt-2">
                            <div className="card card-stats">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <h5 className="card-title text-uppercase text-muted mb-0">إجمالي التكلفة</h5>
                                            <span className="h3 font-weight-bold mb-0">
                                                {totalAmountReceived} <span style={{ fontWeight: "bold" }}>EGP</span>
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
                                        <th className="bg-dark">الإجراء</th>
                                        <th className="bg-dark">المستلم</th>
                                        <th className="bg-dark">المبلغ</th>
                                        <th className="bg-dark">التاريخ</th>
                                        <th className="bg-dark">الكود</th>

                                    </tr>
                                </thead>
                                <tbody id="tableData">
                                    {Array.isArray(wallet.data) && wallet.data.length > 0 && wallet.data.map((walletItem, index) => (
                                        <tr key={index}>
                                            <td>
                                                <button type="button" className="btn btn-primary" onClick={() => handleEdit(walletItem)}>تعديل</button>
                                                <button type="button" className="btn btn-danger mx-2" onClick={() => handleDelete(walletItem._id)}>حذف</button>
                                            </td>
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

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>تعديل السجل</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="amount_received_from_customer">المبلغ المستلم:</label>
                        <input
                            type="number"
                            className="form-control"
                            id="amount_received_from_customer"
                            value={amountReceived}
                            onChange={(e) => setAmountReceived(e.target.value)}
                            min="0"
                            placeholder="Enter amount of money with Egyptian pound"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        إلغاء
                    </Button>
                    <Button variant="primary" onClick={saveEditedItem}>
                        حفظ التغييرات
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Wallet;
