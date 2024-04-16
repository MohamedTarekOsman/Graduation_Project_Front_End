/* eslint-disable jsx-a11y/no-redundant-roles */
import React from 'react'
import logo from '../../images/logo.png'
const AddUserPage = () => {
  return (
    <>
     <div className="main-content" style={{backgroundColor:'#172b4d',minHeight:'100vh'}}>

    <div className="header bg-gradient-primary">
      <div className="container">
        <div className="header-body text-center mb-7" style={{position:"relative",top:"100px"}}>
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-6">
              <h1 className="text-white mt-4">
                <a target="_blank" className="text-white"
                   href="/">WELCOME</a>
              </h1>
              <p className="text-lead text-light">
                ADD NEW USER
              </p>
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
    <div  className="row justify-content-center">
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
                    <span className="input-group-text"><i className="ni ni-hat-3"></i></span>
                  </div>
                  <input className="form-control" placeholder="Name" type="text"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group input-group-merge input-group-alternative">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                  </div>
                  <input className="form-control" placeholder="Password" type="password"/>
                </div>
              </div>
              <div className="text-muted font-italic"><small>password strength: <span className="text-success font-weight-700">strong</span></small></div>

              <div className="text-center">
                <button type="button" className="btn btn-primary mt-4">Create account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
    </>
  )
}

export default AddUserPage