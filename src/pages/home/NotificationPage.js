import React, { useEffect } from 'react'
import SideNavbar from '../../components/SideNavbar'
import TopNavbar from '../../components/TopNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { getAllNotification } from '../../Redux/actions/notificationsAction'
const NotificationPage = () => {
  const dispatch=useDispatch()
  const notifications=useSelector(state=>state.notificationReducer.notification)
  useEffect(()=>{
    const getNotifications=async()=>{
      await dispatch(getAllNotification())
    }
    getNotifications()
  },[])
  if(notifications){
    console.log(notifications)
  }
  return (
       <>
    <SideNavbar/>

    <main class="main-content position-relative border-radius-lg ">
    <TopNavbar/>

    <div className="header pb-6">
      <div className="container-fluid py-4">
                <div class="row">
    <div className='text-center my-4 '>
        <h2 className='text-white font-bold'>
            Alerts
        </h2>
    </div>
    <div  className="w-100 card p-4 rtl">
      {
        notifications.data?(notifications.data.map((item,index)=>
        <div  className={"alert text-white "+item.message_type} role="alert">
        {item.message}
        <button type="button" className="btn btn-outline-white mx-4">عرض التفاصيل</button>
        </div>)):''
      }
          
          
          {/* <div  className="alert alert-info text-white" role="alert">
          
          يوجد رسالة جديدة
          <button type="button" className="btn btn-outline-white mx-4">عرض التفاصيل</button>
          </div>
          <div  className="alert alert-danger text-white" role="alert">
          يوجد رسالة جديدة
          <button type="button" className="btn btn-outline-white mx-4">عرض التفاصيل</button>
          </div>
          <div  className="alert alert-success text-white" role="alert">
          يوجد رسالة جديدة
          <button type="button" className="btn btn-outline-white mx-4">عرض التفاصيل</button>
          </div>
          <div  className="alert alert-secondary text-white" role="alert">
          يوجد رسالة جديدة
          <button type="button" className="btn btn-outline-white mx-4">عرض التفاصيل</button>
          </div> */}
        </div>
        </div>
            </div>
            </div>
    </main>

        </>
  )
}

export default NotificationPage