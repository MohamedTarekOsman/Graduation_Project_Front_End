/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TopNavbar = () => {
  const [notifications, setNotifications] = useState(() => {
    const storedNotifications = localStorage.getItem('notifications');
    return storedNotifications ? JSON.parse(storedNotifications) : [];
  });

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000');

    socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    socket.onmessage = async function incoming(message) {
      const text = await message.data.text();
      setNotifications(prevNotifications => [...prevNotifications, text]);
    };

    return () => {
      socket.close();
    };
  }, []);

  // Update local storage when notifications change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  return (
    <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
      <div class="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
            <li class="breadcrumb-item text-sm"><a class="opacity-5 text-white" href="javascript:;">Pages</a></li>
            <li class="breadcrumb-item text-sm text-white active" aria-current="page">Dashboard</li>
          </ol>
          <h6 class="font-weight-bolder text-white mb-0">Dashboard</h6>
        </nav>
        <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <div class="ms-md-auto pe-md-3 d-flex align-items-center">
            <div class="input-group">
              <span class="input-group-text text-body"><i class="fas fa-search" aria-hidden="true"></i></span>
              <input type="text" class="form-control" placeholder="Type here..." />
            </div>
          </div>
          <ul class="navbar-nav  justify-content-end">
            <li class="nav-item d-flex align-items-center">
              <a href="#" class="nav-link text-white font-weight-bold px-0">
                <i class="fa fa-user me-sm-1"></i>
              </a>
            </li>
            <li class="nav-item px-3 d-flex align-items-center">
              <Link to="/" class="nav-link text-white p-0">
                <i class="fa fa-home fixed-plugin-button-nav cursor-pointer"></i>
              </Link>
            </li>
            <li class="nav-item dropdown pe-2 d-flex align-items-center">
              <a href="javascript:;" class="nav-link text-white p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa fa-bell cursor-pointer"></i>
              </a>
              <ul class="dropdown-menu  dropdown-menu-end  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
                {notifications.slice(0,4).map((item, index) => (
                  <li class="mb-2" key={index}>
                    <a class="dropdown-item border-radius-md" href="javascript:;">
                      <div class="d-flex py-1">
                        <div class="my-auto">
                          <img src="./assets/img/team-2.jpg" class="avatar avatar-sm  me-3 " />
                        </div>
                        <div class="d-flex flex-column justify-content-center">
                          <h6 class="text-sm font-weight-normal mb-1">
                            <span class="font-weight-bold">{item}</span> from Laur
                          </h6>
                          <p class="text-xs text-secondary mb-0">
                            <i class="fa fa-clock me-1"></i>
                            13 minutes ago
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
                <li>
                  <Link class="dropdown-item border-radius-md " to="/notifications">
                    <div className="d-flex py-1 justify-content-center align-items-center">
                      <div className="d-flex flex-column ">
                        <Link to="/notifications" className="text-sm font-weight-normal text-center mb-1">
                          View More
                        </Link>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
              <div style={{backgroundColor:"red",width:"15px", height:"15px",fontSize:"10px",color:"white",textAlign:"center",borderRadius:"100%",marginTop:"-10px"}}>
                {notifications.length}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
