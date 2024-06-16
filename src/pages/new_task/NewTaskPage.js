/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { createTask } from '../../Redux/actions/taskActions'
import { ToastContainer } from 'react-toastify'
import flatpickr from 'flatpickr'
import Swal from 'sweetalert2'
import SideNavbar from '../../components/SideNavbar'
import TopNavbar from "../../components/TopNavbar";
import { useNavigate } from 'react-router-dom'
import { createNotification } from '../../Redux/actions/notificationsAction'


const NewTaskPage = () => {
  const dispatch=useDispatch();
  const navigate =useNavigate();
  const [load,setLoad]=useState(false);
  const [input, setInput] = useState('');
  const [ws, setWs] = useState(null);
  const socket = new WebSocket('ws://localhost:8000');
  const current_user=JSON.parse(localStorage.getItem('user'));
  const task=useSelector(state=>state.taskReducer.createTask)
  async function handleSubmit(date) {
      await dispatch(createTask({
        "code":date.code,
        "department":date.department,
        "subject":date.subject,
        "info":date.info,
        "notes":date.notes,
        "registration_date":selectedDate
      }))
      await dispatch(createNotification({
        "user_id":current_user._id,
        "sender_name":current_user.username,
        "message":date.info,
        "message_type":"alert-info",
      }))
      setLoad(true)
      setInput("new task is created")
      
  }
  
useEffect(()=>{
  if(load){
    if(task.status===200){
      Swal.fire({
        title: 'تم التحقق!',
        text: 'جارى الآن معالجة البيانات.',
        icon: 'success',
        showConfirmButton: false,
        timer: 2500, 
        timerProgressBar: true,
        allowOutsideClick:false,
        allowEscapeKey: false,
      })

      setTimeout(() => {
        navigate('/allTasks')
      }, 1500)

      if (input.trim() !== '') {
        ws.send(input);
        setInput('');
      }

    }else{
      Swal.fire({
        title: 'خطأ!',
        text: 'الكود اللذي ادخلته موجود بالفعل',
        icon: 'error',
        showConfirmButton: false,
      })
      setTimeout(() => {
        window.location.reload(false);
      }, 1500)
    }
    dispatch({ type: 'RESET_CREATE_TASK' });
  }
},[load])

  let validationSchema = Yup.object({
    code: Yup.string().required('is Required'),
    department: Yup.string().required('is Required'),
    subject: Yup.string().required('is Required'),
    info: Yup.string().required('is Required'),
    notes: Yup.string().required('is Required'),
  })




  let Formik = useFormik({
    initialValues: {
      registration_date: "",
      code: "",
      department: "",
      subject: "",
      info: "",
      notes: "",
    },
    onSubmit: handleSubmit,
    validationSchema
  })

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    socket.onopen = () => {
      setWs(socket);
    };
    
    const flatpickrInstance = flatpickr('#registration_date', {
      dateFormat: 'Y-m-d',
      onChange: (selectedDates, dateString, instance) => {
        setSelectedDate(dateString);
        Formik.setFieldValue('registration_date', dateString);
      },
    });

    return () => {
      flatpickrInstance.destroy();
    };
  }, []);
  return (
    <>
      <SideNavbar/>
            <main class="main-content position-relative border-radius-lg ">
    <TopNavbar/>

              <div className='container col-lg-8 mt-5'>
                <div className="card p-3 border-radius-xl bg-white js-active"
                    data-animation="FadeIn">

                  <form className='rtl' onSubmit={Formik.handleSubmit}>
                    <div className='mb-3 rtl'>
                      <label htmlFor='registration_date'>تاريخ التسجيل</label>
                      <input
                          onBlur={Formik.handleBlur}
                          className='form-control'
                          name='registration_date'
                          type='text'
                          id='registration_date'
                          readOnly
                      />
                      {(Formik.errors.registration_date && Formik.touched.registration_date) ? (
                          <div className='alert alert-danger'>{Formik.errors.registration_date}</div>
                      ) : ('')}
                    </div>

                    <div className='mb-3'>
                      <label htmlFor='code' style={{float: 'right'}}>الكود</label>
                      <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} className='form-control  '
                             name='code' type='text' id='code'></input>
                      {(Formik.errors.code && Formik.touched.code) ?
                          <div className='alert alert-danger'>{Formik.errors.code}</div>
                          : ""}

                    </div>

                    <div className='mb-3'>
                      <label htmlFor='department ' style={{float: 'right'}}>القسم</label>
                      <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} className='form-control  '
                             name='department' type='text' id='department'></input>
                      {(Formik.errors.department && Formik.touched.department) ?
                          <div className='alert alert-danger'>{Formik.errors.department}</div>
                          : ""}
                    </div>


                    <div className='mb-3'>
                      <label htmlFor='subject' style={{float: 'right'}}>الموضوع</label>
                      <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} className='form-control  '
                             name='subject' type='text' id='subject'></input>
                      {(Formik.errors.subject && Formik.touched.subject) ?
                          <div className='alert alert-danger'>{Formik.errors.subject}</div>
                          : ""}
                    </div>

                    <div className='mb-3'>
                      <label htmlFor='info' style={{float: 'right'}}>التفاصيل</label>
                      <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} className='form-control  '
                             name='info' type='text' id='info'></input>
                      {(Formik.errors.info && Formik.touched.info) ?
                          <div className='alert alert-danger'>{Formik.errors.info}</div>
                          : ""}
                    </div>

                    <div className='mb-3'>
                      <label htmlFor='notes' style={{float: 'right'}}>الملاحظات</label>
                      <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} className='form-control  '
                             name='notes' type='text' id='notes'></input>
                      {(Formik.errors.notes && Formik.touched.notes) ?
                          <div className='alert alert-danger'>{Formik.errors.notes}</div>
                          : ""}
                    </div>

                    <button type='submit' className='btn btn-success mt-3' style={{float: 'right'}}>حفظ المعلومات
                    </button>
                  </form>
                  </div>

                </div>
            </main>
      <ToastContainer/>
    </>
)
}

export default NewTaskPage