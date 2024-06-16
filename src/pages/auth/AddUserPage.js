/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../Redux/actions/authAction';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AddUserPage = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.signupUser);
  const [load,setLoad]=useState(false);
  const addNewUser = async () => {
    if (!firstname || !lastname || !username || !password || !role) {
      Swal.fire({
        icon: 'error',
        title: 'عملية غير ناجحه',
        text: 'يجب ان يتم اضافة جميع الخانات',
      });
      return;
    }
    await dispatch(signupUser({
      first_name: firstname,
      last_name: lastname,
      username: username,
      password: password,
      role: role
    }))
    setLoad(true)
  }
  useEffect(()=>{
    if(load===true && user.status ===201){
      console.log(user)
      Swal.fire({
        title: 'عملية ناجحة',
        text: 'تم اضافة الحساب بنجاح',
        icon: 'success',
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 1500,
        timerProgressBar: true
    }).then(()=>{
      navigate('/alluser')
    })
    }
    else if(load===true && user.status !== 201){
      Swal.fire({
        title: 'عملية غير ناجحة',
        text: 'اسم المستخدم موجود بالفعل',
        icon: 'error',
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 1500,
        timerProgressBar: true
    })
    }
  },[user,load])

  return (
    <>
      <div className="main-content" style={{ backgroundColor: '#172b4d', minHeight: '100vh' }}>
        <div className="header bg-gradient-primary">
          <div className="container">
            <div className="header-body text-center mb-7" style={{ position: 'relative', top: '100px' }}>
              <div className="row justify-content-center">
                <div className="col-lg-5 col-md-6">
                  <h1 className="text-white mt-4">
                    <a target="_blank" className="text-white" href="/">WELCOME</a>
                  </h1>
                  <p className="text-lead text-light">ADD NEW USER</p>
                </div>
              </div>
            </div>
          </div>
          <div className="separator separator-bottom separator-skew zindex-100" style={{ minHeight: '50vh' }}>
            <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <polygon className="fill-default" points="2560 0 2560 100 0 100"></polygon>
            </svg>
          </div>
        </div>

        <div className="container mt--8 pb-5">
          <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8">
              <div className="card border-0">
                <div className="card-body px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>FILL THE INFORMATION BELOW</small>
                  </div>
                  <form role="form">
                    <div className="form-group">
                      <div className="input-group input-group-merge input-group-alternative mb-3">
                        <div className="input-group-prepend">
                          <span style={{ height: '100%' }} className="input-group-text"><i className="ni ni-hat-3"></i></span>
                        </div>
                        <input value={firstname} onChange={(e) => setFirstname(e.target.value)} className="form-control" placeholder="First Name" type="text" />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group input-group-merge input-group-alternative mb-3">
                        <div className="input-group-prepend">
                          <span style={{ height: '100%' }} className="input-group-text"><i className="ni ni-hat-3"></i></span>
                        </div>
                        <input value={lastname} onChange={(e) => setLastname(e.target.value)} className="form-control" placeholder="Last Name" type="text" />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group input-group-merge input-group-alternative mb-3">
                        <div className="input-group-prepend">
                          <span style={{ height: '100%' }} className="input-group-text"><i className="ni ni-single-02"></i></span>
                        </div>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Username" type="text" />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group input-group-merge input-group-alternative mb-3">
                        <div className="input-group-prepend">
                          <span style={{ height: '100%' }} className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                        </div>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" type="password" />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group input-group-merge input-group-alternative mb-3">
                        <div className="input-group-prepend">
                          <span style={{ height: '100%' }} className="input-group-text"><i className="ni ni-badge"></i></span>
                        </div>
                        <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role">
                          <option value="">Select Role</option>
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                          <option value="employee">Employee</option>
                        </select>
                      </div>
                    </div>
                    <div className="text-center">
                      <button type="button" className="btn btn-primary mt-4" onClick={addNewUser}>Create New Account</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddUserPage;
