import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import NavBar from '../components/homepage/NavBar';
import { notification } from "antd";
import axios from 'axios';
import { SITE } from '../App';
import { useDispatch } from "react-redux";
import { updateUser } from '../service/userService';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link } from 'react-router-dom';

export default function Setting() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('')
  const [filePicked, setFilePicked] = useState('')
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();

  const user = useSelector(({ users }) => {
    return users.currentUser.userData
  })
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


  function getLinkByListFileItems(listFile, avatarChange) {

    console.log(listFile);

    const storageRef = ref(storage, `${user._id}/${listFile.name}`);

    const metadata = {
      contentType: 'image/jpeg'
    };
    const uploadTask = uploadBytesResumable(storageRef, listFile, metadata);
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
          setAvatarUrl(downloadURL)
        });
      }
    );

  }
  console.log(avatarUrl);
  useEffect(() => {
    setEmail(user.email)
    setFullName(user.fullName)
    setBirthday(user.birthday)
    setPhoneNumber(user.phoneNumber)
    setUsername(user.userName)
  }, [])
  //! thay đổi trên server và thay đổi user trong store
  function isValidEmail(email) {
    // Sử dụng biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  useEffect(() => {
    const filepicker = document.getElementById("filepicker");
    const avatarUrl = document.getElementById("avatarUrl");
    console.log(filepicker);
    console.log(avatarUrl);
    filepicker.addEventListener("change", (event) => {
      const file = event.target.files;
      console.log(file);
      setFilePicked(file[0])
      getLinkByListFileItems(file[0])
    })
    console.log(filePicked);
    if (filePicked) {
      avatarUrl.src = URL.createObjectURL(filePicked);
    }
  }, [filePicked])

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(1);
      if (!isValidEmail(email)) {
        api.info({
          message: 'Email invalid'
        })
        console.log(1);
      } else {
        console.log(email);

        console.log(avatarUrl);
        const userUpdate = { avatarUrl: avatarUrl, userNameCurrent: user.userName, userId: user._id, userName: username, emailCurrent: user.email, email: email, fullName: fullName, birthday: birthday, phoneNumber: phoneNumber, bio: bio }

        const res = await axios.post(`${SITE}/users/check`, userUpdate);

        if (res.data.message == `User ${username} exists already`) {
          api.info({
            message: `User ${username} exists already`
          })
        } else if (res.data.message == `Email ${email} exists already`) {
          api.info({
            message: `Email ${email} exists already`
          })
        } else { //! xu li khi da xac thuc email va userName
          console.log(res.data.message);
          console.log(res.data.userUpdate);
          //! luu lai user trong store


          dispatch(updateUser(res.data.userUpdate))


        }
      }
    } catch (error) {
      console.log(error);
    }


  }
  const handleChangePassword = async (event) => {
    try {
      event.preventDefault();
      const pswCurrent = document.getElementById("psw-current");
      console.log(pswCurrent.value);
      const pswNew = document.getElementById("psw-new");
      console.log(pswNew.value);
      const pswConfirm = document.getElementById("psw-confirm");
      console.log(pswConfirm.value);

      const response = await axios.put(`${SITE}/users/password/${user._id}`, {
        password: pswCurrent.value,
        newPassword: pswNew.value,
        checkNewPassword: pswConfirm.value,
      });

      console.log(response);
      if (response.data.message == 'Mật khẩu cũ không đúng') {
        
        api.info({
          message: 'Mật khẩu cũ không đúng'
        })
      } else if (response.data.message == 'Mật khẩu mới không trùng nhau') {
        api.info({
          message: 'Mật khẩu mới không trùng nhau'
        })
      } else if (response.data.message == 'Mật khẩu đã được cập nhật') {
        api.info({
          message: 'Mật khẩu đã được cập nhật'
        })
        pswCurrent.value = ''
        pswNew.value = ''
        pswConfirm.value = ''
      }
    } catch (error) {
      console.log(error);
    }


  }
  return (
    <>{contextHolder}
      <NavBar user={user}></NavBar>

      <main>
        {/* Container START */}
        <div className="container">
          <div className="row">
            {/* Sidenav START */}
            <div className="col-lg-3">
              {/* Advanced filter responsive toggler START */}
              {/* Divider */}
              <div className="d-flex align-items-center mb-4 d-lg-none">
                <button className="border-0 bg-transparent" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                  <i className="btn btn-primary fw-bold fa-solid fa-sliders" />
                  <span className="h6 mb-0 fw-bold d-lg-none ms-2">Settings</span>
                </button>
              </div>
              {/* Advanced filter responsive toggler END */}
              <nav className="navbar navbar-light navbar-expand-lg mx-0">
                <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasNavbar">
                  {/* Offcanvas header */}
                  <div className="offcanvas-header">
                    <button type="button" className="btn-close text-reset ms-auto" data-bs-dismiss="offcanvas" aria-label="Close" />
                  </div>
                  {/* Offcanvas body */}
                  <div className="offcanvas-body p-0">
                    {/* Card START */}
                    <div className="card w-100">
                      {/* Card body START */}
                      <div className="card-body">
                        {/* Side Nav START */}
                        <ul className="nav nav-tabs nav-pills nav-pills-soft flex-column fw-bold gap-2 border-0">
                          <li className="nav-item" data-bs-dismiss="offcanvas">
                            <a className="nav-link d-flex mb-0 active" href="#nav-setting-tab-1" data-bs-toggle="tab"> <img className="me-2 h-20px fa-fw" src="assets/images/icon/person-outline-filled.svg" alt /><span>Account </span></a>
                          </li>
                        
                        </ul>
                        {/* Side Nav END */}
                      </div>
                      {/* Card body END */}
                      {/* Card footer */}
                      <div className="card-footer text-center py-2">
                        <Link className="btn btn-link text-secondary btn-sm" to={'/mypost'}>View Profile </Link>
                      </div>
                    </div>
                    {/* Card END */}
                  </div>
                  {/* Offcanvas body */}
                  {/* Helper link START */}
                  <ul className="nav small mt-4 justify-content-center lh-1">
                    <li className="nav-item">
                      <a className="nav-link" href="my-profile-about.html">About</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="settings.html">Settings</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" target="_blank" href="https://support.webestica.com/login">Support </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" target="_blank" href="docs/index.html">Docs </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="help.html">Help</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="privacy-and-terms.html">Privacy &amp; terms</a>
                    </li>
                  </ul>
                  {/* Helper link END */}
                  {/* Copyright */}
                  <p className="small text-center mt-1">©2022 <a className="text-body" target="_blank" href="https://www.webestica.com/"> Webestica </a></p>
                </div>
              </nav>
            </div>
            {/* Sidenav END */}
            {/* Main content START */}
            <div className="col-lg-6 vstack gap-4">
              {/* Setting Tab content START */}
              <div className="tab-content py-0 mb-0">
                {/* Account setting tab START */}
                <div className="tab-pane show active fade" id="nav-setting-tab-1">
                  {/* Account settings START */}
                  <div className="card mb-4">
                    {/* Title START */}
                    <div className="card-header border-0 pb-0">
                      <h1 className="h5 card-title">Account Settings</h1>
                      <p className="mb-0">He moonlights difficult engrossed it, sportsmen. Interested has all Devonshire difficulty gay assistance joy. Unaffected at ye of compliment alteration to.</p>
                    </div>
                    {/* Card header START */}
                    {/* Card body START */}
                    <div className="card-body">
                      {/* Form settings START */}
                      <form className="row g-3" >
                        {/* First name */}
                        <div className="col-sm-6 col-lg-4">
                          <label className="form-label">Full name</label>
                          <input onChange={(event) => setFullName(event.target.value)} type="text" className="form-control" value={fullName} />
                        </div>


                        {/* User name */}
                        <div className="col-sm-6">
                          <label className="form-label">User name</label>
                          <input onChange={(event) => setUsername(event.target.value)} type="text" className="form-control" value={username} />
                        </div>
                        {/* Birthday */}
                        <div className="col-lg-6">
                          <label className="form-label">Birthday </label>
                          <input onChange={(event) => setBirthday(event.target.value)} type="text" className="form-control flatpickr" value={birthday} />
                        </div>

                        {/* Phone number */}
                        <div className="col-sm-6">
                          <label className="form-label">Phone number</label>
                          <input onChange={(event) => setPhoneNumber(event.target.value)} type="text" className="form-control" value={phoneNumber} />
                        </div>
                        {/* Phone number */}
                        <div className="col-sm-6">
                          <label className="form-label">Email</label>
                          <input onChange={(event) => setEmail(event.target.value)} type="text" className="form-control" value={email} />
                        </div>
                        {/* Page information */}
                        <div className="col-12">
                          <label className="form-label">Bio</label>
                          <textarea onChange={(event) => setBio(event.target.value)} className="form-control" rows={4} placeholder="Description (Required)" value={bio} />
                          <small>Character limit: 300</small>
                        </div>

                        <div className="col-sm-6" style={{ marginTop: 30 }}>
                          <label style={{ cursor: 'pointer' }} className="form-label">Avatar
                            <input id='filepicker'
                              //: chọn nhiều file
                              type="file" style={{ display: 'none' }} />
                            <div className="avatar avatar-lg mt-n5 mb-3" style={{ marginLeft: 10, border: '1px solid', borderRadius: 7 }}>
                              <div style={{ width: '100%', height: '100%' }}>
                                <img id='avatarUrl' className="avatar-img rounded border border-white border-3" src={user.avatarUrl} alt />
                              </div>
                            </div>
                          </label>

                        </div>


                        {/* Button  */}
                        <div className="col-12 text-end">
                          <button type='submit' onClick={(event) => {
                            handleSubmit(event)
                          }} className="btn btn-sm btn-primary mb-0">Save changes</button>
                        </div>
                      </form>
                      {/* Settings END */}
                    </div>
                    {/* Card body END */}
                  </div>
                  {/* Account settings END */}
                  {/* Change your password START */}
                  <div className="card">
                    {/* Title START */}
                    <div className="card-header border-0 pb-0">
                      <h5 className="card-title">Change your password</h5>
                      <p className="mb-0">See resolved goodness felicity shy civility domestic had but.</p>
                    </div>
                    {/* Title START */}
                    <div className="card-body">
                      {/* Settings START */}
                      <form className="row g-3">
                        {/* Current password */}
                        <div className="col-12">
                          <label className="form-label">Current password</label>
                          <input className="form-control fakepassword" type="password" id="psw-current" placeholder="Enter current password" />

                        </div>
                        {/* New password */}
                        <div className="col-12">
                          <label className="form-label">New password</label>
                          {/* Input group */}
                          <div className="input-group">
                            <input className="form-control fakepassword" type="password" id="psw-new" placeholder="Enter new password" />
                           
                          </div>
                          {/* Pswmeter */}
                          <div id="pswmeter" className="mt-2" />
                          <div id="pswmeter-message" className="rounded mt-1" />
                        </div>
                        {/* Confirm password */}
                        <div className="col-12">
                          <label className="form-label">Confirm password</label>
                          <input className="form-control fakepassword" type="password" id="psw-confirm" placeholder="Confirm password" />

                        </div>
                        {/* Button  */}
                        <div className="col-12 text-end">
                          <button onClick={(e) => {
                            handleChangePassword(e)
                          }} type="submit" className="btn btn-primary mb-0">Update password</button>
                        </div>
                      </form>
                      {/* Settings END */}
                    </div>
                  </div>
                  {/* Card END */}
                </div>
               
                {/* Close account tab END */}
              </div>
              {/* Setting Tab content END */}
            </div>
          </div> {/* Row END */}
        </div>
        {/* Container END */}
      </main>

    </>
  )
}
