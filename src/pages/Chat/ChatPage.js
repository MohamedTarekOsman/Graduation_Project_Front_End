/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from 'react';
import SideNavbar from '../../components/SideNavbar';
import TopNavbar from '../../components/TopNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../Redux/actions/usersAction';
import { deleteMessageBetweenUsers, getAllMessages, createMessage } from '../../Redux/actions/messageAction';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';

const ChatPage = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const ws = useRef(null); // WebSocket reference

  const Currentuser = JSON.parse(localStorage.getItem('user'));
  const allUsers = useSelector((state) => state.userReducer.user);
  const messages = useSelector((state) => state.messageReducer.message); // Assuming your messages are stored in messageReducer

  useEffect(() => {
    const getData = async () => {
      await dispatch(getAllUsers());
      await dispatch(getAllMessages()); // Fetch all messages

      // Retrieve messages from Redux state and save them to localStorage
      const fetchedMessages = messages || [];
      setAllMessages(fetchedMessages);
      localStorage.setItem('messages', JSON.stringify(fetchedMessages));

      // Connect to WebSocket server
      ws.current = new WebSocket('ws://localhost:8000');

      ws.current.onmessage = (event) => {
        try {
          event.data.text().then((messageText) => {
            console.log('Received message:', messageText);
            const newMessage = JSON.parse(messageText);
            console.log(newMessage);
            const updatedMessages = [allMessages, newMessage];
            setAllMessages(updatedMessages);
            localStorage.setItem('messages', JSON.stringify(updatedMessages));
          });
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
    };

    getData();

    return () => {
      // Clean up WebSocket connection
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [dispatch, messages]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const filteredUsers = Array.isArray(allUsers.data)
    ? allUsers.data.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
          user.username !== Currentuser?.username
      )
    : [];

    const filteredMessages = Array.isArray(allMessages.data)&&messages.data.length>0? allMessages.data.filter(
    (message) =>
      (message.sender === Currentuser.username && message.receiver === selectedUser?.username) ||
      (message.sender === selectedUser?.username && message.receiver === Currentuser.username)
  ):[];

  const handleSendMessage = async () => {
    if (!messageText || !selectedUser) return;

    const messageData = {
      sender: Currentuser.username,
      receiver: selectedUser.username,
      message: messageText,
      createdAt: new Date().toISOString() // Add timestamp
    };

    try {
      ws.current.send(JSON.stringify(messageData));
      dispatch(createMessage(messageData));
      setMessageText('');
      const updatedMessages = [...allMessages, messageData];
      setAllMessages(updatedMessages);
      localStorage.setItem('messages', JSON.stringify(updatedMessages));
      console.log(messageData);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleDeleteChat = async () => {
    if (selectedUser) {
      const result = await Swal.fire({
        title: 'هل انت متأكد ؟',
        text: "سوف تقوم بحذف جميع الرسائل بينكما",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'نعم احذف',
        cancelButtonText: 'تراجع'
      });

      try {
        if (result.isConfirmed) {
          dispatch(deleteMessageBetweenUsers({
            sender: Currentuser.username,
            receiver: selectedUser.username
          })).then(() => {
            Swal.fire('تم!', 'تم حذف جميع الرسائل بنجاح.', 'success');
            const updatedMessages = allMessages.filter(
              (message) =>
                !(
                  (message.sender === Currentuser.username && message.receiver === selectedUser.username) ||
                  (message.sender === selectedUser.username && message.receiver === Currentuser.username)
                )
            );
            setAllMessages(updatedMessages);
            localStorage.setItem('messages', JSON.stringify(updatedMessages));
          });
        }
      } catch (error) {
        Swal.fire('خطأ!', 'عذرا حدث خطأ', 'error');
      }
    }
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [filteredMessages]);

  return (
    <>
      <SideNavbar />
      <div className="main-content position-relative">
        <TopNavbar />
        <div
          className="shadow-lg mx-4 card-profile-bottom"
          style={{ zIndex: 32, backgroundColor: 'white', borderRadius: '10px' }}
        >
          <div className="card-body p-3">
            <div className="row">
              <div className="col-auto"></div>
              <div className="col-auto my-auto">
                <div className="h-100">
                  <h5 className="mb-1">{Currentuser?.username}</h5>
                  <p className="mb-0 font-weight-bold text-sm">{Currentuser.role}</p>
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
                  <h6>Members</h6>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Member"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="card-body p-2">
                  {filteredUsers.length > 0
                    ? filteredUsers.map((item, index) => (
                        <a
                          key={index}
                          href="#"
                          className="d-block p-2 border-radius-lg bg-gradient-primary my-3"
                          onClick={() => handleUserClick(item)}
                        >
                          <div className="d-flex p-2">
                            <div className="ms-3">
                              <div className="justify-content-between align-items-center">
                                <h6 className="text-white mb-0">
                                  {item.username}
                                  <span className="badge badge-success" />
                                </h6>
                                <p className="text-white mb-0 text-sm">{item.role}</p>
                              </div>
                            </div>
                          </div>
                        </a>
                      ))
                    : ''}
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-7 col-12">
              <div className="card blur shadow-blur max-height-vh-70">
                <div className="card-header shadow-lg">
                  <div className="row">
                    <div className="col-lg-10 col-8">
                      <div className="d-flex align-items-center">
                        <div className="ms-3">
                          <h6 className="mb-0 d-block">{selectedUser?.username || 'Select a user'}</h6>
                          <span className="text-sm text-dark opacity-8">
                            {selectedUser?.role || ''}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-2 my-auto pe-0"></div>
                    <div className="col-lg-1 col-2 my-auto ps-0">
                      <button
                        className="btn btn-icon-only shadow-none text-dark mb-0"
                        type="button"
                        onClick={handleDeleteChat}
                      >
                        <FaTrashAlt style={{ color: 'red' }} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body overflow-auto overflow-x-hidden" ref={messagesEndRef}>
                  {filteredMessages.length > 0 ? (
                    filteredMessages.map((message, index) => (
                      <div
                        key={index}
                        className={`row justify-content-${
                          message.sender === Currentuser.username ? 'end' : 'start'
                        } mb-4`}
                      >
                        <div className="col-auto">
                          <div className={`card ${message.sender === Currentuser.username ? 'bg-gray-200' : ''}`}>
                            <div className="card-body py-2 px-3">
                              <p className="mb-1">{message.message}</p>
                              <div className="d-flex align-items-center text-sm opacity-6">
                                <i className="ni ni-check-bold text-sm me-1" />
                                <small>{new Date(message.createdAt).toLocaleString('en-US', {year: 'numeric',month: '2-digit',day: '2-digit',hour: '2-digit',minute:'2-digit'}).replace(',', '')}</small>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center">No messages to display</div>
                  )}
                </div>
                <div className="card-footer d-block">
                  <form className="align-items-center" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                    <div className="d-flex">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Type here"
                          aria-label="Message example input"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="btn bg-gradient-primary mb-0 ms-2">
                        <i className="ni ni-send" />
                      </button>
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
};

export default ChatPage;
