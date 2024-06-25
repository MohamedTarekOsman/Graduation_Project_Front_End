/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, getOneTask } from '../../Redux/actions/taskActions'
import SideNavbar from '../../components/SideNavbar'
import TopNavbar from '../../components/TopNavbar'
import  DataTable  from 'datatables.net-dt'
import { Link, useSearchParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const OneTask = () => {
    const [searchParams] = useSearchParams();
    const taskcode = searchParams.get('taskcode');
    // const {code}=useParams()
    const [dataLoaded, setDataLoaded] = useState(false);
    const dispatch = useDispatch();
    const task = useSelector(state => state.taskReducer.oneTask);
    const [currentUser, setCurrentUser] = useState(null);

    // Fetch current user from local storage once on component mount
    useEffect(() => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setCurrentUser(storedUser);
    }, []);

    useEffect(() => {
        const getTasks = async () => {
            await dispatch(getOneTask(taskcode));
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
            console.log(task)
        }

        // Cleanup function to destroy DataTable instance
        return () => {
            if (dataTable) {
                dataTable.destroy();
                dataTable = null;  // Ensure the reference is cleared
            }
        };
    }, [dataLoaded, task]);

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
                    <div className='card '>
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
                                    {task.data? (
                                            <tr key={task.data[0]._id}>
                                                <td>{task.data[0].registration_date}</td>
                                                <td>{task.data[0].code}</td>
                                                <td>{task.data[0].department}</td>
                                                <td>{task.data[0].subject}</td>
                                                <td>{task.data[0].info}</td>
                                                <td>{task.data[0].notes}</td>
                                                <td>قيد الإنتظار</td>
                                                <td>
                                                    {currentUser?.role==="admin"?"":
                                                        <Link to={`/newReport?taskcode=${task.data[0].code}`}>
                                                            <button type="button" className="btn btn-primary btn-edit">كتابة تقرير</button>
                                                        </Link>
                                                    }
                                                   
                                                </td>
                                            </tr>
                                        
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

export default OneTask;