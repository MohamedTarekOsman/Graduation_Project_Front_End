/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import SideNavbar from '../../components/SideNavbar';
import TopNavbar from '../../components/TopNavbar';

const ChatPage = () => {
  return (
    <>
    <SideNavbar/>
    <div className="main-content  position-relative ">
    <TopNavbar/>
  <div className=" shadow-lg mx-4 card-profile-bottom " style={{zIndex:32,backgroundColor:"white",borderRadius:"10px"}}>
    <div className="card-body p-3">
      <div className="row ">
        <div className="col-auto">
          <div className="avatar avatar-xl position-relative">
            <img
              src="../../assets/img/team-1.jpg"
              alt="profile_image"
              className="w-100 border-radius-lg shadow-sm"
            />
          </div>
        </div>
        <div className="col-auto my-auto">
          <div className="h-100">
            <h5 className="mb-1">Sayo Kravits</h5>
            <p className="mb-0 font-weight-bold text-sm">Public Relations</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="container-fluid py-4">
    <div className="row">
      <div className="col-lg-4 col-md-5 col-12">
        <div className="card blur shadow-blur max-height-vh-70 overflow-auto overflow-x-hidden mb-5 mb-lg-0">
          <div className="card-header p-3">
            <h6>Friends</h6>
            <input
              type="email"
              className="form-control"
              placeholder="Search Contact"
              aria-label="Email"
              onfocus="focused(this)"
              onfocusout="defocused(this)"
            />
          </div>
          <div className="card-body p-2">
            <a
              href="javascript:;"
              className="d-block p-2 border-radius-lg bg-gradient-primary"
            >
              <div className="d-flex p-2">
                <img
                  alt="Image"
                  src="../../assets/img/team-2.jpg"
                  className="avatar shadow"
                />
                <div className="ms-3">
                  <div className="justify-content-between align-items-center">
                    <h6 className="text-white mb-0">
                      Charlie Watson
                      <span className="badge badge-success" />
                    </h6>
                    <p className="text-white mb-0 text-sm">Typing...</p>
                  </div>
                </div>
              </div>
            </a>
            <a href="javascript:;" className="d-block p-2">
              <div className="d-flex p-2">
                <img
                  alt="Image"
                  src="../../assets/img/team-1.jpg"
                  className="avatar shadow"
                />
                <div className="ms-3">
                  <h6 className="mb-0">Jane Doe</h6>
                  <p className="text-muted text-xs mb-2">1 hour ago</p>
                  <span className="text-muted text-sm col-11 p-0 text-truncate d-block">
                    Computer users and programmers
                  </span>
                </div>
              </div>
            </a>
            <a href="javascript:;" className="d-block p-2">
              <div className="d-flex p-2">
                <img
                  alt="Image"
                  src="../../assets/img/team-3.jpg"
                  className="avatar shadow"
                />
                <div className="ms-3">
                  <h6 className="mb-0">Mila Skylar</h6>
                  <p className="text-muted text-xs mb-2">24 min ago</p>
                  <span className="text-muted text-sm col-11 p-0 text-truncate d-block">
                    You can subscribe to receive weekly...
                  </span>
                </div>
              </div>
            </a>
            <a href="javascript:;" className="d-block p-2">
              <div className="d-flex p-2">
                <img
                  alt="Image"
                  src="../../assets/img/team-5.jpg"
                  className="avatar shadow"
                />
                <div className="ms-3">
                  <h6 className="mb-0">Sofia Scarlett</h6>
                  <p className="text-muted text-xs mb-2">7 hours ago</p>
                  <span className="text-muted text-sm col-11 p-0 text-truncate d-block">
                    It’s an effective resource regardless..
                  </span>
                </div>
              </div>
            </a>
            <a href="javascript:;" className="d-block p-2">
              <div className="d-flex p-2">
                <img
                  alt="Image"
                  src="../../assets/img/team-4.jpg"
                  className="avatar shadow"
                />
                <div className="ms-3">
                  <div className="justify-content-between align-items-center">
                    <h6 className="mb-0">Tom Klein</h6>
                    <p className="text-muted text-xs mb-2">1 day ago</p>
                  </div>
                  <span className="text-muted text-sm col-11 p-0 text-truncate d-block">
                    Be sure to check it out if your dev pro...
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="col-lg-8 col-md-7 col-12">
        <div className="card blur shadow-blur max-height-vh-70">
          <div className="card-header shadow-lg">
            <div className="row">
              <div className="col-lg-10 col-8">
                <div className="d-flex align-items-center">
                  <img
                    alt="Image"
                    src="../../assets/img/team-2.jpg"
                    className="avatar"
                  />
                  <div className="ms-3">
                    <h6 className="mb-0 d-block">Charlie Watson</h6>
                    <span className="text-sm text-dark opacity-8">
                      last seen today at 1:53am
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-1 col-2 my-auto pe-0">
                <button
                  className="btn btn-icon-only shadow-none text-dark mb-0 me-3 me-sm-0"
                  type="button"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title=""
                  data-bs-original-title="Video call"
                >
                  <i className="ni ni-camera-compact" />
                </button>
              </div>
              <div className="col-lg-1 col-2 my-auto ps-0">
                <div className="dropdown">
                  <button
                    className="btn btn-icon-only shadow-none text-dark mb-0"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="ni ni-settings" />
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end me-sm-n2 p-2"
                    aria-labelledby="chatmsg"
                  >
                    <li>
                      <a
                        className="dropdown-item border-radius-md"
                        href="javascript:;"
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item border-radius-md"
                        href="javascript:;"
                      >
                        Mute conversation
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item border-radius-md"
                        href="javascript:;"
                      >
                        Block
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item border-radius-md"
                        href="javascript:;"
                      >
                        Clear chat
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item border-radius-md text-danger"
                        href="javascript:;"
                      >
                        Delete chat
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body overflow-auto overflow-x-hidden">
            <div className="row justify-content-start mb-4">
              <div className="col-auto">
                <div className="card ">
                  <div className="card-body py-2 px-3">
                    <p className="mb-1">
                      It contains a lot of good lessons about effective
                      practices
                    </p>
                    <div className="d-flex align-items-center text-sm opacity-6">
                      <i className="ni ni-check-bold text-sm me-1" />
                      <small>3:14am</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-end text-right mb-4">
              <div className="col-auto">
                <div className="card bg-gray-200">
                  <div className="card-body py-2 px-3">
                    <p className="mb-1">
                      Can it generate daily design links that include essays and
                      data visualizations ?<br />
                    </p>
                    <div className="d-flex align-items-center justify-content-end text-sm opacity-6">
                      <i className="ni ni-check-bold text-sm me-1" />
                      <small>4:42pm</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12 text-center">
                <span className="badge text-dark">Wed, 3:27pm</span>
              </div>
            </div>
            <div className="row justify-content-start mb-4">
              <div className="col-auto">
                <div className="card ">
                  <div className="card-body py-2 px-3">
                    <p className="mb-1">
                      Yeah! Responsive Design is geared towards those trying to
                      build web apps
                    </p>
                    <div className="d-flex align-items-center text-sm opacity-6">
                      <i className="ni ni-check-bold text-sm me-1" />
                      <small>4:31pm</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-end text-right mb-4">
              <div className="col-auto">
                <div className="card bg-gray-200">
                  <div className="card-body py-2 px-3">
                    <p className="mb-1">Excellent, I want it now !</p>
                    <div className="d-flex align-items-center justify-content-end text-sm opacity-6">
                      <i className="ni ni-check-bold text-sm me-1" />
                      <small>4:42pm</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-start mb-4">
              <div className="col-auto">
                <div className="card ">
                  <div className="card-body py-2 px-3">
                    <p className="mb-1">
                      You can easily get it; The content here is all free
                    </p>
                    <div className="d-flex align-items-center text-sm opacity-6">
                      <i className="ni ni-check-bold text-sm me-1" />
                      <small>4:42pm</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-end text-right mb-4">
              <div className="col-auto">
                <div className="card bg-gray-200">
                  <div className="card-body py-2 px-3">
                    <p className="mb-1">
                      Awesome, blog is important source material for anyone who
                      creates apps? <br />
                      Beacuse these blogs offer a lot of information about
                      website development.
                    </p>
                    <div className="d-flex align-items-center justify-content-end text-sm opacity-6">
                      <i className="ni ni-check-bold text-sm me-1" />
                      <small>4:42pm</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-start mb-4">
              <div className="col-5">
                <div className="card ">
                  <div className="card-body p-2">
                    <div className="col-12 p-0">
                      <img
                        src="https://images.unsplash.com/photo-1602142946018-34606aa83259?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1762&q=80"
                        alt="Rounded image"
                        className="img-fluid mb-2 border-radius-lg"
                      />
                    </div>
                    <div className="d-flex align-items-center text-sm opacity-6">
                      <i className="ni ni-check-bold text-sm me-1" />
                      <small>4:47pm</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-end text-right mb-4">
              <div className="col-auto">
                <div className="card bg-gray-200">
                  <div className="card-body py-2 px-3">
                    <p className="mb-0">
                      At the end of the day … the native dev apps is where users
                      are
                    </p>
                    <div className="d-flex align-items-center justify-content-end text-sm opacity-6">
                      <i className="ni ni-check-bold text-sm me-1" />
                      <small>4:42pm</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-start">
              <div className="col-auto">
                <div className="card ">
                  <div className="card-body py-2 px-3">
                    <p className="mb-0">Charlie is Typing...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer d-block">
            <form className="align-items-center">
              <div className="d-flex">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type here"
                    aria-label="Message example input"
                    onfocus="focused(this)"
                    onfocusout="defocused(this)"
                  />
                </div>
                <button className="btn bg-gradient-primary mb-0 ms-2">
                  <i className="ni ni-send" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <footer className="footer pt-3  ">
      <div className="container-fluid">
        <div className="row align-items-center justify-content-lg-between">
          <div className="col-lg-6 mb-lg-0 mb-4">
            <div className="copyright text-center text-sm text-muted text-lg-start">
              © 2024, made with <i className="fa fa-heart" aria-hidden="true" />{" "}
              by
              <a
                href="https://www.creative-tim.com"
                className="font-weight-bold"
                target="_blank"
              >
                Creative Tim
              </a>
              for a better web.
            </div>
          </div>
          <div className="col-lg-6">
            <ul className="nav nav-footer justify-content-center justify-content-lg-end">
              <li className="nav-item">
                <a
                  href="https://www.creative-tim.com"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  Creative Tim
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://www.creative-tim.com/presentation"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://www.creative-tim.com/blog"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="https://www.creative-tim.com/license"
                  className="nav-link pe-0 text-muted"
                  target="_blank"
                >
                  License
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
  <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
    <div className="ps__thumb-x" tabIndex={0} style={{ left: 0, width: 0 }} />
  </div>
  <div className="ps__rail-y" style={{ top: 0, height: 646, right: 0 }}>
    <div className="ps__thumb-y" tabIndex={0} style={{ top: 0, height: 465 }} />
  </div>
    </div>
    </>
  );
};

export default ChatPage;