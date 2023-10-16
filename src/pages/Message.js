import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'
import { SITE, socket } from '../App';
import NavBar from '../components/homepage/NavBar';
//! firebase 
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Message() {
  const [type, setType] = useState('');
  const [typeNewMessage, setTypeNewMessage] = useState('')

  const [typeSearchUser, setTypeSearchUser] = useState('');
  const [usersSearch, setUsersSearch] = useState(null);
  const [userSelected, setUserSelected] = useState(null);
  const [partners, setPartnerss] = useState([]);
  const [message, setMessage] = useState();
  const [lastMessagePartnerId, setLastMessagePartnerId] = useState();

  const [parnerId, setPartnerId] = useState()
  const [endCursor, setEndCursor] = useState(null);

  //! list firebase images
  const [listFileImage, setListFileImage] = useState([]);

  const user = useSelector(({ users }) => {
    return users.currentUser.userData
  })

  //! xử lý firebase

  console.log(listFileImage);
  const firebaseConfig = {
    apiKey: "AIzaSyDxcxX9oigrCMFl_MQ68SCiqr-jSNmZl9I",
    authDomain: "duye-21143.firebaseapp.com",
    projectId: "duye-21143",
    storageBucket: "duye-21143.appspot.com",
    messagingSenderId: "280851611457",
    appId: "1:280851611457:web:091cd207ce2bdb89a52bc0",
    measurementId: "G-3ZEWZX2S4X"
  };
  initializeApp(firebaseConfig);

  const storage = getStorage();
  // const storageRef = ref(storage, 'sourceImage/some-child');
  //! lấy được vị trí của ảnh trong máy tính để hiển thị
  function getLinkByListFileItems(listFile, userId, partner) {
    const ul = document.getElementById(`ul-listImage}`);
          ul.parentNode.removeChild(ul);
    console.log(listFile);
    for (let i = 0; i < listFile.length; i++) {
      const storageRef = ref(storage, `${user._id}/${listFile[i].name}`);



      // uploadBytes(storageRef, listFile[i]).then((snapshot) => {
      //   console.log('Uploaded a blob or file!');
      //   console.log(snapshot.ref);
      // })
      const metadata = {
        contentType: 'image/jpeg'
      };
      const uploadTask = uploadBytesResumable(storageRef, listFile[i], metadata);
      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              console.log('Upload is ' + progress + '% done');

              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            socket.emit('message', userId, partner, null, socket.id, downloadURL)
            setListFileImage([])



          });
        }
      );

    }
  }




  //! gửi id user đến server mỗi khi kết nối socket
  // socket.auth = { userId: user._id };
  // socket.connect();
  //! hàm trả về Giờ 
  function returnHour(dateMessage) {
    const dateString = dateMessage;
    const timestamp = new Date(dateString).getTime();
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes}`
  }

  const loadPartners = async () => {
    try {
      const response = await axios.get(`${SITE}/users/chat/listFriend`, {
        params: {
          userId: user._id, //! thay bằng id của user hiện tại
          // after: endCursor, // Gửi giá trị con trỏ trong đường dẫn URL
        },
      });

      const newPartners = response.data;
      setPartnerss([...partners, ...newPartners])

    } catch (error) {
      console.log(error);
    }

  }

  //! Click tab socket 
  const clickTab = async (partnerId) => {
    setPartnerId(partnerId);
    //! Tập trung vào input ĐANG BỊ BUG KHI MÀ CHUYỂN TAB THÌ KHÔNG FOCUS 
    const inputElement = document.getElementById(`my-textarea-${partnerId}`);

    if (inputElement) {
      inputElement.focus();

    }

    //! gửi id của lastMessage tại thời điểm click 
    socket.emit('clickTab', user._id, partnerId, socket.id)
    setMessage(); //! đặt lại Message mỗi khi chuyển sang tab Partner khác
    setLastMessagePartnerId()

  }

  socket.on('friendConnected', (userId, socketId) => {

    if (userId) {
      const updatePartners = [...partners]
      updatePartners.map(partner => {
        if (partner.partner._id == userId) {
          partner.partner.socketId = socketId
          return;
        }
        return;
      });
      setPartnerss(updatePartners)
    }
  })

  console.log(lastMessagePartnerId);
  socket.on('clickTab', (message) => {
    console.log(message);
    let setLastMessage = '';
    message.messages.map((message) => {
      if (message.senderId._id == user._id && message.isSeen == true) {
        setLastMessage = message._id
      }
    })
    console.log(setLastMessage);
    setLastMessagePartnerId(setLastMessage)



    setMessage(message)
    setEndCursor(null)
  })



  function handleFocus(event, partnerId) {
    socket.emit('focusNewMessage', user._id, partnerId, socket.id)
  }




  function handleSubmit(event, user, partner, type, setFunction) {

    event.preventDefault();
    if (type.trim() !== '') {
      // Gọi hàm callback onSendMessage để gửi tin nhắn

      socket.emit('message', user, partner, type, socket.id, null)
      // Xóa nội dung của form sau khi gửi
      setFunction('');

    }

  }

  const handleKeyPress = (event, user, partner, type, setFunction) => {


    if (event.key === 'Enter') {
      if (listFileImage) {
        getLinkByListFileItems(listFileImage, user, partner, type)
      } else {
        event.preventDefault();
        if (type.trim() !== '') {
          // Gọi hàm callback onSendMessage để gửi tin nhắn

          socket.emit('message', user, partner, type, socket.id, null)
          // Xóa nội dung của form sau khi gửi
          setFunction('');
        }
      }

    }
  };
  //! SOCKET
  socket.once('seenMessage', (partnerId) => {
    const updatePartners = [...partners]
    updatePartners.map(partner => {
      if (partner.partner._id == partnerId) {
        partner.lastMessage = {
          //   ... //! MAI LÀMMM
          ...partner.lastMessage,
          isSeen: true,
        }
        return;
      }
      return;
    });
    setPartnerss(updatePartners)
  })
  socket.once('partnerSeenMessage', (userId, lastMessagePartnerId) => {
    //! thay đổi trạng thái isSeen của lastMessagePartnerId
    if (message) {
      const updateMessage = [...message.messages]
      updateMessage.map(message => {
        if (message.receiverId._id == userId) {
          message.isSeen = true;
        }

      })
      console.log(updateMessage);

      //! duyệt phần tử cuối cùng để lấy lastSeenMessageId
      for (let i = updateMessage.length - 1; i >= 0; i--) {
        if (updateMessage[i].senderId._id == user._id && updateMessage[i].isSeen == true) {
          setLastMessagePartnerId(updateMessage[i]._id)
        }
        return;
      }

      setMessage({ ...message, messages: updateMessage })
    }



    const updatePartners = [...partners]
    updatePartners.map(partner => {
      if (partner.partner._id == userId) {
        partner.lastMessage = {
          //   ... //! MAI LÀMMM
          ...partner.lastMessage,
          isSeen: true,
        }
        return;
      }
      return;
    });
    setPartnerss(updatePartners)
  })
  //! kiểm tra xem partner đã tồn tại trong partners chưa
  const isSenderOrReceiverInPartners = (message, partners) => {
    const { senderId, receiverId } = message;
    return partners.some(partner => {
      return (
        partner.partner._id === senderId._id || partner.partner._id === receiverId._id
      );
    });
  };

  console.log(partners);
  console.log(message);

  socket.once('message', (messageSocket) => {




    if (isSenderOrReceiverInPartners(messageSocket, partners)) { //! trường hợp partners đã tồn tại user như vậy
      //! update Partners khi có tin nhắn mới đến
      const updatePartners = [...partners]
      const updatePartnersTest = [...partners]
      updatePartners.map(partner => {
        if (partner.partner._id == messageSocket.receiverId._id) { //! partner là người nhận, cần cập nhật lại vị trí của partner lên đầu
          partner.lastMessage = {
            ...messageSocket, // Tạo bản sao của đối tượng gốc
            senderId: messageSocket.senderId._id,
            receiverId: messageSocket.receiverId._id,
          };
          //! xóa trong mảng clone trước, sau đó push lại vào đầu mảng và set luôn
          const updateTest = updatePartnersTest.filter((partner) => {
            if (partner.partner._id !== messageSocket.receiverId._id) {
              return partner
            }
          })


          updateTest.unshift(partner)


          setPartnerss(updateTest)




          return;
        } else if (partner.partner._id == messageSocket.senderId._id) {

          partner.lastMessage = {
            ...messageSocket,
            senderId: messageSocket.senderId._id,
            receiverId: messageSocket.receiverId._id,
          };

          return;
        }
        return;
      });


      if (user._id != messageSocket.senderId._id) {
        setPartnerss(updatePartners)
      }


      if (message) {
        setMessage({
          ...message,
          messages: [...message.messages, messageSocket]
        })
      }
    } else { //! trường hợp chưa có partner nào như vậy
      //! cập nhật lại partners  với user mới

      //! trường hợp mình là người gửi cho partner mới
      if (user._id == messageSocket.senderId._id) {
        const updatePartners = [...partners]
        const newPartner = {
          lastMessage: {
            ...messageSocket,
            senderId: messageSocket.senderId._id,
            receiverId: messageSocket.receiverId._id,
          },
          partner: messageSocket.receiverId

        }

        updatePartners.unshift(newPartner)
        setPartnerss(updatePartners)

      } else if (user._id == messageSocket.receiverId._id) {
        const updatePartners = [...partners]
        const newPartner = {
          lastMessage: {
            ...messageSocket,
            senderId: messageSocket.senderId._id,
            receiverId: messageSocket.receiverId._id,
          },
          partner: messageSocket.senderId

        }

        updatePartners.unshift(newPartner)
        setPartnerss(updatePartners)

      }

    }



  })




  //! Hàm cuộn xuống message
  function scrollToBottomm(partnerId) {
    const chatContainer = document.getElementById(`chat-container-${partnerId}`);


    if (chatContainer) {
      console.log(chatContainer.scrollHeight);
      console.log(chatContainer.scrollTop);



      //! không phải lúc nào cũng trỏ xuống.nếu có hành động scroll thì không trỏ xuống 
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }
  useEffect(() => {
    loadPartners();
  }, []);
  //! sử lý cuộn mess
  useEffect(() => {
    if (message) {
      scrollToBottomm(parnerId)
    }
  }, [message]); //! CẦN PHẢI SỬA LẠI LOGIC



  //! xử lý cuộn message


  useEffect(() => {
    if (parnerId) {
      const element = document.getElementById(`chat-container-${parnerId}`);

      const handleScroll = () => {
        if (element.scrollTop == 0) {

          console.log("scroll", element.scrollTop);
          socket.emit("scrollToLoadMessage", user._id, parnerId, endCursor
            , socket.id) //! vấn đề ở đây
        }
      };

      element.addEventListener('scroll', handleScroll);

      socket.once('scrollToLoadMessage', (data) => {

        const newMessages = data.messages;
        const newEndCursor = data.endCursor;

        if (message) {
          setMessage({
            ...message,
            messages: [...newMessages, ...message.messages]
          })
          if (newEndCursor) {
            setEndCursor(newEndCursor);
            // console.log(endCursor);
          }
        }


      })
      return () => {
        element.removeEventListener('scroll', handleScroll);
      };
    }

  }, [message, parnerId]);

  useEffect(() => {
    const chatButton = document.querySelector('#toast-btn');
    const chatToast = document.querySelector('#chatToast');
    const closeChatToast = document.querySelector('#closeToastChat');

    chatButton.addEventListener('click', () => {
      // Hiển thị chatToast
      chatToast.style.display = 'block'; // hoặc sử dụng cách hiển thị tương ứng với mã của bạn
    });

    closeChatToast.addEventListener('click', () => {
      // Hiển thị chatToast
      chatToast.style.display = 'none'; // hoặc sử dụng cách hiển thị tương ứng với mã của bạn
      setTypeSearchUser('')
    });
  }, []);


  //! xử lý setTypeSearchUser
  console.log(typeSearchUser);
  async function getUsers() {

    console.log(typeSearchUser);
    if (typeSearchUser == '') {
      console.log(1);
      setUsersSearch(null)

    } else if (typeSearchUser != '') {
      const users = await axios.get(`${SITE}/users/searchByKeyword`, {
        params: {
          keyword: typeSearchUser, //! thay bằng id của user hiện tại
          // after: endCursor, // Gửi giá trị con trỏ trong đường dẫn URL
        },
      });
      console.log(typeSearchUser);
      setUsersSearch(users.data)
    }


  }
  //! xử lý selected user
  function clickSearchToSelectUser(user) {
    console.log(user);
    setUserSelected(user);
    setTypeSearchUser('')
  }
  function clickCloseSelectedUser(e) {
    e.preventDefault();
    setUserSelected(null);
  }

  //! xử lý submit form gửi tin nhắn mới



  useEffect(() => {
    //! tim tren server list ban be co ten giong voi type( tim tuong doi)  nhu vay
    if (typeSearchUser == '') {
      setUsersSearch(null)

    } else if (typeSearchUser != '') {

      getUsers()

    }
  }, [typeSearchUser])

  //! sử lý firebase



  useEffect(() => {
    if (parnerId) {
      const filepicker = document.getElementById("filepicker");
      const fileList = document.getElementById("fileList");
      if (filepicker || listFileImage == []) { //! để set listFileImage
        filepicker.addEventListener("change", (event) => {
          const files = event.target.files;

          setListFileImage(Array.from(files))
          console.log(files);
          if (files.length) {
            fileList.innerHTML = "";
            const list = document.createElement("ul");
            list.id = `ul-listImage}`;

            fileList.appendChild(list);
            for (let i = 0; i < files.length; i++) {
              // uploadBytes(storageRef, files[i]).then((snapshot) => {
              //   console.log('Uploaded a blob or file!');
              // });

              const li = document.createElement("li");
              list.appendChild(li);
              li.style.width = "100px"; // Màu chữ
              li.style.backgroundColor = "yellow"; // Màu nền
              li.style.listStyle = "none"; // Màu nền
              const img = document.createElement("img");
              const closeButton = document.createElement("button");
              const iconCloseButton = document.createElement("i");
              closeButton.classList.add("btn", "btn-secondary-soft-hover", "py-1", "px-2");
              iconCloseButton.classList.add("fa-solid", "fa-xmark");
              closeButton.style.position = "absolute"; // Màu chữ
              closeButton.id = `closeButton-${files[i].name}`;
              closeButton.appendChild(iconCloseButton);

              li.id = `listItemImage-${files[i].name}`;

              img.src = URL.createObjectURL(files[i]);
              img.height = 60;
              img.onload = () => {
                URL.revokeObjectURL(img.src);
              };
              li.appendChild(img);
              li.appendChild(closeButton);
              // const info = document.createElement("span");
              // info.innerHTML = `${files[i].name}: ${files[i].size} bytes`;
              // li.appendChild(info);
            }
          }
        });
      }
      if (filepicker && listFileImage != [] && listFileImage) {
        console.log(listFileImage, 7011111111111);
        for (let i = 0; i < listFileImage.length; i++) {
          const buttonClose = document.getElementById(`closeButton-${listFileImage[i].name}`);
          const li = document.getElementById(`listItemImage-${listFileImage[i].name}`);
          console.log(li);
          console.log(buttonClose);
          if (buttonClose) {
            buttonClose.onclick = () => {
              alert("Close")
              let fileArray = listFileImage; //! vấn đề ở đây

              const newArr = fileArray.filter(item => {

                return item.name != listFileImage[i].name
              });

              setListFileImage(newArr)
              li.parentNode.removeChild(li);

            }
          }

        }


        // const fileList = document.getElementById("closeButton-0");
        // console.log(fileList);
        // fileList.onclick = () =>{
        //   alert("Close")
        // }

      }
    }



  }, [parnerId, listFileImage])

  return (
    <>
      <div>
        <NavBar user={user}></NavBar>
        {/* =======================
Header END */}
        {/* **************** MAIN CONTENT START **************** */}
        <main>
          {/* Container START */}
          <div className="container">
            <div className="row gx-0">
              {/* Sidebar START */}
              <div className="col-lg-4 col-xxl-3" id="chatTabs" role="tablist">
                {/* Divider */}
                <div className="d-flex align-items-center mb-4 d-lg-none">
                  <button className="border-0 bg-transparent" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <i className="btn btn-primary fw-bold fa-solid fa-sliders" />
                    <span className="h6 mb-0 fw-bold d-lg-none ms-2">Chats</span>
                  </button>
                </div>
                {/* Advanced filter responsive toggler END */}
                <div className="card card-body border-end-0 border-bottom-0 rounded-bottom-0">
                  <div className=" d-flex justify-content-between align-items-center">
                    <h1 className="h5 mb-0">Active chats <span className="badge bg-success bg-opacity-10 text-success">6</span></h1>
                    {/* Chat new create message item START */}
                    <div className="dropend position-relative">
                      <div className="nav">
                        <a className="icon-md rounded-circle btn btn-sm btn-primary-soft nav-link toast-btn" id='toast-btn' data-target="chatToast" href="#"> <i className="bi bi-pencil-square" /> </a>
                      </div>
                    </div>
                    {/* Chat new create message item END */}
                  </div>
                </div>
                <nav className="navbar navbar-light navbar-expand-lg mx-0">
                  <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasNavbar">
                    {/* Offcanvas header */}
                    <div className="offcanvas-header">
                      <button type="button" className="btn-close text-reset ms-auto" data-bs-dismiss="offcanvas" />
                    </div>
                    {/* Offcanvas body */}
                    <div className="offcanvas-body p-0">
                      <div className="card card-chat-list rounded-end-lg-0 card-body border-end-lg-0 rounded-top-0">
                        {/* Search chat START */}
                        <form className="position-relative">
                          <input className="form-control py-2" type="search" placeholder="Search for chats" aria-label="Search" />
                          <button className="btn bg-transparent text-secondary px-2 py-0 position-absolute top-50 end-0 translate-middle-y" type="submit">
                            <i className="bi bi-search fs-5" />
                          </button>
                        </form>
                        {/* Search chat END */}
                        {/* Chat list tab START */}
                        <div className="mt-4 h-100" style={{ maxHeight: '100%' }}>
                          <div className="chat-tab-list custom-scrollbar" style={{ maxHeight: '90%', overflowY: 'scroll' }}>
                            <ul className="nav flex-column nav-pills nav-pills-soft">
                              {partners.map(partner => <li data-bs-dismiss="offcanvas" style={{ maxWidth: '100%', whiteSpace: 'pre' }}>

                                {!parnerId ?
                                  <a onClick={() => { clickTab(partner.partner._id) }} href={`#chat-${partner.partner._id}`} className="nav-link  text-start" id={`chat-${partner.partner._id}-tab`} data-bs-toggle="pill" role="tab">
                                    <div className="d-flex">

                                      {partner.partner.socketId ?
                                        <div className="flex-shrink-0 avatar avatar-story me-2 status-online">
                                          <img className="avatar-img rounded-circle" src={partner.partner.avatarUrl} alt />
                                        </div>
                                        :
                                        <div className="flex-shrink-0 avatar avatar-story me-2 status-offline">
                                          <img className="avatar-img rounded-circle" src={partner.partner.avatarUrl} alt />
                                        </div>
                                      }


                                      <div className="flex-grow-1 d-block" style={{ maxWidth: '81%' }}>
                                        <h6 className="mb-0 mt-1">{partner.partner.fullName}</h6>
                                        {(partner.lastMessage.senderId == user._id) ?
                                          <div className="small text-secondary" style={{ fontWeight: 400, overflow: 'hidden', textOverflow: 'ellipsis' }}>You: {partner.lastMessage.content}</div>
                                          :
                                          (
                                            partner.lastMessage.isSeen ? <div className="small text-secondary" style={{ fontWeight: 400, overflow: 'hidden', textOverflow: 'ellipsis' }}>{partner.lastMessage.content}</div>

                                              : <div className="small text-secondary" style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>{partner.lastMessage.content}</div>

                                          )


                                        }

                                      </div>
                                    </div>
                                  </a>

                                  :
                                  (parnerId == partner.partner._id) ?
                                    <a onClick={() => { clickTab(partner.partner._id) }} href={`#chat-${partner.partner._id}`} className="nav-link  text-start  active " id={`chat-${partner.partner._id}-tab`} data-bs-toggle="pill" role="tab" aria-selected="true">
                                      <div className="d-flex">

                                        {partner.partner.socketId ?
                                          <div className="flex-shrink-0 avatar avatar-story me-2 status-online">
                                            <img className="avatar-img rounded-circle" src={partner.partner.avatarUrl} alt />
                                          </div>
                                          :
                                          <div className="flex-shrink-0 avatar avatar-story me-2 status-offline">
                                            <img className="avatar-img rounded-circle" src={partner.partner.avatarUrl} alt />
                                          </div>
                                        }


                                        <div className="flex-grow-1 d-block" style={{ maxWidth: '81%' }}>
                                          <h6 className="mb-0 mt-1">{partner.partner.fullName}</h6>
                                          {(partner.lastMessage.senderId == user._id) ?
                                            <div className="small text-secondary" style={{ fontWeight: 400, overflow: 'hidden', textOverflow: 'ellipsis' }}>You: {partner.lastMessage.content}</div>
                                            :
                                            (
                                              partner.lastMessage.isSeen ? <div className="small text-secondary" style={{ fontWeight: 400, overflow: 'hidden', textOverflow: 'ellipsis' }}>{partner.lastMessage.content}</div>

                                                : <div className="small text-secondary" style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>{partner.lastMessage.content}</div>

                                            )


                                          }

                                        </div>
                                      </div>
                                    </a>

                                    :

                                    <a onClick={() => { clickTab(partner.partner._id) }} href={`#chat-${partner.partner._id}`} className="nav-link  text-start" id={`chat-${partner.partner._id}-tab`} data-bs-toggle="pill" role="tab">
                                      <div className="d-flex">

                                        {partner.partner.socketId ?
                                          <div className="flex-shrink-0 avatar avatar-story me-2 status-online">
                                            <img className="avatar-img rounded-circle" src={partner.partner.avatarUrl} alt />
                                          </div>
                                          :
                                          <div className="flex-shrink-0 avatar avatar-story me-2 status-offline">
                                            <img className="avatar-img rounded-circle" src={partner.partner.avatarUrl} alt />
                                          </div>
                                        }


                                        <div className="flex-grow-1 d-block" style={{ maxWidth: '81%' }}>
                                          <h6 className="mb-0 mt-1">{partner.partner.fullName}</h6>
                                          {(partner.lastMessage.senderId == user._id) ?
                                            <div className="small text-secondary" style={{ fontWeight: 400, overflow: 'hidden', textOverflow: 'ellipsis' }}>You: {partner.lastMessage.content}</div>
                                            :
                                            (
                                              partner.lastMessage.isSeen ? <div className="small text-secondary" style={{ fontWeight: 400, overflow: 'hidden', textOverflow: 'ellipsis' }}>{partner.lastMessage.content}</div>

                                                : <div className="small text-secondary" style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>{partner.lastMessage.content}</div>

                                            )


                                          }

                                        </div>
                                      </div>
                                    </a>
                                }


                              </li>)}

                              {/* Chat user tab item */}

                            </ul>
                          </div>
                        </div>
                        {/* Chat list tab END */}
                      </div>
                    </div>
                  </div>
                </nav>
              </div>
              {/* Sidebar START */}
              {/* Chat conversation START */}
              <div className="col-lg-8 col-xxl-9">
                <div className="card card-chat rounded-start-lg-0 border-start-lg-0" style={{ position: 'relative' }}>
                  <div className="card-body h-100">
                    <div className="tab-content py-0 mb-0 h-100" id="chatTabsContent">



                      {partners.map(partner =>
                        <>
                          {/* {!parnerId ? <div>không có partnerId và {partner.partner._id }</div> : <div>có partnerId {parnerId}  và {partner.partner._id }</div>}  */}

                          {parnerId == partner.partner._id ? <>
                            <div className="fade tab-pane h-100  active show" id={`chat-${partner.partner._id}`} role="tabpanel" aria-labelledby={`chat-${partner.partner._id}-tab`}>
                              {/* Top avatar and status START */}
                              <div className="d-sm-flex justify-content-between align-items-center">
                                <div className="d-flex mb-2 mb-sm-0">
                                  <div className="flex-shrink-0 avatar me-2">
                                    <img className="avatar-img rounded-circle" src={partner.partner.avatarUrl} alt />
                                  </div>
                                  <div className="d-block flex-grow-1">
                                    <h6 className="mb-0 mt-1">{partner.partner.fullName}</h6>
                                    {partner.partner.socketId ?
                                      <div className="small text-secondary"><i className="fa-solid fa-circle text-success me-1" />Online</div>
                                      :
                                      <div className="small text-secondary"><i className="fa-solid fa-circle text-danger me-1" />Offline</div>

                                    }

                                  </div>
                                </div>
                                <div className="d-flex align-items-center">
                                  {/* Call button */}
                                  <a href="#!" className="icon-md rounded-circle btn btn-primary-soft me-2 px-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Audio call"><i className="bi bi-telephone-fill" /></a>
                                  <a href="#!" className="icon-md rounded-circle btn btn-primary-soft me-2 px-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Video call"><i className="bi bi-camera-video-fill" /></a>
                                  {/* Card action START */}
                                  <div className="dropdown">
                                    <a className="icon-md rounded-circle btn btn-primary-soft me-2 px-2" href="#" id="chatcoversationDropdown" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false"><i className="bi bi-three-dots-vertical" /></a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="chatcoversationDropdown">
                                      <li><a className="dropdown-item" href="#"><i className="bi bi-check-lg me-2 fw-icon" />Mark as read</a></li>
                                      <li><a className="dropdown-item" href="#"><i className="bi bi-mic-mute me-2 fw-icon" />Mute conversation</a></li>
                                      <li><a className="dropdown-item" href="#"><i className="bi bi-person-check me-2 fw-icon" />View profile</a></li>
                                      <li><a className="dropdown-item" href="#"><i className="bi bi-trash me-2 fw-icon" />Delete chat</a></li>
                                      <li className="dropdown-divider" />
                                      <li><a className="dropdown-item" href="#"><i className="bi bi-archive me-2 fw-icon" />Archive chat</a></li>
                                    </ul>
                                  </div>
                                  {/* Card action END */}
                                </div>
                              </div>
                              {/* Top avatar and status END */}
                              <hr />
                              {/* Chat conversation START */}
                              <div id={`chat-container-${partner.partner._id}`} className="chat-conversation-content custom-scrollbar chat-container" style={{ overflowY: 'scroll', }}  >
                                {/* Chat time */}
                                <div className="text-center small my-2">Jul 16, 2022, 06:15 am</div>
                                {/* Chat message left */}
                                {message ? <>  {message.messages.map((message) => {
                                  if (message.senderId._id == partner.partner._id) {
                                    return <div className="d-flex mb-1">
                                      <div className="flex-shrink-0 avatar avatar-xs me-2">
                                        <img className="avatar-img rounded-circle" src={message.senderId.avatarUrl} alt />
                                      </div>
                                      <div className="flex-grow-1" style={{ maxWidth: '80%' }}>
                                        <div style={{ maxWidth: '75%' }}>
                                          <div className="d-flex flex-column align-items-start">
                                            {!message.contentUrlImage ? null :
                                              <img class="rounded h-200px" src={message.contentUrlImage} alt=""></img>

                                            }
                                            {!message.content ? null :
                                              <div className="bg-light text-secondary p-2 px-3 rounded-2" style={{ maxWidth: '100%', textAlign: 'start', whiteSpace: 'pre-wrap' }}>{message.content}</div>

                                            }
                                            <div className="small my-2">{returnHour(message.date)}</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  } else {
                                    return <div className="d-flex justify-content-end text-end mb-1">
                                      <div style={{ maxWidth: '75%' }}>
                                        <div className="d-flex flex-column align-items-end">

                                          {message.isSeen ?
                                            <>
                                              {message._id == lastMessagePartnerId ?
                                                <>
                                                  {!message.contentUrlImage ? null :
                                                    <img class="rounded h-200px" src={message.contentUrlImage} alt=""></img>

                                                  }
                                                  {!message.content ? null :
                                                    <div className="bg-primary text-white p-2 px-3 rounded-2" style={{ maxWidth: '100%', textAlign: 'start', whiteSpace: 'pre-wrap' }}>{message.content}</div>

                                                  }

                                                  <span>seen</span>
                                                </>
                                                :
                                                <>
                                                  {!message.contentUrlImage ? null :
                                                    <img class="rounded h-200px" src={message.contentUrlImage} alt=""></img>

                                                  }

                                                  {!message.content ? null :
                                                    <div className="bg-primary text-white p-2 px-3 rounded-2" style={{ maxWidth: '100%', textAlign: 'start', whiteSpace: 'pre-wrap' }}>{message.content}</div>

                                                  }
                                                </>
                                              }


                                            </>

                                            :
                                            <>
                                                  {!message.contentUrlImage ? null :
                                                    <img class="rounded h-200px" src={message.contentUrlImage} alt=""></img>

                                                  }

                                                  {!message.content ? null :
                                                    <div className="bg-primary text-white p-2 px-3 rounded-2" style={{ maxWidth: '100%', textAlign: 'start', whiteSpace: 'pre-wrap' }}>{message.content}</div>

                                                  }
                                                </>
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  }

                                })}</> : <div className="d-flex mb-1">

                                  <div className="flex-grow-1">
                                    <div className="w-100">
                                      <div className="d-flex flex-column align-items-start">
                                        <div className="bg-light text-secondary p-3 rounded-2">
                                          <div className="typing d-flex align-items-center">
                                            <div className="dot" />
                                            <div className="dot" />
                                            <div className="dot" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                }


                              </div>
                              {/* Chat conversation END */}
                              <form style={{
                                position: 'absolute',
                                bottom: -81,
                                left: 0,
                                width: '100%'
                              }} className="card-footer" onSubmit={(e) => handleSubmit(e, user, partner.partner, type, setType)}

                              >
                                <div>
                                  
                                  <div id="fileList">
                                  </div>
                                  
                                  
                                </div>
                                <div className="d-sm-flex align-items-end">
                                  <textarea onKeyDown={

                                    (e) => handleKeyPress(e, user, partner.partner, type, setType)} id={`my-textarea-${partner.partner._id}`} onFocus={(e) => { handleFocus(e, partner.partner._id) }} onChange={(e) => setType(e.target.value)} className="form-control mb-sm-0 mb-3" data-autoresize placeholder="Type a message" rows={1} value={type} />
                                  <button className="btn btn-sm btn-danger-soft ms-sm-2"><i className="fa-solid fa-face-smile fs-6" /></button>
                                  <div style={{ padding: 0 }} className="btn btn-sm btn-secondary-soft ms-2">

                                    <label class="custom-file-upload" style={{
                                      width: 40,
                                      height: 34,
                                      paddingTop: 9,
                                      cursor: "pointer"

                                    }}>
                                      <input id='filepicker'
                                        multiple  //: chọn nhiều file
                                        type="file" style={{ display: 'none' }} />
                                      <i className="fa-solid fa-paperclip fs-6" />
                                    </label>
                                  </div>
                                  <button type='submit' className="btn btn-sm btn-primary ms-2"><i className="fa-solid fa-paper-plane fs-6" /></button>
                                </div>
                              </form>
                            </div>
                          </>
                            :

                            <div className="fade tab-pane h-100" id={`chat-${partner.partner._id}`} role="tabpanel" aria-labelledby={`chat-${partner.partner._id}-tab`}>
                              {/* Top avatar and status START */}
                              <div className="d-sm-flex justify-content-between align-items-center">
                                <div className="d-flex mb-2 mb-sm-0">
                                  <div className="flex-shrink-0 avatar me-2">
                                    <img className="avatar-img rounded-circle" src={partner.partner.avatarUrl} alt />
                                  </div>
                                  <div className="d-block flex-grow-1">
                                    <h6 className="mb-0 mt-1">{partner.partner.fullName}</h6>
                                    {partner.partner.socketId ?
                                      <div className="small text-secondary"><i className="fa-solid fa-circle text-success me-1" />Online</div>
                                      :
                                      <div className="small text-secondary"><i className="fa-solid fa-circle text-danger me-1" />Offline</div>

                                    }

                                  </div>
                                </div>
                                <div className="d-flex align-items-center">
                                  {/* Call button */}
                                  <a href="#!" className="icon-md rounded-circle btn btn-primary-soft me-2 px-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Audio call"><i className="bi bi-telephone-fill" /></a>
                                  <a href="#!" className="icon-md rounded-circle btn btn-primary-soft me-2 px-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Video call"><i className="bi bi-camera-video-fill" /></a>
                                  {/* Card action START */}
                                  <div className="dropdown">
                                    <a className="icon-md rounded-circle btn btn-primary-soft me-2 px-2" href="#" id="chatcoversationDropdown" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false"><i className="bi bi-three-dots-vertical" /></a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="chatcoversationDropdown">
                                      <li><a className="dropdown-item" href="#"><i className="bi bi-check-lg me-2 fw-icon" />Mark as read</a></li>
                                      <li><a className="dropdown-item" href="#"><i className="bi bi-mic-mute me-2 fw-icon" />Mute conversation</a></li>
                                      <li><a className="dropdown-item" href="#"><i className="bi bi-person-check me-2 fw-icon" />View profile</a></li>
                                      <li><a className="dropdown-item" href="#"><i className="bi bi-trash me-2 fw-icon" />Delete chat</a></li>
                                      <li className="dropdown-divider" />
                                      <li><a className="dropdown-item" href="#"><i className="bi bi-archive me-2 fw-icon" />Archive chat</a></li>
                                    </ul>
                                  </div>
                                  {/* Card action END */}
                                </div>
                              </div>
                              {/* Top avatar and status END */}
                              <hr />
                              {/* Chat conversation START */}
                              <div id={`chat-container-${partner.partner._id}`} className="chat-conversation-content custom-scrollbar chat-container" style={{ overflowY: 'scroll', }}  >
                                {/* Chat time */}
                                <div className="text-center small my-2">Jul 16, 2022, 06:15 am</div>
                                {/* Chat message left */}
                                {message ? <>  {message.messages.map((message) => {
                                  if (message.senderId._id == partner.partner._id) {
                                    return <div className="d-flex mb-1">
                                      <div className="flex-shrink-0 avatar avatar-xs me-2">
                                        <img className="avatar-img rounded-circle" src={message.senderId.avatarUrl} alt />
                                      </div>
                                      <div className="flex-grow-1" style={{ maxWidth: '80%' }}>
                                        <div style={{ maxWidth: '75%' }}>
                                          <div className="d-flex flex-column align-items-start">
                                            <div className="bg-light text-secondary p-2 px-3 rounded-2" style={{ maxWidth: '100%', textAlign: 'start', whiteSpace: 'pre-wrap' }}>{message.content}</div>
                                            <div className="small my-2">{returnHour(message.date)}</div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  } else {
                                    return <div className="d-flex justify-content-end text-end mb-1">
                                      <div style={{ maxWidth: '75%' }}>
                                        <div className="d-flex flex-column align-items-end">

                                          {message.isSeen ?
                                            <>
                                              {message._id != lastMessagePartnerId ?
                                                <>
                                                  <div className="bg-primary text-white p-2 px-3 rounded-2" style={{ maxWidth: '100%', textAlign: 'start', whiteSpace: 'pre-wrap' }}>{message.content}</div>
                                                  <span>seen</span>
                                                </>
                                                :
                                                <div className="bg-primary text-white p-2 px-3 rounded-2" style={{ maxWidth: '100%', textAlign: 'start', whiteSpace: 'pre-wrap' }}>{message.content}</div>

                                              }


                                            </>

                                            :
                                            <div className="bg-primary text-white p-2 px-3 rounded-2" style={{ maxWidth: '100%', textAlign: 'start', whiteSpace: 'pre-wrap' }}>{message.content}</div>
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  }

                                })}</> : <div className="d-flex mb-1">

                                  <div className="flex-grow-1">
                                    <div className="w-100">
                                      <div className="d-flex flex-column align-items-start">
                                        <div className="bg-light text-secondary p-3 rounded-2">
                                          <div className="typing d-flex align-items-center">
                                            <div className="dot" />
                                            <div className="dot" />
                                            <div className="dot" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                }


                              </div>
                              {/* Chat conversation END */}
                              <form style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                width: '100%'
                              }} className="card-footer" onSubmit={(e) => handleSubmit(e, user, partner.partner, type, setType)}

                              >

                                <div className="d-sm-flex align-items-end">
                                  <textarea onKeyDown={

                                    (e) => handleKeyPress(e, user, partner.partner, type, setType)} id={`my-textarea-${partner.partner._id}`} onFocus={(e) => { handleFocus(e, partner.partner._id) }} onChange={(e) => setType(e.target.value)} className="form-control mb-sm-0 mb-3" data-autoresize placeholder="Type a message" rows={1} value={type} />
                                  <button className="btn btn-sm btn-danger-soft ms-sm-2"><i className="fa-solid fa-face-smile fs-6" /></button>
                                  <div className="btn btn-sm btn-secondary-soft ms-2">

                                    <input type='file' />

                                    <i className="fa-solid fa-paperclip fs-6" /></div>
                                  <button type='submit' className="btn btn-sm btn-primary ms-2"><i className="fa-solid fa-paper-plane fs-6" /></button>
                                </div>
                              </form>
                            </div>
                          }

                        </>

                      )}

                    </div>
                  </div>

                </div>
              </div>
              {/* Chat conversation END */}
            </div> {/* Row END */}
            {/* =======================
  Chat END */}
          </div>
          {/* Container END */}
        </main>
        {/* **************** MAIN CONTENT END **************** */}
        {/* Chat START */}
        <div className="position-fixed bottom-0 end-0 p-3">
          {/* Chat toast START */}
          <div id="chatToast" className="toast bg-mode" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
            <div className="toast-header bg-mode d-flex justify-content-between">
              {/* Title */}
              <h6 className="mb-0">New message</h6>
              <button className="btn btn-secondary-soft-hover py-1 px-2" id='closeToastChat' data-bs-dismiss="toast" aria-label="Close"><i className="fa-solid fa-xmark" /></button>
            </div>
            {/* Top avatar and status END */}
            <div className="toast-body collapse show" id="collapseChat">
              {/* Chat conversation START */}
              {/* Form */}
              <form>
                <div className="input-group mb-3">
                  <span className="input-group-text border-0">To</span>

                  {userSelected ?
                    <div style={{ marginLeft: 12 }}>{userSelected.fullName}
                      <button onClick={(e) => {
                        clickCloseSelectedUser(e)
                      }} className="btn btn-secondary-soft-hover py-1 px-2" aria-label="Close"><i className="fa-solid fa-xmark" /></button>

                    </div>
                    :
                    <input className="form-control" type="text" onChange={(e) => {
                      setTypeSearchUser(e.target.value)


                    }} value={typeSearchUser} placeholder="Type a name or multiple names" />
                  }

                  {!usersSearch ? null :
                    <div style={{
                      position: 'relative',
                      top: 0,
                      left: '42px',
                      backgroundColor: 'aliceblue',
                      width: '299px',
                      minHeight: '50px',
                      overflow: 'hidden',
                      maxHeight: 300
                    }}>


                      <ul className="nav flex-column nav-pills nav-pills-soft" style={{

                        maxWidth: '100%',
                        overflowY: 'scroll',
                        maxHeight: '100%',
                        display: 'block',
                        scrollbarWidth: 10
                      }}>

                        {usersSearch.map((user) =>
                          <li onClick={() => {
                            clickSearchToSelectUser(user)
                          }}  >
                            {/* Chat user tab item */}
                            <div className="nav-link active text-start"  >
                              <div className="d-flex">
                                <div className="flex-shrink-0 avatar avatar-story me-2 status-online">
                                  <img className="avatar-img rounded-circle" src={user.avatarUrl} alt />
                                </div>
                                <div className="flex-grow-1 d-block">
                                  <h6 className="mb-0 mt-1">{user.fullName}</h6>
                                </div>
                              </div>
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                  }
                </div>
              </form>
              {/* Chat conversation END */}
              {/* Extra space */}
              <div className="h-200px" />
              {/* Button  */}
              <div className="d-sm-flex align-items-end">
                <textarea onKeyDown={
                  (e) => handleKeyPress(e, user, userSelected, typeNewMessage, setTypeNewMessage)} className="form-control mb-sm-0 mb-3" placeholder="Type a message" rows={1} spellCheck="false"
                  value={typeNewMessage} onChange={(e) => setTypeNewMessage(e.target.value)}
                />
                <button className="btn btn-sm btn-danger-soft ms-sm-2"><i className="fa-solid fa-face-smile fs-6" /></button>
                <button className="btn btn-sm btn-secondary-soft ms-2"><i className="fa-solid fa-paperclip fs-6" /></button>
                <button onClick={(e) => handleSubmit(e, user, userSelected, typeNewMessage, setTypeNewMessage)} className="btn btn-sm btn-primary ms-2"><i className="fa-solid fa-paper-plane fs-6" /></button>
              </div>
            </div>
          </div>
          {/* Chat toast END */}
        </div>
        {/* Chat END */}
      </div>

    </>
  )
}
