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
import { getAllEmployeeLastJobs } from '../../Redux/actions/employeeLastJobAcion';

const AllReports = () => {
    const dispatch = useDispatch();
    const alltasks = useSelector(state => state.taskReducer.task);
    const allemplyeelastjob = useSelector(state => state.employeeLastJobReducer.emplyeeLastJob);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [amountReceived, setAmountReceived] = useState('');
    const [selectedReport, setSelectedReport] = useState('');

    useEffect(() => {
        const getWallets = async () => {
            await Promise.all([
                dispatch(getAllEmployeeLastJobs()),
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
            console.log(allemplyeelastjob)
            return () => {
                dataTable.destroy();
            };
        }
    }, [dataLoaded]);

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

    const handleShowReport = (report) => {
        setSelectedReport(report);
        setShowReportModal(true);
    };

    return (
        <>
            <SideNavbar />
            <div className="main-content" id="panel">
                <TopNavbar />
                <div className="container my-5 bg-white">
                    <div className='card'>
                        <div className="card-header rtl">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h5 className="mb-0">جميع التقارير</h5>
                                    {/* <p className="text-sm mb-0">يمكن عرض او اضافه بيانات للمواضيع التي تم ارسالها.</p> */}
                                </div>
                                <div>
                                    {/* <div className="btn btn-icon bg-gradient-info CustomColorFunction" onClick={SendTask}> */}
                                        {/* <p className="text-xl font-weight-bold mb-0">تسجيل مصروفات جديده</p> */}
                                    {/* </div> */}
                                </div> 
                            </div>
                        </div>
                        <div className='card-body'>
                            <table id='wallet-table' className="table table-dark table-striped table-bordered text-center">
                                <thead className=''>
                                    <tr>
                                        <th className="bg-dark">الإجراء</th>
                                        <th className="bg-dark">التقرير</th>
                                        <th className="bg-dark">التفاصيل</th>
                                        <th className="bg-dark">العنوان</th>
                                        <th className="bg-dark">القسم</th>
                                        <th className="bg-dark">الكود</th>
                                    </tr>
                                </thead>
                                <tbody id="tableData">
                                    {Array.isArray(allemplyeelastjob.data) && allemplyeelastjob.data.length > 0 && allemplyeelastjob.data.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <button type="button" className="btn btn-success" onClick={() => handleEdit(item)}>قبول</button>
                                                <button type="button" className="btn btn-danger mx-2" onClick={() => handleDelete(item._id)}>رفض</button>
                                            </td>
                                            <td>
                                                <span className="text-success" style={{ cursor: 'pointer' }} onClick={() => handleShowReport(item.report)}>report</span>
                                            </td>
                                            <td>{item.info}</td>
                                            <td>{item.subject}</td>
                                            <td>{item.department}</td>
                                            <td>{item.code}</td>
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

            {/* Report Modal */}
            <Modal show={showReportModal} onHide={() => setShowReportModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>التقرير</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <div className="form-group">
                        <p>{selectedReport}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowReportModal(false)}>
                        إغلاق
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AllReports;
