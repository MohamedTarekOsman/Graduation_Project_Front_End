import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/home/HomePage";
import NewTaskPage from "./pages/new_task/NewTaskPage";
import "flatpickr/dist/themes/material_green.css";
import AddUserPage from "./pages/auth/AddUserPage";
import AllTasks from "./pages/AllTasks/AllTasks";
import AllUsers from "./pages/Attendance/AllUsers";
import Wallet from "./pages/Wallet/Wallet";
import NotificationPage from "./pages/home/NotificationPage";
import NotesPage from "./pages/home/NotesPage";
import AttendanceCalender from "./pages/Attendance/AttendanceCalender";
import ChatPage from "./pages/Chat/ChatPage";
import OneTask from "./pages/AllTasks/OneTask";
import AllReports from "./pages/Reports/AllReports";
import CreateReport from "./pages/Reports/CreateReport";

function App() {
  return (
    <>
    <Routes>
      <Route path="/login" element={ <LoginPage/>} />
      <Route path="/" element={ <HomePage/>} />
      <Route path="/newTask" element={ <NewTaskPage/>} />
      <Route path="/addUser" element={ <AddUserPage/>} />
      <Route path="/allTasks" element={ <AllTasks/>} />
      <Route path="/oneTask" element={<OneTask />} />
      {/* <Route path="/allTasks?taskcode=code" element={ <OneTask/>} /> */}
      {/* <Route path="/allUsers" element={ <AllUsers/>} /> */}
      <Route path="/wallet" element={ <Wallet/>} />
      <Route path="/notifications" element={ <NotificationPage/>} />
      <Route path="/notes" element={ <NotesPage/>} />
      <Route path="/alluser" element={ <AllUsers/>} />
      <Route path="/attendanceCalender" element={ <AttendanceCalender/>} />
      <Route path="/chat" element={ <ChatPage/>} />
      <Route path="/report" element={ <AllReports/>} />
      <Route path="/newReport" element={ <CreateReport/>} />
    </Routes>
    </>
  );
}

export default App;
