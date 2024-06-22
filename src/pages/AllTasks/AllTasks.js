/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, getAllTasks } from '../../Redux/actions/taskActions'
import SideNavbar from '../../components/SideNavbar'
import TopNavbar from '../../components/TopNavbar'
import { DataTable } from 'simple-datatables'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const AllTasks = () => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const dispatch = useDispatch();
    const alltasks = useSelector(state => state.taskReducer.task);

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
        }).then(() => {
            window.location.reload();
        });
    }

    useEffect(() => {
        const handleButtonClick = (event) => {
            if (event.target.classList.contains('btn-remove')) {
                handleDelete(event.target.getAttribute('data-id'));
            }
        };
        document.addEventListener('click', handleButtonClick);
        return () => {
            document.removeEventListener('click', handleButtonClick);
        };
    }, []);

    return (
        <>
            <SideNavbar />
            <div className="main-content" id="panel">
                <TopNavbar />
                <div className='mt-4'></div>
                <div className="container">
                    <div className='card rtl'>
                        <div className="d-sm-flex justify-content-between mt-4"></div>
                        <div className="card-header rtl">
                            <div className="d-flex justify-content-between">
                                <div>
                                    <h5 className="mb-0">جميع المهام</h5>
                                    <p className="text-sm mb-0">يمكن عرض او اضافه بيانات جديده.</p>
                                </div>
                                <div>
                                    <Link to="/newTask" className="btn btn-icon bg-gradient-info CustomColorFunction">
                                        <p className="text-xl font-weight-bold mb-0">موضوع جديد</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='table-responsive p-2 text-center'>
                            <table className="table table-striped align-items-center" id='myTable'>
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
                                    {Array.isArray(alltasks.data) && alltasks.data.length > 0 ? (
                                        alltasks.data.slice(0,25).map((item) => (
                                            <tr key={item._id}>
                                                <td>{item.registration_date}</td>
                                                <td>{item.code}</td>
                                                <td>{item.department}</td>
                                                <td>{item.subject}</td>
                                                <td>{item.info}</td>
                                                <td>{item.notes}</td>
                                                <td>قيد الإنتظار</td>
                                                <td>
                                                    <button type="button" className="btn btn-primary btn-edit" data-id={item._id}>تعديل</button>
                                                    <button type="button" className="btn btn-danger btn-remove mx-2" data-id={item._id}>حذف</button>
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
        </>
    );
}

export default AllTasks;
