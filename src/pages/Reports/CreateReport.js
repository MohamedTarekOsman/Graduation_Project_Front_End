/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import {  getOneTask } from '../../Redux/actions/taskActions'
import { ToastContainer } from 'react-toastify'
import 'flatpickr/dist/flatpickr.min.css'
import Swal from 'sweetalert2'
import SideNavbar from '../../components/SideNavbar'
import TopNavbar from "../../components/TopNavbar";
import { useNavigate, useSearchParams } from 'react-router-dom'
import { createNotification } from '../../Redux/actions/notificationsAction'

const CreateReport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const taskcode = searchParams.get('taskcode');
  const [load, setLoad] = useState(false);
  const [oneLoad, setOneLoad] = useState(false);
  const [ws, setWs] = useState(null);
  const current_user = JSON.parse(localStorage.getItem('user'));
  const task = useSelector(state => state.taskReducer.createTask)
  const onetask = useSelector(state => state.taskReducer.oneTask)
  const [initialValues, setInitialValues] = useState({
    code: "",
    department: "",
    subject: "",
    info: "",
    notes: "",
  });

  const handleSubmit = async (values) => {
    setLoad(true);
  };

  useEffect(() => {
    if (load) {
      if (task.status === 200) {
        dispatch(createNotification({
          user_id: current_user._id,
          sender_name: current_user.username,
          message: task.data.data.info,
          task_code: task.data.data.code,
          message_type: "alert-info",
        }));
        Swal.fire({
          title: 'تم التحقق!',
          text: 'جارى الآن معالجة البيانات.',
          icon: 'success',
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        setTimeout(() => {
          navigate('/allTasks');
        }, 1500);

        if (ws && task.data) {
          ws.send(JSON.stringify(task.data));
        }

      } else {
        Swal.fire({
          title: 'خطأ!',
          text: 'الكود اللذي ادخلته موجود بالفعل',
          icon: 'error',
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      }
      dispatch({ type: 'RESET_CREATE_TASK' });
      setLoad(false);
    }
  }, [load]);

  const validationSchema = Yup.object({
    code: Yup.string().required('is Required'),
    department: Yup.string().required('is Required'),
    subject: Yup.string().required('is Required'),
    info: Yup.string().required('is Required'),
    notes: Yup.string().required('is Required'),
  });

  const Formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema,
    enableReinitialize: true, // This allows the form to reinitialize with new values
  });

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000');

    socket.onopen = () => {
      setWs(socket);
    };

    const gettaskwithcode = async () => {
      await dispatch(getOneTask(taskcode));
      setOneLoad(true);
    };
    gettaskwithcode();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [taskcode]);

  useEffect(() => {
    if (oneLoad && onetask.data) {
      setInitialValues({
        code: onetask.data[0].code || '',
        department: onetask.data[0].department || '',
        subject: onetask.data[0].subject || '',
        info: onetask.data[0].info || '',
        notes: onetask.data[0].notes || '',
      });
    }
  }, [oneLoad, onetask]);

  return (
    <>
      <SideNavbar />
      <main className="main-content position-relative border-radius-lg">
        <TopNavbar />
        <div className="container col-lg-8 mt-5">
          <div className="card p-3 border-radius-xl bg-white js-active" data-animation="FadeIn">
            <form className='rtl' onSubmit={Formik.handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='code' style={{ float: 'right' }}>الكود</label>
                <input 
                  onBlur={Formik.handleBlur} 
                  onChange={Formik.handleChange} 
                  className='form-control' 
                  name='code' 
                  type='text' 
                  id='code' 
                  value={Formik.values.code} // Bind value from Formik
                />
                {Formik.errors.code && Formik.touched.code ? (
                  <div className='alert alert-danger'>{Formik.errors.code}</div>
                ) : null}
              </div>
              <div className='mb-3'>
                <label htmlFor='department' style={{ float: 'right' }}>القسم</label>
                <input 
                  onBlur={Formik.handleBlur} 
                  onChange={Formik.handleChange} 
                  className='form-control' 
                  name='department' 
                  type='text' 
                  id='department' 
                  value={Formik.values.department} // Bind value from Formik
                />
                {Formik.errors.department && Formik.touched.department ? (
                  <div className='alert alert-danger'>{Formik.errors.department}</div>
                ) : null}
              </div>
              <div className='mb-3'>
                <label htmlFor='subject' style={{ float: 'right' }}>الموضوع</label>
                <input 
                  onBlur={Formik.handleBlur} 
                  onChange={Formik.handleChange} 
                  className='form-control' 
                  name='subject' 
                  type='text' 
                  id='subject' 
                  value={Formik.values.subject} // Bind value from Formik
                />
                {Formik.errors.subject && Formik.touched.subject ? (
                  <div className='alert alert-danger'>{Formik.errors.subject}</div>
                ) : null}
              </div>
              <div className='mb-3'>
                <label htmlFor='info' style={{ float: 'right' }}>التفاصيل</label>
                <input 
                  onBlur={Formik.handleBlur} 
                  onChange={Formik.handleChange} 
                  className='form-control' 
                  name='info' 
                  type='text' 
                  id='info' 
                  value={Formik.values.info} // Bind value from Formik
                />
                {Formik.errors.info && Formik.touched.info ? (
                  <div className='alert alert-danger'>{Formik.errors.info}</div>
                ) : null}
              </div>
              <div className='mb-3'>
                <label htmlFor='notes' style={{ float: 'right' }}>الملاحظات</label>
                <input 
                  onBlur={Formik.handleBlur} 
                  onChange={Formik.handleChange} 
                  className='form-control' 
                  name='notes' 
                  type='text' 
                  id='notes' 
                  value={Formik.values.notes} // Bind value from Formik
                />
                {Formik.errors.notes && Formik.touched.notes ? (
                  <div className='alert alert-danger'>{Formik.errors.notes}</div>
                ) : null}
              </div>
              <button type='submit' className='btn btn-success mt-3' style={{ float: 'right' }}>حفظ المعلومات</button>
            </form>
          </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
}

export default CreateReport;
