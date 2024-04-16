/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { createTask } from '../../Redux/actions/taskActions'
import notify from '../../notification/notify'
import { ToastContainer } from 'react-toastify'
import flatpickr from 'flatpickr'
import Swal from 'sweetalert2'
import SideNavbar from '../../components/SideNavbar'
import TopNavbar from "../../components/TopNavbar";


const NewTaskPage = () => {
  const dispatch=useDispatch();
  
  function handleSubmit(date) {
    dispatch(createTask({
      "code":date.code,
      "department":date.department,
      "subject":date.subject,
      "info":date.info,
      "notes":date.notes,
      "status":date.status,
      "sent":date.sent,
      "completed":date.completed,
      "userId":date.userId,
      "registration_date":selectedDate
    }))
    notify('تم اضافة التاسك بنجاح','success')
    Swal.fire({
      title:'good job'
    })
    setTimeout(()=>{
      window.location.reload('false')
    },2000)
  }

  let validationSchema = Yup.object({
    // registration_date: Yup.string().required('is Required'),
    code: Yup.string().required('is Required'),
    department: Yup.string().required('is Required'),
    subject: Yup.string().required('is Required'),
    info: Yup.string().required('is Required'),
    notes: Yup.string().required('is Required'),
    status: Yup.string().required('is Required'),
    userId: Yup.string().required('is Required'),
    sent: Yup.string().required('is Required'),
    completed: Yup.string().required('is Required'),
  })




  let Formik = useFormik({
    initialValues: {
      registration_date: "",
      code: "",
      department: "",
      subject: "",
      info: "",
      notes: "",
      status: "",
      userId: "",
      sent: "",
      completed: "",
    },
    onSubmit: handleSubmit,
    validationSchema
  })

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
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

                  <form onSubmit={Formik.handleSubmit}>

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


                    {/* <div className='mb-3'>
                      <label htmlFor='company_name' style={{float: 'right'}}>اسم الشركة</label>
                      <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} className='form-control  '
                             style={{direction: 'rtl'}} name='company_name' type='text' id='company_name'></input>
                      {(Formik.errors.company_name && Formik.touched.company_name) ?
                          <div className='alert alert-danger'>{Formik.errors.company_name}</div>
                          : ""}
                    </div> */}


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
                      <label htmlFor='subject' style={{float: 'right'}}>العنوان</label>
                      <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} className='form-control  '
                             name='subject' type='text' id='subject'></input>
                      {(Formik.errors.subject && Formik.touched.subject) ?
                          <div className='alert alert-danger'>{Formik.errors.subject}</div>
                          : ""}
                    </div>

                    <div className='mb-3'>
                      <label htmlFor='info' style={{float: 'right'}}>البيانات</label>
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

                    <div className='mb-3'>
                        <label htmlFor='status' style={{float: 'right'}}>الحالة</label>
                        <select
                          
                          onBlur={Formik.handleBlur}
                          onChange={Formik.handleChange}
                          className='form-select rtl px-5'
                          name='status'
                          id='status'
                          value={Formik.values.status}
                        >
                          <option value=''>اختر الحالة</option>
                          <option value='pending'>انتظار</option>
                          <option value='accepted'>مقبول</option>
                          <option value='rejected'>مرفوض</option>
                        </select>
                        {(Formik.errors.status && Formik.touched.status) && (
                          <div className='alert alert-danger'>{Formik.errors.status}</div>
                        )}
                      </div>


                    <div className='mb-3'>
                      <label htmlFor='userId' style={{float: 'right'}}>اسم المستخدم</label>
                      <input onBlur={Formik.handleBlur} onChange={Formik.handleChange} className='form-control  '
                             name='userId' type='text' id='userId'></input>
                      {(Formik.errors.userId && Formik.touched.userId) ?
                          <div className='alert alert-danger'>{Formik.errors.userId}</div>
                          : ""}
                    </div>

                    <div className='mb-3'>
                      <label htmlFor='sent' style={{float: 'right'}}>تم الإرسال ؟ </label>
                      <br/>
                      <div style={{display:'flex',width:'95%',justifyContent:'space-between'}}>
                      <div>
                        <input
                          onBlur={Formik.handleBlur}
                          onChange={Formik.handleChange}
                          className='form-check-input'
                          name='sent'
                          type='radio'
                          id='sent_true'
                          style={{border: '1px solid gray'}}
                          value='true'
                          checked={Formik.values.sent === 'true'}
                        />
                        <label className='form-check-label' htmlFor='sent_true'>True</label>
                      </div>
                      <div>
                        <input
                          onBlur={Formik.handleBlur}
                          onChange={Formik.handleChange}
                          className='form-check-input'
                          name='sent'
                          type='radio'
                          style={{border: '1px solid gray'}}
                          id='sent_false'
                          value='false'
                          checked={Formik.values.sent === 'false'}
                        />
                        <label className='form-check-label' htmlFor='sent_false'>False</label>
                      </div>
                      </div>
                      {Formik.errors.sent && Formik.touched.sent && (
                        <div className='alert alert-danger'>{Formik.errors.sent}</div>
                      )}
                    </div>

                    
                    <div className='mb-3'>
                      <label htmlFor='completed' style={{float: 'right'}}>مكتمل ؟ </label>
                      <br/>
                      <div style={{display:'flex',width:'95%',justifyContent:'space-between'}}>
                      <div>
                        <input
                          onBlur={Formik.handleBlur}
                          onChange={Formik.handleChange}
                          className='form-check-input'
                          name='completed'
                          type='radio'
                          id='completed_true'
                          style={{border: '1px solid gray'}}
                          value='true'
                          checked={Formik.values.completed === 'true'}
                        />
                        <label className='form-check-label' htmlFor='completed_true'>True</label>
                      </div>
                      <div>
                        <input
                          onBlur={Formik.handleBlur}
                          onChange={Formik.handleChange}
                          className='form-check-input'
                          name='completed'
                          type='radio'
                          style={{border: '1px solid gray'}}
                          id='completed_false'
                          value='false'
                          checked={Formik.values.completed === 'false'}
                        />
                        <label className='form-check-label' htmlFor='completed_false'>False</label>
                      </div>
                      </div>
                      {Formik.errors.completed && Formik.touched.completed && (
                        <div className='alert alert-danger'>{Formik.errors.completed}</div>
                      )}
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