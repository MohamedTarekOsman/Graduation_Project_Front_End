/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks, updateTask } from '../../Redux/actions/taskActions';
import Swal from 'sweetalert2';
import DataTable from 'datatables.net-dt';
import SideNavbar from '../../components/SideNavbar';
import TopNavbar from '../../components/TopNavbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { deleteEmployeeLastJob, getAllEmployeeLastJobs, updateEmployeeLastJob } from '../../Redux/actions/employeeLastJobAcion';
import { useSearchParams } from 'react-router-dom';

const AllReports = () => {
    const user=JSON.parse(localStorage.getItem('user'))
    const [searchParams] = useSearchParams();
    const taskcode = searchParams.get('taskcode');
    const dispatch = useDispatch();
    const alltasks = useSelector(state => state.taskReducer.task);
    const allemplyeelastjob = useSelector(state => state.employeeLastJobReducer.emplyeeLastJob);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [taskselected, setTaskselected] = useState(null);
    const [taskselectedRefuse, setTaskselectedRefuse] = useState(null);
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

    const handleAccept = async(task) => {
        setTaskselected(alltasks.data.filter(onetask => onetask.code==task.code))
        await dispatch(updateEmployeeLastJob(task._id,{
            status:'تم القبول'
        }));
        Swal.fire({
            title: 'تم القبول!',
            text: 'تم قبول التقرير بنجاح.',
            icon: 'success',
        }).then(()=>{
            dispatch(getAllEmployeeLastJobs())
        })
    };
    useEffect(()=>{
        if(taskselected!=null){
            dispatch(updateTask(taskselected[0]._id,{
                status:"تم القبول"
            }))
            console.log(taskselected)
        }
    },[taskselected])

    const handleRefuse= async (task) => {
        setTaskselectedRefuse(alltasks.data.filter(onetask => onetask.code==task.code))
        await dispatch(updateEmployeeLastJob(task._id,{
            status:'مرفوض'
        }));
        Swal.fire({
            title: 'تم الرفض!',
            text: 'تم رفض التقرير بنجاح.',
            icon: 'Warning',
        }).then(()=>{
            dispatch(getAllEmployeeLastJobs())
        })
    };
    useEffect(()=>{
        if(taskselectedRefuse!=null){
            dispatch(updateTask(taskselectedRefuse[0]._id,{
                status:"مرفوض"
            }))
            console.log(taskselected)
        }
    },[taskselectedRefuse])

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
                        <div class="table-responsive text-center m-0 ">
                        
                            <table id='wallet-table' className="table table-dark table-striped table-bordered text-center align-items-center">
                                <thead className=''>
                                    <tr>
                                        <th className="bg-dark">{user?.role=="employee"?"الحالة":"الإجراء"}</th>
                                        <th className="bg-dark">التقرير</th>
                                        <th className="bg-dark">التفاصيل</th>
                                        <th className="bg-dark">العنوان</th>
                                        <th className="bg-dark">القسم</th>
                                        <th className="bg-dark">الكود</th>
                                    </tr>
                                </thead>
                                <tbody id="tableData">
                                    {user?.role=="employee"?taskcode==null?Array.isArray(allemplyeelastjob.data) && allemplyeelastjob.data.length > 0 && allemplyeelastjob.data.filter(item=>item.userId==user._id).map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                {item.status}
                                                </td>
                                            <td>
                                                {item.report}
                                            </td>
                                            <td>{item.info}</td>
                                            <td>{item.subject}</td>
                                            <td>{item.department}</td>
                                            <td>{item.code}</td>
                                        </tr>
                                    )):Array.isArray(allemplyeelastjob.data) && allemplyeelastjob.data.length > 0 && allemplyeelastjob.data.filter(task=>task.code==taskcode).map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                {item.status}
                                                </td>
                                            <td>
                                                {item.report}
                                            </td>
                                            <td>{item.info}</td>
                                            <td>{item.subject}</td>
                                            <td>{item.department}</td>
                                            <td>{item.code}</td>
                                        </tr>
                                    ))

                                    :
                                    
                                    taskcode==null?Array.isArray(allemplyeelastjob.data) && allemplyeelastjob.data.length > 0 && allemplyeelastjob.data.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                {item.status=="تم الإرسال"?<>
                                                    <button type="button" className="btn btn-success" onClick={() => handleAccept(item)}>قبول</button>
                                                <button type="button" className="btn btn-danger mx-2" onClick={() => handleRefuse(item)}>رفض</button>
                                                </>:item.status}
                                                </td>
                                            <td>
                                                {item.report}
                                            </td>
                                            <td>{item.info}</td>
                                            <td>{item.subject}</td>
                                            <td>{item.department}</td>
                                            <td>{item.code}</td>
                                        </tr>
                                    )):Array.isArray(allemplyeelastjob.data) && allemplyeelastjob.data.length > 0 && allemplyeelastjob.data.filter(task=>task.code==taskcode).map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                            {item.status=="تم الإرسال"?<>
                                                    <button type="button" className="btn btn-success" onClick={() => handleAccept(item)}>قبول</button>
                                                <button type="button" className="btn btn-danger mx-2" onClick={() => handleRefuse(item)}>رفض</button>
                                                </>:item.status}</td>
                                            <td>
                                                {item.report}
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
            </div>


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
