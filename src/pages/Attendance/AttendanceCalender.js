/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { Calendar } from '@fullcalendar/core'; // Ensure you're importing from the correct package
import { useDispatch, useSelector } from 'react-redux';
import SideNavbar from '../../components/SideNavbar';
import TopNavbar from '../../components/TopNavbar';
import { createAttendance, getAllAttendance } from '../../Redux/actions/attendanceAction';
import Swal from 'sweetalert2';

const AttendanceCalender = () => {
  const dispatch = useDispatch();
  const AllAttendances = useSelector(state => state.attendanceReducer.attendances);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current user from local storage once on component mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(storedUser);
  }, []);

  // Fetch attendance data once
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllAttendance());
      setDataLoaded(true);
    };
    fetchData();
  }, [dispatch]);

  // Check and set user visit time when currentUser is set
  useEffect(() => {
    if (!currentUser || !dataLoaded || !Array.isArray(AllAttendances.data)) return;

    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

    // Check if attendance already exists for today for the current user
    const userAttendanceExists = AllAttendances.data.some(
      (attendance) =>
        attendance?.userId?._id === currentUser._id &&
        attendance?.updatedAt.startsWith(today)
    );
    console.log(currentUser._id)
    console.log(today)
    if (!userAttendanceExists) {
      // Dispatch createAttendance action
      dispatch(createAttendance({
        userId: currentUser._id,
        userName: currentUser.username,
      })).then(() => {
        Swal.fire({
          title: "Success!",
          text: "تم تسجيل حضورك بنجاح",
          icon: "success",
        }).then(() => {
          dispatch(getAllAttendance());
        });
      });
    }
  }, [currentUser, dataLoaded, AllAttendances, dispatch]);

  // Initialize and render the calendar when data is loaded
  useEffect(() => {
    if (!dataLoaded || !Array.isArray(AllAttendances.data)) return;

    const calendarEl = document.getElementById('calendar');
    const calendar = new Calendar(calendarEl, {
      events: AllAttendances.data.map((item) => ({
        start: item.updatedAt,
        title: item.userName
      }))
    });

    calendar.render();
  }, [dataLoaded, AllAttendances]);

  return (
    <>
      <SideNavbar/>
      <main className="main-content position-relative border-radius-lg">
        <TopNavbar/>
        <div className="container-fluid">
          <div className="row mt-7">
            <div className="card p-3">
              <div id='calendar'></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AttendanceCalender;
