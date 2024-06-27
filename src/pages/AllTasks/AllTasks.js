/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getAllTasks, updateTask } from '../../Redux/actions/taskActions';
import SideNavbar from '../../components/SideNavbar';
import TopNavbar from '../../components/TopNavbar';
import DataTable from 'datatables.net-dt';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components
import { deleteEmployeeLastJob } from '../../Redux/actions/employeeLastJobAcion';

const AllTasks = () => {
    const user=JSON.parse(localStorage.getItem('user'))
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [updateload, setUpdateLoad] = useState(false)
    const [currentTask, setCurrentTask] = useState(null);
    const [updatedTask, setUpdatedTask] = useState({});
    const dispatch = useDispatch();
    const alltasks = useSelector(state => state.taskReducer.task);
    const updatedtask = useSelector(state => state.taskReducer.updateTask);

    useEffect(() => {
        const getTasks = async () => {
            await dispatch(getAllTasks());
            setDataLoaded(true);
        };
        getTasks();
    }, [dispatch]);

    useEffect(() => {
        let dataTable;
        if (dataLoaded) {
            dataTable = new DataTable("#myTable", {
                searchable: true,
                perPage: 25
            });
        }

        // Cleanup function to destroy DataTable instance
        return () => {
            if (dataTable) {
                dataTable.destroy();
                dataTable = null;  // Ensure the reference is cleared
            }
        };
    }, [dataLoaded, alltasks]);

    const handleDelete = async (id) => {
        await dispatch(deleteTask(id));
        Swal.fire({
            title: 'عملية ناجحة',
            text: 'تم ازالة المهمة بنجاح',
            icon: 'success',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 1500,
            timerProgressBar: true
        }).then(()=>{
            window.location.reload();
        })
    }

    const handleEdit = (task) => {
        setCurrentTask(task);
        setUpdatedTask(task);
        setShowModal(true);
    }


    const handleConfirmUpdate = async () => {
        await dispatch(updateTask(currentTask._id, updatedTask))
        setUpdateLoad(true)
        setShowModal(false);
        dispatch(getAllTasks()); 
    }

    useEffect(()=>{
        if(updateload===true){
            if(updatedtask.error){
                Swal.fire({
                    title: 'عملية غير ناجحة',
                    text: 'هذا الكود مستخدم من قبل',
                    icon: 'error',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    timer: 1500,
                    timerProgressBar: true
                }).then(() => {
                    window.location.reload();
                });
            }else if(updatedtask.data){
                Swal.fire({
                    title: 'عملية ناجحة',
                    text: 'تم تحديث المهمة بنجاح',
                    icon: 'success',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    timer: 1500,
                    timerProgressBar: true
                }).then(() => {
                    window.location.reload();
                });
            }
        }
    },[updateload])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    useEffect(() => {
        const handleButtonClick = (event) => {
            if (event.target.classList.contains('btn-remove')) {
                handleDelete(event.target.getAttribute('data-id'));
            } else if (event.target.classList.contains('btn-edit')) {
                const task = alltasks.data.find(t => t._id === event.target.getAttribute('data-id'));
                handleEdit(task);
            }
        };
        document.addEventListener('click', handleButtonClick);
        return () => {
            document.removeEventListener('click', handleButtonClick);
        };
    }, [alltasks]);
    const handleundo=async(task)=>{
        console.log(task)
        await dispatch(deleteEmployeeLastJob(task.code))
        await dispatch(updateTask(task._id, {
            userId:null,
            sent:false,
            status:"لم ترسل"
        }))
        Swal.fire({
            title: 'عملية ناجحة',
            text: "تم التراجع عن ارسال الكود",
            icon: 'success',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            timer: 1500,
            timerProgressBar: true
        }).then(() => {
            dispatch(getAllTasks())
        });
    }

    return (
        <>
            <SideNavbar />
            <div className="main-content" id="panel">
                <TopNavbar />
                <div className='mt-4'></div>
                <div className="container">
                    <div className='card '>
                        <div className="d-sm-flex justify-content-between mt-4"></div>
                        <div className="card-header rtl">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h5 className="mb-0">جميع المهام</h5>
                                    <p className="text-sm mb-0">يمكن عرض او اضافه بيانات جديده.</p>
                                </div>
                                {user?.role=="employee"?"":
                                <div>
                                <Link to="/newTask" className="btn btn-icon bg-gradient-info CustomColorFunction">
                                    <p className="text-xl font-weight-bold mb-0">موضوع جديد</p>
                                </Link>
                            </div>
                                }
                                
                            </div>
                        </div>
                        <div className='table-responsive p-2 text-center'>
                            <table className="table table-striped align-items-center rtl" id='myTable'>
                                <thead>
                                    <tr>
                                        <th className='bg-success text-white text-center'>تاريخ التسجيل</th>
                                        <th className='bg-success text-white text-center'>الكود</th>
                                        <th className='bg-success text-white text-center'>القسم</th>
                                        <th className='bg-success text-white text-center'>العنوان</th>
                                        <th className='bg-success text-white text-center'>التفاصيل</th>
                                        <th className='bg-success text-white text-center'>الملاحظات</th>
                                        <th className='bg-success text-white text-center'>الحالة</th>
                                        <th className='bg-success text-white text-center'>الإجراء</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user?.role=="employee"?
                                    Array.isArray(alltasks.data) && alltasks.data.length > 0 ? (
                                        alltasks.data.filter(item=>item.userId==user?._id).filter(item=>item.status!="تم القبول").map((item) => (
                                            <tr key={item._id}>
                                                <td>{item.registration_date}</td>
                                                <td>{item.code}</td>
                                                <td>{item.department}</td>
                                                <td>{item.subject}</td>
                                                <td>{item.info}</td>
                                                <td>{item.notes}</td>
                                                <td>{user?.role=="employee"&&item.status=="تم الإرسال"?"لم ترسل":item.status}</td>
                                                <td>
                                                {((user?.role=="admin"&&(item.status=='في انتظار القبول او الرفض'))||(user?.role=="manager"&&(item.status=='في انتظار القبول او الرفض')))?
                                                <Link to={`/report?taskcode=${item.code}`}>
                                                    <button type="button" className="btn btn-primary">مراجعة</button>
                                                </Link>
                                                :((user?.role=="admin"&&(item.status!="لم ترسل"))||(user?.role=="manager"&&(item.status!="لم ترسل")))? <button type="button" className="btn btn-danger" onClick={()=>{handleundo(item)}}>تراجع</button>:(user?.role === "admin" || user?.role === "manager") ? (
                                                        <>
                                                            <button type="button" className="btn btn-primary btn-edit" data-id={item._id}>تعديل</button>
                                                            <button type="button" className="btn btn-danger btn-remove mx-2" data-id={item._id}>حذف</button>
                                                        </>
                                                    ) : user?.role === 'employee' && item.status === "تم الإرسال" ? (
                                                        <Link to={`/newReport?taskcode=${item.code}`}>
                                                            <button type='submit' className='btn btn-primary mt-3' style={{ float: 'right' }}>ارسال التقرير</button>
                                                        </Link>
                                                    ) : "قيد المراجعة"}
                                                </td>
                                            </tr>
                                        ))
                                    ) : ""
                                    :Array.isArray(alltasks.data) && alltasks.data.length > 0 ? (
                                        alltasks.data.filter(item=>item.status!="تم القبول").map((item) => (
                                            <tr key={item._id}>
                                                <td>{item.registration_date}</td>
                                                <td>{item.code}</td>
                                                <td>{item.department}</td>
                                                <td>{item.subject}</td>
                                                <td>{item.info}</td>
                                                <td>{item.notes}</td>
                                                <td>{user?.role=="employee"&&item.status=="تم الإرسال"?"لم ترسل":item.status}</td>
                                                <td>
                                                {((user?.role=="admin"&&(item.status=='في انتظار القبول او الرفض'))||(user?.role=="manager"&&(item.status=='في انتظار القبول او الرفض')))?
                                                <Link to={`/report?taskcode=${item.code}`}>
                                                    <button type="button" className="btn btn-primary">مراجعة</button>
                                                </Link>
                                                :((user?.role=="admin"&&(item.status!="لم ترسل"))||(user?.role=="manager"&&(item.status!="لم ترسل")))? <button type="button" className="btn btn-danger" onClick={()=>{handleundo(item)}}>تراجع</button>:(user?.role === "admin" || user?.role === "manager") ? (
                                                        <>
                                                            <button type="button" className="btn btn-primary btn-edit" data-id={item._id}>تعديل</button>
                                                            <button type="button" className="btn btn-danger btn-remove mx-2" data-id={item._id}>حذف</button>
                                                        </>
                                                    ) : user?.role === 'employee' && item?.status === "تم الإرسال" ? (
                                                        <Link to={`/newReport?taskcode=${item.code}`}>
                                                            <button type='submit' className='btn btn-primary mt-3' style={{ float: 'right' }}>ارسال التقرير</button>
                                                        </Link>
                                                    ) : "قيد المراجعة"}
                                                </td>
                                            </tr>
                                        ))
                                    ) : ""}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>تعديل المهمة</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label>الكود</label>
                            <input
                                type="text"
                                className="form-control"
                                name="code"
                                value={updatedTask.code || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>القسم</label>
                            <input
                                type="text"
                                className="form-control"
                                name="department"
                                value={updatedTask.department || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>العنوان</label>
                            <input
                                type="text"
                                className="form-control"
                                name="subject"
                                value={updatedTask.subject || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>التفاصيل</label>
                            <input
                                type="text"
                                className="form-control"
                                name="info"
                                value={updatedTask.info || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>الملاحظات</label>
                            <input
                                type="text"
                                className="form-control"
                                name="notes"
                                value={updatedTask.notes || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>إغلاق</Button>
                    <Button variant="primary" onClick={handleConfirmUpdate}>حفظ التغييرات</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AllTasks;
