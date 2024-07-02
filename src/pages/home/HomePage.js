/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from 'react'
import { Calendar } from 'fullcalendar'
import { IoTrashBin } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux'
import { getAllTasks } from '../../Redux/actions/taskActions'
import SideNavbar from '../../components/SideNavbar'
import TopNavbar from '../../components/TopNavbar'
import Swal from 'sweetalert2'
import flatpickr from 'flatpickr'
import { createNote, deleteNote, getAllNotes } from '../../Redux/actions/noteAction'
import { Link } from 'react-router-dom';
import { getAllUsers } from '../../Redux/actions/usersAction';
import { getAllWallet } from '../../Redux/actions/walletAction';
const HomePage = () => {
  const user=JSON.parse(localStorage.getItem('user'))
  const dispatch=useDispatch()
  const alltasks=useSelector(state=>state.taskReducer.task)
  const allnotes=useSelector(state=>state.noteReducer.notes)
  const allusers=useSelector(state=>state.userReducer.user)
  const allwallet=useSelector(state=>state.walletReducer.wallet)
  const [totalAmountReceived, setTotalAmountReceived] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  function padNumber(number) {
    return (number < 10 ? '0' : '') + number;
}
function addPrivateNote() {
  // Display the form inside SweetAlert
  Swal.fire({
      title: 'تسجيل ملاحظة ',
      html:
          '<div style="text-align: right; direction: rtl;">' +
          '<textarea id="noteContent" class="swal2-input text-md font-weight-bold " style="outline:none;width:100%;height:100px" placeholder="محتوى الملاحظة" style="width: 90%; height: 100px;"></textarea>' +
          '<div class="mb-3 d-flex rtl align-items-center input-group input-group-outline " style="width: 76%;">'+
          '<label for="date_and_time" class="me-2" style="width: 70px;">التاريخ والوقت:</label>' +
          '<input type="text" id="date_and_time" name="date_and_time" class="form-control flatpickr text-md text-success"  required>'+
          '</div>'+
          '</div>',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'اضافة ملاحظة',
    allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: {
          textarea: 'custom-textarea'
      },
      didOpen: function () {
          // Initialize Flatpicker in the SweetAlert modal
          flatpickr("#date_and_time", {
              enableTime: true,
              dateFormat: "Y-m-d H:i",
          });
      },preConfirm: function () {
          const noteContent = document.getElementById('noteContent').value;
          const date_and_time = document.getElementById('date_and_time').value;

          if (!date_and_time || !noteContent) {
              Swal.showValidationMessage('الرجاء ملء جميع الحقول اولا');
              return false;
          }

          // Convert the selected date_and_time to a JavaScript Date object
          const selectedDateTime = new Date(date_and_time);

          // Get the current time
          const currentDateTime = new Date();

          // Check if the selected date_and_time is greater than the current time
          if (selectedDateTime <= currentDateTime) {
              Swal.showValidationMessage('الرجاء اختيار وقت مستقبلي أكبر من الوقت الحالي.');
              return false;
          }

          return { date_and_time, noteContent };
      },

  }).then((result) => {
      if (result.isConfirmed) {
          const noteContent = document.getElementById('noteContent').value;
          const date_and_time = document.getElementById('date_and_time').value;
          try{
          dispatch(createNote({
            "user_id":user._id,
            "content":noteContent,
            "datetime":date_and_time
          }))
          Swal.fire({
            title: 'عملية ناجحة',
            text: 'تم تسجيل ملاحظة خاصة بنجاح.',
            icon: 'success',
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 1500,
        timerProgressBar: true
        }).then(()=>{
          dispatch(getAllNotes())
        });}catch(e){
          Swal.fire({
            title: 'خطأ!',
            text: e,
            icon: 'error',
        });
        }
      }
  });
}
const deletePrivateNote=(id) => {
  dispatch(deleteNote(id))
  Swal.fire({
    title: 'عملية ناجحة',
    text: 'تمت ازالة الملاحظه بنجاح',
    icon: 'success',
    showConfirmButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    timer: 1500,
    timerProgressBar: true
}).then(()=>{
  dispatch(getAllNotes())
})
}

  useEffect(() => {
    const getTasks=async()=>{
      await dispatch(getAllTasks())
      await dispatch(getAllNotes())
      await dispatch(getAllUsers())
      await dispatch(getAllWallet())
      setDataLoaded(true);
    }
    getTasks()
    const calendarEl = document.getElementById('calendar')
    const calendar = new Calendar(calendarEl, {
      events:user?.role=='employee'? Array.isArray(alltasks.data) && alltasks.data.length > 0  ? 
          alltasks.data.filter(item=>item.userId==user?._id).map((item, index) => ({
              start: item.registration_date,
              title: `${item.subject} - كود (${item.code})`
          })) : [{
              start: '',
              title: ''
          }]:Array.isArray(alltasks.data) && alltasks.data.length > 0  ? 
          alltasks.data.map((item, index) => ({
              start: item.registration_date,
              title: `${item.subject} - كود (${item.code})`
          })) : [{
              start: '',
              title: ''
          }]
          ,
          eventClick: function(info) {
            var startDate = info.event.start;
            var formattedDate = startDate.getFullYear() + '-' + padNumber(startDate.getMonth() + 1) + '-' + padNumber(startDate.getDate());

            Swal.fire({
                title: info.event.title,
                text: 'Start Date: ' + formattedDate,
                icon: 'info',
            });
        }
  });
  if (dataLoaded) {
    calendar.render()
    console.log(allnotes)
    console.log(alltasks)
  }
   
  }, [dataLoaded])
  
  useEffect(() => {
    if (allwallet.data && allwallet.data.length > 0) {
        const totalAmount = allwallet.data.reduce((acc, item) => acc + parseFloat(item.amount_received_from_customer || 0), 0);
        setTotalAmountReceived(totalAmount);
    } else {
        setTotalAmountReceived(0);
    }
}, [allwallet.data]);


  return (
    <>
    <SideNavbar/>

    <main class="main-content position-relative border-radius-lg "> 
    <TopNavbar/>
    <div className="header bg-primary pb-3">
      <div className='container py-4'>
      <div className="row align-items-center">
        {user?.role=="admin"?
        <div className="col-xl-4 col-md-6 mt-2"style={{cursor:"pointer"}}>
        <Link to={'/alltasks'}>
        <div className="card card-stats">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">اجمالي المهام</h5>
                        <span className="h3 font-weight-bold mb-0">{
                            Array.isArray(alltasks.data) && alltasks.data.length > 0 ?(
                                alltasks.data.length
                            ):""
                            }</span>
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
        </Link>
        </div>
        :user?.role=="manager"?
        <div className="col-xl-3 col-md-6 mt-2">
        <div className="card card-stats">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">الإجمالي</h5>
                        <span className="h3 font-weight-bold mb-0">{
                            Array.isArray(alltasks.data) && alltasks.data.length > 0 ?(
                                alltasks.data.length
                            ):""
                            }</span>
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
        </div>:
        <div className="col-xl-4 col-md-6 mt-2">
        <div className="card card-stats">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">الإجمالي</h5>
                        <span className="h3 font-weight-bold mb-0">{
                            Array.isArray(alltasks.data) && alltasks.data.length > 0 ?(
                                alltasks.data.filter(item=>item.userId==user?._id).length
                            ):""
                            }</span>
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
        }
    

    {user?.role=="admin"?<div className="col-xl-4 col-md-6 mt-2">
        <div className="card card-stats">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">اجمالي الموظفين</h5>
                        <span className="h3 font-weight-bold mb-0">{
                            Array.isArray(allusers.data) && allusers.data.length > 0 ?(
                                allusers.data.length
                            ):""
                            }</span>
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
    :user?.role=="manager"?
    <div className="col-xl-3 col-md-6 mt-2">
        <div className="card card-stats">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">لم ترسل</h5>
                        <span className="h3 font-weight-bold mb-0">{
                            Array.isArray(alltasks.data) && alltasks.data.length > 0 ?(
                                alltasks.data.filter((item)=>item.sent===false).length
                            ):""
                            }</span>
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
    </div>:
    <div className="col-xl-4 col-md-6 mt-2">
    <div className="card card-stats">
        <div className="card-body">
            <div className="row">
                <div className="col">
                    <h5 className="card-title text-uppercase text-muted mb-0">لم ترسل</h5>
                    <span className="h3 font-weight-bold mb-0">{
                        Array.isArray(alltasks.data) && alltasks.data.length > 0 ?(
                            alltasks.data.filter(item=>item.userId==user?._id).filter((item)=>item.status==="تم الإرسال").length
                        ):""
                        }</span>
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
    }


    {user?.role=="admin"?<div className="col-xl-4 col-md-6 mt-2">
        <div className="card card-stats">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <h5 className="card-title text-muted mb-0" style={{fontSize:'18.2px'}}>اجمالي المبالغ المصروفة</h5>
                        <span className="h3 font-weight-bold mb-0">{totalAmountReceived} EGP</span>
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
    </div>:
    user?.role=="manager"?
    <div className="col-xl-3 col-md-6 mt-2">
        <div className="card card-stats">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <h5 className="card-title text-muted mb-0" style={{fontSize:'18.2px'}}>في انظار القبول او الرفض</h5>
                        <span className="h3 font-weight-bold mb-0">{
                            Array.isArray(alltasks.data) && alltasks.data.length > 0 ?(
                                alltasks.data.filter((item)=>item.status==="في انتظار القبول او الرفض").length
                            ):""
                            }</span>
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
    </div>:
    <div className="col-xl-4 col-md-6 mt-2">
    <div className="card card-stats">
        <div className="card-body">
            <div className="row">
                <div className="col">
                    <h5 className="card-title text-muted mb-0" style={{fontSize:'18.2px'}}>في انظار القبول او الرفض</h5>
                    <span className="h3 font-weight-bold mb-0">{
                        Array.isArray(alltasks.data) && alltasks.data.length > 0 ?(
                            alltasks.data.filter(item=>item.userId==user?._id).filter((item)=>item.status==="في انتظار القبول او الرفض").length
                        ):""
                        }</span>
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
    }


    {user?.role=="admin"||user?.role=="employee"?"":
     user?.role=="manager"?<div className="col-xl-3 col-md-6 mt-2">
        <div className="card card-stats">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <h5 className="card-title text-uppercase text-muted mb-0">تم الإرسال</h5>
                        <span className="h3 font-weight-bold mb-0">{
                            Array.isArray(alltasks.data) && alltasks.data.length > 0 ?(
                                alltasks.data.filter((item)=>item.status==="تم الإرسال").length
                            ):""
                            }</span>
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
    </div>:""
    }
    
</div>

        </div>
    </div>
    <div className="container-fluid mt--6">
      <div className="row">
        <div className="col-xl-8">
          <div className="card p-3" id='calendar'>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
<div class="card h-100 ">
<div class="card-header mb-3 p-3 pb-0 d-flex justify-content-between align-items-center">
                <h6 class="mb-0 text-md font-weight-bolder">ملاحظات </h6>
            <button class="btn btn-outline-success btn-icon-only mb-0" id="addNoteBtn" onClick={addPrivateNote} style={{display: "block"}}>
                <i class="material-icons text-sm font-weight-bold">+</i>
            </button>
            </div>
<div class="card-body pt-0">
<ul class="list-group list-group-flush" data-toggle="checklist">

{
  Array.isArray(allnotes.data) && allnotes.data.length > 0 ?(
    allnotes.data.map((item,index)=><li class="checklist-entry list-group-item px-0">
    <div class="checklist-item checklist-item-success checklist-item-checked d-flex">
    <div class="checklist-info">
    <h6 class="checklist-title mb-0">{item.content}</h6>
    <small class="text-xs">{item.datetime}</small>
    </div>
    <div style={{cursor:"pointer"}} class="form-check my-auto ms-auto" onClick={()=>{deletePrivateNote(allnotes.data[index]._id)}}>
    <IoTrashBin />
    </div>
    </div>
    </li>)
  ):""
}

</ul>
</div>
</div>
</div>
      </div>
      {user?.role=="admin"?"":
      <div className="row">
        <div className="col-xl-12">
        <div class="card mt-4">
        <div class="card-header  rtl p-3">
          <h5 class="mb-0 font-weight-bolder me-3">اشعارات بالمواضيع القريبه</h5>
        </div>
        <div className='card-body'>
        {
        user?.role=="employee"?
            Array.isArray(alltasks.data) && alltasks.data.length > 0 ? (
            alltasks.data.filter(item=>item.userId==user?._id).filter((item) => {
            const registrationDate = new Date(item.registration_date);
            const now = new Date();
            const millisecondsInADay = 1000 * 60 * 60 * 24;
            const threeDaysFromNow = now.getTime() + (3 * millisecondsInADay);
            return registrationDate.getTime() <= threeDaysFromNow && registrationDate.getTime() >= now.getTime();
      }).map((item, index) => (
        <div className="rtl alert-custom alert-danger alert-dismissible text-white" >
            <span class="text-lg font-weight-bolder text-bold">{item.info} ,  كود : {item.code}</span>
        </div>
      ))
            ) : "":
            Array.isArray(alltasks.data) && alltasks.data.length > 0 ? (
                alltasks.data.filter((item) => {
                const registrationDate = new Date(item.registration_date);
                const now = new Date();
                const millisecondsInADay = 1000 * 60 * 60 * 24;
                const threeDaysFromNow = now.getTime() + (3 * millisecondsInADay);
                return registrationDate.getTime() <= threeDaysFromNow && registrationDate.getTime() >= now.getTime();
          }).map((item, index) => (
            <div className="rtl alert-custom alert-danger alert-dismissible text-white" >
                <span class="text-lg font-weight-bolder text-bold">{item.info} ,  كود : {item.code}</span>
            </div>
          ))
                ) : ""
}</div>
        
      </div>
        </div>

      </div>}
    </div>
  </main>
    </>
  )
}

export default HomePage