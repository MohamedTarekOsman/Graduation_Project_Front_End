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
    const dispatch=useDispatch()
    const alltasks=useSelector(state=>state.taskReducer.task)

    useEffect(()=>{
      const getTasks=async()=>{
        await dispatch(getAllTasks())
        setDataLoaded(true)
      }
      getTasks()
    },[])
    useEffect(() => {
      if (dataLoaded) {
        const dataTable = new DataTable("#myTable", {
          searchable: true,
          perPage:5
        });
        console.log(alltasks)
        return () => {
          dataTable.destroy();
        };
      }
    }, [dataLoaded]);

    const handleDelete=async(id) => {
      console.log(id)
      await dispatch(deleteTask(id))
      Swal.fire({
        title: 'عملية ناجحة',
        text: 'تم ازالة المهمة بنجاح',
        icon: 'success',
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 1500,
        timerProgressBar: true
    }).then(async()=>{
      await dispatch(getAllTasks())
    })
    }
    return (
        <>
            <SideNavbar/>
            <div className="main-content" id="panel">
            <TopNavbar/>
            <div className='mt-4'>
            </div>
            <div className="container">
            <div className='card rtl'>
            <div class="d-sm-flex justify-content-between mt-4">
            

          </div>
            <div class="card-header rtl">
          <div class="d-flex justify-content-between">
          <div >
              <h5 class="mb-0 ">جميع المهام</h5>
              <p class="text-sm mb-0"> يمكن عرض او اضافه بيانات جديده. </p>
            </div>
          <div> 
            <Link to="/newTask" class="btn btn-icon bg-gradient-info CustomColorFunction">
                <p class="text-xl font-weight-bold mb-0">موضوع جديد </p>
              </Link>
            </div>
           
          </div>

        </div>
          <div className='table-responsive p-2 text-center'>
          <table className="table table-striped  align-items-center" id='myTable'   >
                <thead className=''>
                <th className='bg-success text-white text-center'>تاريخ التسجيل</th>
                <th className='bg-success text-white text-center'>الإجراء</th>
                <th className='bg-success text-white text-center'>الملاحظات</th>
                <th className='bg-success text-white text-center'>التفاصيل</th>
                <th className='bg-success text-white text-center'>العنوان</th>
                <th className='bg-success text-white text-center'>القسم</th>
                <th className='bg-success text-white text-center'>الكود</th>
                
                </thead>
                <tbody id="tableData">
                  {Array.isArray(alltasks.data) && alltasks.data.length > 0 ?(alltasks.data.map((item,index)=>(<tr>
                    <td>{item.registration_date}</td>
                    <td>{item.code}</td>
                    <td>{item.department}</td>
                    <td>{item.subject}</td>
                    <td>{item.info}</td>
                    <td>{item.notes}</td>
                    <td>
                        <button type="button" class="btn btn-success">ارسال</button>
                        <button type="button" class="btn btn-danger mx-2">تعديل</button>
                        <button type="button" class="btn btn-primary" onClick={()=>handleDelete(item._id)}>حذف</button>
                    </td>
                </tr>))):""
                  }
                    
        </tbody>
        </table>
            </div>
            </div>
            
        </div>
        </div>
        </>
      )
}

export default AllTasks