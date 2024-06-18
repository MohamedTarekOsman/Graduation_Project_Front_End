/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import SideNavbar from '../../components/SideNavbar';
import TopNavbar from '../../components/TopNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { DataTable } from 'simple-datatables';
import { deleteUser, getAllUsers, updateUser } from '../../Redux/actions/usersAction';
import { getAllTasks, updateTask } from '../../Redux/actions/taskActions'; // Import updateTask action
import Swal from 'sweetalert2';

const Attendance = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const dispatch = useDispatch();
  const allusers = useSelector((state) => state.userReducer.user);
  const alltasks = useSelector((state) => state.taskReducer.task);

  useEffect(() => {
    const getUsers = async () => {
      await dispatch(getAllUsers());
      await dispatch(getAllTasks());
      setDataLoaded(true);
    };
    getUsers();
  }, []);

  useEffect(() => {
    if (dataLoaded) {
      console.log(allusers);
      const dataTable = new DataTable('#myTable', {
        searchable: true,
      });

      return () => {
        dataTable.destroy();
      };
    }
  }, [dataLoaded]);

  const SendTask = (selecteduser) => {
    Swal.fire({
      title: 'اختر كود المهمة',
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
        var missionSelect = document.getElementById('Mission_name');
        var container_height = document.getElementById('swal2-html-container');
        container_height.style.height = '200px';

        if (dataLoaded) {
          alltasks.data.filter(item => item.sent === false).forEach(function (task) {
            var option = document.createElement('option');
            option.value = task._id; // Assuming _id is the unique identifier for tasks
            option.textContent = task.code.split('(')[1]?.split(')')[0] || task.code;
            missionSelect.appendChild(option);
          });
        }
      },
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Send',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const selectedTaskId = document.getElementById('Mission_name').value;
        dispatch(updateTask(selectedTaskId,{
          sent: true,
          userId:selecteduser._id,
        }))
        console.log(selecteduser)
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value) {
          dispatch(updateTask(result.value)).then(() => {
            Swal.fire({
              title: 'Success!',
              text: 'تم ارسال الموضوع بنجاح',
              icon: 'success',
            }).then(()=>{
              dispatch(getAllTasks())
            })
          }).catch(() => {
            Swal.fire({
              title: 'Error',
              text: 'Failed to send subject',
              icon: 'error',
            });
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Failed to send subject',
            icon: 'error',
          });
        }
      }
    });
  };

  const deleteuser = async (id) => {
    await dispatch(deleteUser(id));
    Swal.fire({
      title: 'عملية ناجحة',
      text: 'تم ازالة الحساب بنجاح',
      icon: 'success',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      timer: 1500,
      timerProgressBar: true,
    }).then(() => {
      window.location.reload();
    });
  };

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    role: '',
    password: '',
  });

  const handleEditButtonClick = (user) => {
    setSelectedUserId(user._id);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      role: user.role,
      password: '',
    });
  };

  const updateuser = async () => {
    const updatedFormData = { ...formData };
    if (!formData.password) {
      delete updatedFormData.password;
    }
    await dispatch(updateUser(selectedUserId, updatedFormData));
    Swal.fire({
      title: 'عملية ناجحة',
      text: 'تم تعديل بيانات الحساب بنجاح',
      icon: 'success',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      timer: 1500,
      timerProgressBar: true,
    }).then(() => {
      setFormData({
        first_name: '',
        last_name: '',
        username: '',
        role: '',
        password: '',
      });
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
                <th className="bg-success text-white ">العمليات</th>
                <th className="bg-success text-white">تاريخ الاضافة</th>
                <th className="bg-success text-white">اسم المستخدم</th>
                <th className="bg-success text-white">الدور</th>
                <th className="bg-success text-white ">الاسم</th>
              </thead>
              <tbody id="tableData">
                {Array.isArray(allusers.data) && allusers.data.length > 0 ? (
                  allusers.data.map((item, index) => (
                    <tr key={index}>
                      {item.role === 'admin' ? (
                        <td>
                          <button type="button" className="btn btn-primary">
                            اذهب ل اعدادات الادمن
                          </button>
                        </td>
                      ) : (
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
                            className="btn btn-danger mx-2"
                            onClick={() => deleteuser(item._id)}
                          >
                            حذف
                          </button>
                          <button
                            type="button"
                            className="btn btn-success"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={() => handleEditButtonClick(item)}
                          >
                            تعديل
                          </button>
                        </td>
                      )}
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
                  ))
                ) : (
                  ''
                )}
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
                  <h1 className="modal-title fs-5 text-center" id="exampleModalLabel">
                    Edit User
                  </h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div className="modal-body">
  <div className="mb-3">
    <label htmlFor="formGroupExampleInput" className="form-label text-muted">
      الاسم الاول
    </label>
    <input
      type="text"
      className="form-control"
      id="formGroupExampleInput"
      value={formData.first_name}
      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="formGroupExampleInput" className="form-label text-muted">
      الاسم الاخير
    </label>
    <input
      type="text"
      className="form-control"
      id="formGroupExampleInput"
      value={formData.last_name}
      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="formGroupExampleInput" className="form-label text-muted">
      اسم المستخدم
    </label>
    <input
      type="text"
      className="form-control"
      id="formGroupExampleInput"
      value={formData.username}
      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="formGroupExampleInput" className="form-label text-muted">
      كلمة السر
    </label>
    <input
      type="password"
      className="form-control"
      id="formGroupExampleInput"
      value={formData.password}
      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
    />
  </div>
  <div>
    <p className="text-muted">الدور</p>
    <select
      className="form-select"
      aria-label="Default select example"
      value={formData.role}
      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
    >
      <option value="" disabled>
        Open this select menu
      </option>
      <option value="admin">ادمن</option>
      <option value="manager">مدير</option>
      <option value="employee">موظف</option>
    </select>
  </div>
</div>
<div className="modal-footer">
  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
    Cancel
  </button>
  <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateuser}>
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

export default Attendance;
