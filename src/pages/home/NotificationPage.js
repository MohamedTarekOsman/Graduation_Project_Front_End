import React, { useEffect, useState } from 'react';
import SideNavbar from '../../components/SideNavbar';
import TopNavbar from '../../components/TopNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNotification, getAllNotification } from '../../Redux/actions/notificationsAction';
import { IoTrashBin } from 'react-icons/io5';
import Swal from 'sweetalert2';

const NotificationPage = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(state => state.notificationReducer.notification);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(storedUser);
    const getNotifications = async () => {
      await dispatch(getAllNotification());
    }
    getNotifications();
  }, []);

useEffect(()=>{
  if(notifications){
    console.log(notifications)
    console.log(currentUser)
  }
},[notifications]);
  const delNotification = (id) => {
    dispatch(deleteNotification(id));
    Swal.fire({
      title: 'عملية ناجحة',
      text: 'تم ازالة الاشعار بنجاح',
      icon: 'success',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      timer: 1500,
      timerProgressBar: true
    }).then(() => {
      dispatch(getAllNotification());
    });
  };

  return (
    <>
      <SideNavbar />
      <main className="main-content position-relative border-radius-lg ">
        <TopNavbar />
        <div className="header pb-6">
          <div className="container-fluid py-4">
            <div className="row">
              <div className='text-center my-4 '>
                <h2 className='text-white font-bold'>Alerts</h2>
              </div>
              <div className="w-100 card p-4 rtl">
                {notifications && Array.isArray(notifications.data) && notifications.data.length > 0 && currentUser && (
                  currentUser.role === 'admin' ? (
                    notifications.data.map((item, index) => (
                      <div key={index} className={"alert text-white " + item.message_type} role="alert">
                        {item.message}
                        <button type="button" className="btn btn-outline-white mx-4 mt-3">عرض التفاصيل</button>
                        <div style={{ cursor: "pointer", padding: "10px", marginTop: "10px", float: "left" }} className="form-check" onClick={() => { delNotification(item._id) }}>
                          <IoTrashBin style={{ width: "30px", height: "30px" }} />
                        </div>
                      </div>
                    ))
                  ) : (
                    notifications.data.filter(item => item.user_id == currentUser._id).map((item, index) => (
                      <div key={index} className={"alert text-white " + item.message_type} role="alert">
                        {item.message}
                        <div style={{ cursor: "pointer", padding: "10px", marginTop: "10px", float: "left" }} className="form-check" onClick={() => { delNotification(item._id) }}>
                          <IoTrashBin style={{ width: "30px", height: "30px" }} />
                        </div>
                      </div>
                    ))
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default NotificationPage;
