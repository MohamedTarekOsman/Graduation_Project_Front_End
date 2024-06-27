/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TopNavbar = () => {
  const [notifications, setNotifications] = useState(() => {
    const storedNotifications = localStorage.getItem('notifications');
    return storedNotifications ? JSON.parse(storedNotifications) : [];
  });

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(storedUser);
    const socket = new WebSocket('ws://localhost:8000');

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = function incoming(message) {
      // Convert Blob to a readable string
      message.data.text().then(data => {
        try {
          const parsedData = JSON.parse(data);
          let receivedTask = parsedData.data || parsedData;


          // Update notifications state
            const updatedNotifications = [...notifications, receivedTask];
            setNotifications(updatedNotifications);

            // Update local storage
            localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      }).catch(error => {
        console.error('Error reading Blob data:', error);
      });
    };

    return () => {
      socket.close();
    };
  }, [notifications]);

  const notificationsdel = () => {
    if (localStorage.getItem('notifications')) {
      localStorage.removeItem('notifications');
    }
  }

  
  return (
    <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="false">
      <div className="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li className="breadcrumb-item text-sm"><a className="opacity-5 text-white" href="javascript:;">Pages</a></li>
            <li className="breadcrumb-item text-sm text-white active" aria-current="page">Dashboard</li>
          </ol>
          <h6 className="font-weight-bolder text-white mb-0">Dashboard</h6>
        </nav>
        
        <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <div className="ms-md-auto pe-md-3 d-flex align-items-center">
            <div className="input-group">
              <span className="input-group-text text-body"><i className="fas fa-search" aria-hidden="true"></i></span>
              <input type="text" className="form-control" placeholder="Type here..." />
            </div>
          </div>
          <ul className="navbar-nav justify-content-end">
            <li className="nav-item d-flex align-items-center">
              <a href="#" className="nav-link text-white font-weight-bold px-0">
                <i className="fa fa-user me-sm-1 "></i>
              </a>
            </li>
            <li className="nav-item px-3 d-flex align-items-center">
              <Link to="/" className="nav-link text-white p-0">
                <i className="fa fa-home fixed-plugin-button-nav cursor-pointer"></i>
              </Link>
            </li>
            <li className="nav-item dropdown pe-2 d-flex align-items-center">
              <a href="javascript:;" className="nav-link text-white p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <i className="fa fa-bell cursor-pointer"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                {currentUser && currentUser.role === 'manager'
                  ? notifications.filter(item=>item.user_id==null).filter(item=>item.code).slice(0, 4).map((item, index) => (
                      <li className="mb-2" key={index}>
                        <a className="dropdown-item border-radius-md" href="javascript:;">
                          <div className="d-flex py-1">
                            
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="text-sm font-weight-normal mb-1">
                                <span className="font-weight-bold">Task Code: {item.code}</span>
                              </h6>
                              <p className="text-xs text-secondary mb-0">
                                --------------------------------
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                    ))
                  :currentUser && currentUser.role === 'employee'
                  ? currentUser && notifications.slice(0, 4).filter(item => item.data?.userId == currentUser._id).map((item, index) => (
                      <li className="mb-2" key={index}>
                        <a className="dropdown-item border-radius-md" href="javascript:;">
                          <div className="d-flex py-1">
                            
                            <div className="d-flex flex-column justify-content-center">
                              <h6 className="text-sm font-weight-normal mb-1">
                                <span className="font-weight-bold">Task Code: {item.data.code}</span>
                              </h6>
                              <p className="text-xs text-secondary mb-0">
                                --------------------------------
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                    )):""}
                <li>
                  <Link className="dropdown-item border-radius-md" to="/notifications">
                    <div className="d-flex py-1 justify-content-center align-items-center">
                      <div className="d-flex flex-column" onClick={notificationsdel}>
                        <Link to="/notifications" className="text-sm font-weight-normal text-center mb-1">
                          View More
                        </Link>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
              <div style={{ backgroundColor: "red", width: "15px", height: "15px", fontSize: "10px", color: "white", textAlign: "center", borderRadius: "100%", marginTop: "-10px" }}>
                {currentUser
                  ? currentUser.role === 'manager'
                    ? notifications.filter(item=>item.user_id==null).filter(item=>item.code).length
                    : notifications.filter(item => item.data?.userId === currentUser._id).length
                  : 0}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
