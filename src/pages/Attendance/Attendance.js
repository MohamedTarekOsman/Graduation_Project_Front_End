import React, { useEffect } from 'react'
import SideNavbar from '../../components/SideNavbar'
import TopNavbar from '../../components/TopNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAttendance } from '../../Redux/actions/attendanceAction'

const Attendance = () => {
  const dispatch=useDispatch()
  const AllAttendances=useSelector(state=>state.attendanceReducer.attendances)
  useEffect(()=>{
    const getAllattendance=async()=>{
      await dispatch(getAllAttendance())
    }
    getAllattendance()
    
  },[])

    return <> 
    <SideNavbar/>
    <main class="main-content position-relative border-radius-lg p-3 "> 
    <TopNavbar/>
    <div className=''>
    
    <div className='row m-6'>
    
    
    </div>
    
        </div>
        <table className="table    table-bordered  text-center mt-5">
                <thead className='text-light'>
                    <th className="bg-success">  العمليات </th>
                    <th className="bg-success"> تاريخ الاضافة</th>
                    <th className="bg-success">اسم المستخدم</th>
                    <th className="bg-success">الدور</th>
                    <th className="bg-success">الاسم</th>
                    
                    
                </thead>
                <tbody id="tableData">
          <tr>
                        <td className='bg-success'> <input class="form-control  " type="text" name=" first name" placeholder="بحث بلعمليات" required /></td>
                        <td className="bg-success">  <input class="form-control " type="text" name=" first name" placeholder="بحث بتاريخ الاضافه" required /></td>
                        <td className="bg-success"> <input class="form-control  " type="text" name=" first name" placeholder="بحث باسم المستخدم" required /></td>
                        <td className="bg-success">
                        <input class="form-control  " type="text" name=" first name" placeholder="بحث بالدور" required />
        </td>
        <td className="bg-success"> <input class="form-control   " type="text" name=" first name" placeholder="بحث بالاسم " required /></td>
        
     
    
    
        </tr>
        
        <tr>
                        <td> <button type="button" class="btn btn-primary">اذهب ل اعدادات الادمن</button></td>
                        <td className="">None</td>
                        <td className="">admin</td>
                        <td className="">admin</td>
                        
        <td className="">mohamed</td>
        
      
     
    
    
        </tr>
    
    {
      AllAttendances.data?(
        AllAttendances.data.map((item,index)=><tr>
        <td> <button type="button" class="btn btn-primary">تغير كلمة السر</button>
        <button type="button" class="btn btn-danger mx-2">حذف</button>
        <button type="button" class="btn btn-success">تعديل</button>
        </td>
        <td className="">{new Date(item.updatedAt).getDate()}/{new Date(item.updatedAt).getMonth() + 1}/{new Date(item.updatedAt).getFullYear()}</td>
        <td className="">{item.userId.username}</td>
        <td className="">{item.userId.role}</td>
        
<td className="">{item.firstName} {item.lastName}</td>





</tr>)
      ):''
    }
        
    
        
    
    
    
        </tbody>
        </table>
        <div>

    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 text-center" id="exampleModalLabel"> Edit User</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
          <div className="mb-3">
      <label for="formGroupExampleInput" className="form-label text-muted">الاسم الاول</label>
      <input type="text" className="form-control" id="formGroupExampleInput" />
    </div>
    <div className="mb-3">
      <label for="formGroupExampleInput" className="form-label text-muted">الاسم الاخير </label>
      <input type="text" className="form-control" id="formGroupExampleInput" />
    </div>
    <div className="mb-3">
      <label for="formGroupExampleInput" className="form-label text-muted">اسم المستخدم </label>
      <input type="text" class="form-control" id="formGroupExampleInput" />
    </div>
    <div>
        <p className='text-muted'>الدور</p>
        <select class="form-select" aria-label="Default select example">
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
    </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
            <button type="button" class="btn btn-primary">Save </button>
          </div>
        </div>
      </div>
    </div>
        </div>
    </main>
    </>
}

export default Attendance