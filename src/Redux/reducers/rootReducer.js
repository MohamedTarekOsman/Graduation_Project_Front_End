import {combineReducers} from 'redux'
import authReducer from './authReducer'
import taskReducer from './taskReducer'
import userReducer from './userReducer'
import walletReducer from './walletReducer'
import notificationReducer from './notificationReducer'
import noteReducer from './noteReducer'
import attendanceReducer from './attendanceReducer'
import employeeLastJobReducer from './employeeLastJobReducer'
import messageReducer from './messageReducer'

export default combineReducers({
    authReducer:authReducer,
    taskReducer:taskReducer,
    userReducer:userReducer,
    walletReducer:walletReducer,
    notificationReducer:notificationReducer,
    noteReducer:noteReducer,
    attendanceReducer:attendanceReducer,
    employeeLastJobReducer:employeeLastJobReducer,
    messageReducer:messageReducer,
})