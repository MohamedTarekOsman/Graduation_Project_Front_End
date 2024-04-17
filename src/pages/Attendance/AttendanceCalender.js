/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Calendar } from 'fullcalendar'
import { useDispatch, useSelector } from 'react-redux'
import SideNavbar from '../../components/SideNavbar'
import TopNavbar from '../../components/TopNavbar'
import { getAllAttendance } from '../../Redux/actions/attendanceAction'
const AttendanceCalender = () => {
    const dispatch = useDispatch();
    const AllAttendances = useSelector(state => state.attendanceReducer.attendances);
    const [dataLoaded, setDataLoaded] = useState(false);
    useEffect(() => {
      const fetchData=async()=>{
        await dispatch(getAllAttendance())
        setDataLoaded(true);
      }
      fetchData()
      
      const calendarEl = document.getElementById('calendar')
      const calendar = new Calendar(calendarEl, {
        
        events: AllAttendances && AllAttendances.data ? 
        AllAttendances.data.map((item, index) => ({
                start: item.updatedAt,
                title: item.firstName + ' ' + item.lastName
            })) : [{
                start: '',
                title: ''
            }]
    });
    if (dataLoaded) {
      calendar.render()
    }
    }, [dataLoaded])
    
  
  return (
    <>
    <SideNavbar/>

    <main class="main-content position-relative border-radius-lg "> 
    <TopNavbar/>
    
    <div className="container-fluid ">
      <div className="row mt-7">
        <div className="card p-3 ">
        <div  id='calendar'>

        </div>
        </div>
          
      </div>
      
    </div>
  </main>
    </>
  )
}

export default AttendanceCalender