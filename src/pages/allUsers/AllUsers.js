/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../Redux/actions/usersAction'
import SideNavbar from '../../components/SideNavbar'
import TopNavbar from '../../components/TopNavbar'
import {DataTable} from "simple-datatables"

const AllUsers = () => {
    const [input,setInput]=useState("")
    const [dataLoaded, setDataLoaded] = useState(false);
    function search(){
    //var seachval=input.toLowerCase()
    }  
    const dispatch=useDispatch()
    const allusers=useSelector(state=>state.userReducer.user)

    useEffect(()=>{
      const getUsers=async()=>{
        await dispatch(getAllUsers())
        setDataLoaded(true);
      }
      getUsers()
      if(allusers.data){
        console.log(allusers)
      }
      
    },[])
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
  return (
    <>
        <SideNavbar/>
        <div className="main-content" id="panel">
            <TopNavbar/>
            <div className='mt-4'>
    
    
            </div>
            <div className="container">
            <div className='card'>
            <div className='table-responsive p-2'>
          <div class="card-header pb-0">
            <h6>Authors table</h6>
          </div>
          <table id='myTable' className="table table-striped" style={{color:'black'}}>
                <thead className=''>
                    <th >Username</th>
                    <th >Reviewed</th>
                    <th >Role</th>
                    <th >Seen</th>
                    <th >Created date</th>
                </thead>
                <tbody id="tableData">
                {
                    allusers.data?allusers.data.map((item,index)=><tr>
                    <td>{item.username}</td>
                    <td className="">{item.reviewed}</td>
                    <td className="">{item.role}</td>
                    <td className="">{item.seen}</td>
                    <td className="">{item.createdAt}</td>
                </tr>):""
                }   
        </tbody>
          </table>
          </div>
            </div>
            </div>
            
            
          </div>
        </>
  )
}

export default AllUsers