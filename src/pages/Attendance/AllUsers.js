/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import SideNavbar from "../../components/SideNavbar";
import TopNavbar from "../../components/TopNavbar";
import { useDispatch, useSelector } from "react-redux";
import  DataTable  from "datatables.net-dt";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../Redux/actions/usersAction";
import { getAllTasks, getOneTask, updateTask } from "../../Redux/actions/taskActions"; // Import updateTask action
import Swal from "sweetalert2";
import { createNotification } from "../../Redux/actions/notificationsAction";

const AllUsers = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [onedataLoaded, setOneDataLoaded] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentUser,SetCurrentUser]=useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    role: "",
    password: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const dispatch = useDispatch();
  const allusers = useSelector((state) => state.userReducer.user);
  const alltasks = useSelector((state) => state.taskReducer.task);
  const onetask = useSelector((state) => state.taskReducer.oneTask);
  const [ws, setWs] = useState(null);
  useEffect(() => {
    SetCurrentUser(JSON.parse(localStorage.getItem('user')))
    const getUsers = async () => {
      await dispatch(getAllUsers());
      await dispatch(getAllTasks());
      setDataLoaded(true);
    };
    getUsers();
    const socket = new WebSocket('ws://localhost:8000');

    socket.onopen = () => {
      setWs(socket);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);
  
  
  useEffect(() => {
    if (dataLoaded) {
      const dataTable = new DataTable("#myTable", {
        searchable: true,
      });

      return () => {
        dataTable.destroy();
      };
    }
  }, [dataLoaded]);

  const SendTask = async(selecteduser) => {
    Swal.fire({
      title: "اختر كود المهمة",
      html: `
        <style>
          .swal-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          .swal-select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 14px;
            margin-top: 25px;
          }
          .swal-select:focus {
            outline: none;
            border-color: #66afe9;
            box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
          }
        </style>
        <div class="swal-container">
          <select required name="Mission_name" id="Mission_name" class="swal-select" placeholder="المهمة">
          </select>
        </div>
      `,
      didOpen: function () {
        var missionSelect = document.getElementById("Mission_name");
        var container_height = document.getElementById("swal2-html-container");
        container_height.style.height = "200px";
  
        if (dataLoaded) {
          alltasks.data
            .filter((item) => item.sent === false)
            .forEach(function (task) {
              var option = document.createElement("option");
              option.value = JSON.stringify(task);
              option.textContent =
                task.code.split("(")[1]?.split(")")[0] || task.code;
              missionSelect.appendChild(option);
            });
        }
      },
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Send",
      showLoaderOnConfirm: true,
      preConfirm: async() => {
        const selectedTaskString = document.getElementById("Mission_name").value;
        const selectedTask = JSON.parse(selectedTaskString);
        await dispatch(
          updateTask(selectedTask._id, {
            userId: selecteduser._id,
            sent: true,
          })
        ).then(() => {
          dispatch(getAllTasks());
        });
  
        await dispatch(
          createNotification({
            user_id: selecteduser._id,
            sender_name: currentUser.username,
            message: selectedTask.info,
            message_type: "alert-info",
          })
        );
        
        await dispatch(getOneTask(selectedTask._id));
        setOneDataLoaded(true)
        // Check for onetask.data existence and WebSocket connection
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value) {
          Swal.fire({
            title: "Success!",
            text: "تم ارسال الموضوع بنجاح",
            icon: "success",
          }).then(() => {
            dispatch(getAllTasks());
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to send subject",
            icon: "error",
          });
        }
      }
    });
  };
  useEffect(()=>{
    if (onedataLoaded===true && ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        data: onetask.data
      }));
    } else {
      console.error('WebSocket connection is not open');
    }
  },[onedataLoaded])

  
  
  

  const deleteuser = async (id) => {
    await dispatch(deleteUser(id));
    Swal.fire({
      title: "عملية ناجحة",
      text: "تم ازالة الحساب بنجاح",
      icon: "success",
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      timer: 1500,
      timerProgressBar: true,
    }).then(() => {
      window.location.reload();
    });
  };

  const handleEditButtonClick = (user) => {
    setSelectedUserId(user._id);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      role: user.role,
      password: "",
    });
    setIsChangingPassword(false); // Reset to false when general edit button is clicked
  };

  const handleEditPasswordClick = (user) => {
    setSelectedUserId(user._id);
    setFormData({
      first_name: "",
      last_name: "",
      username: "",
      role: "",
      password: "",
    });
    setIsChangingPassword(true); // Set to true when change password button is clicked
  };

  const updateuser = async () => {
    const updatedFormData = { ...formData };

    if (isChangingPassword) {
      // Handle password update separately
      await dispatch(
        updateUser(selectedUserId, { password: updatedFormData.password })
      );
    } else {
      // Handle general user information update
      await dispatch(updateUser(selectedUserId, updatedFormData));
    }

    Swal.fire({
      title: "عملية ناجحة",
      text: "تم تعديل بيانات الحساب بنجاح",
      icon: "success",
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      timer: 1500,
      timerProgressBar: true,
    }).then(() => {
      setFormData({
        first_name: "",
        last_name: "",
        username: "",
        role: "",
        password: "",
      });
      setIsChangingPassword(false); // Reset to false after update
      setSelectedUserId(null);
      dispatch(getAllUsers());
    });
  };

  return (
    <>
      <SideNavbar />
      <main className="main-content position-relative border-radius-lg p-3">
        <TopNavbar />
        <div className="">
          <div className="row mt-4"></div>
        </div>
        <div className="card">
          <div className="table-responsive p-0">
            <div className="card-header pb-0">
              <h6>Authors table</h6>
            </div>
            <table className="table align-items-center" id="myTable">
              
              <thead className="text-light ">
                <tr>
                <th className="bg-success text-white ">العمليات</th>
                <th className="bg-success text-white">تاريخ الاضافة</th>
                <th className="bg-success text-white">اسم المستخدم</th>
                <th className="bg-success text-white">الدور</th>
                <th className="bg-success text-white ">الاسم</th>
                </tr>
              </thead>

              <tbody id="tableData">
                {Array.isArray(allusers.data) && allusers.data.length > 0
                  ? (allusers.data.map((item, index) => (
                      <tr key={index}>
                          <td>
                            <button
                              type="button"
                              className="btn btn-warning mx-2"
                              onClick={() => SendTask(item)}
                            >
                              ارسال مهمة
                            </button>

                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => deleteuser(item._id)}
                            >
                              حذف
                            </button>
                            <button
                              type="button"
                              className="btn btn-success mx-2"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => handleEditButtonClick(item)}
                            >
                              تعديل
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary "
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => handleEditPasswordClick(item)}
                            >
                              تعديل كلمة السر
                            </button>
                          </td>
                        <td className="">
                          {new Date(item.updatedAt).getDate()}/
                          {new Date(item.updatedAt).getMonth() + 1}/
                          {new Date(item.updatedAt).getFullYear()}
                        </td>
                        <td className="">{item.username}</td>
                        <td className="">{item.role}</td>
                        <td className="">
                          {item.first_name} {item.last_name}
                        </td>
                      </tr>
                    ))):""
                  }
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5 text-center"
                    id="exampleModalLabel"
                  >
                    {isChangingPassword ? "Change Password" : "Edit User"}
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {isChangingPassword ? (
                    <div className="mb-3">
                      <label
                        htmlFor="formGroupExampleInput"
                        className="form-label text-muted"
                      >
                        كلمة السر الجديدة
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="formGroupExampleInput"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </div>
                  ) : (
                    <>
                      <div className="mb-3">
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label text-muted"
                        >
                          الاسم الاول
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput"
                          value={formData.first_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              first_name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label text-muted"
                        >
                          الاسم الاخير
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput"
                          value={formData.last_name}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              last_name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="formGroupExampleInput"
                          className="form-label text-muted"
                        >
                          اسم المستخدم
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput"
                          value={formData.username}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              username: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <p className="text-muted">الدور</p>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={formData.role}
                          onChange={(e) =>
                            setFormData({ ...formData, role: e.target.value })
                          }
                        >
                          <option value="" disabled>
                            Open this select menu
                          </option>
                          <option value="admin">ادمن</option>
                          <option value="manager">مدير</option>
                          <option value="employee">موظف</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={updateuser}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AllUsers;
