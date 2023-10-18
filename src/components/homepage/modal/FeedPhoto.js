import React, { useEffect, useRef, useState } from 'react'

import { useSelector } from "react-redux";
//! firebase 
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import { SITE } from '../../../App';
export default function FeedPhoto({ posts, setPosts }) {


  const [listFileImage, setListFileImage] = useState([]);
  const [content, setContent] = useState();
  const user = useSelector(({ users }) => {
    return users.currentUser.userData
  })
  //! xử lý firebase
  console.log(content);
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
  function getLinkByListFileItems(listFile, content) {
    
    console.log(listFile);
    for (let i = 0; i < listFile.length; i++) {
      const storageRef = ref(storage, `${user._id}/${listFile[i].name}`);

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
            createPost(downloadURL, content)

            setListFileImage([])
          });
        }
      );

    }
  }
  async function createPost(imageUrl, content) {
    try {
      const response = await axios.post(`${SITE}/posts`, {
        content: content,
        contentImage: imageUrl,
        ownerId: user._id,
        pageId: user._id
      });
      console.log(response.data.post);
      const newPosts = {...response.data.post, ownerPost: user}
      setPosts([newPosts,...posts])

    } catch (error) {
      console.log(error);
    }


  }

  function handleSubmit() {

    console.log(content);
    console.log(listFileImage);
    //! gọi api tạo post và thay đổi bài post
    getLinkByListFileItems(listFileImage, content)



    const ul = document.getElementById(`ul-listImage`);
    if (ul) {
      ul.parentNode.removeChild(ul);
    }

    setContent('');
    setListFileImage([])
  }


  console.log(listFileImage);
  useEffect(() => {
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
          list.id = `ul-listImage`;

          fileList.appendChild(list);
          for (let i = 0; i < files.length; i++) {
            // uploadBytes(storageRef, files[i]).then((snapshot) => {
            //   console.log('Uploaded a blob or file!');
            // });

            const li = document.createElement("li");
            list.appendChild(li);
            li.style.width = "400px"; // Màu chữ
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

    if (listFileImage.length > 0 && listFileImage) {
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
  }, [listFileImage])

  return (
    <>
      <div className="modal fade" id="feedActionPhoto" tabIndex={-1} aria-labelledby="feedActionPhotoLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {/* Modal feed header START */}
            <div className="modal-header">
              <h5 className="modal-title" id="feedActionPhotoLabel">Add post</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            {/* Modal feed header END */}
            {/* Modal feed body START */}
            <div className="modal-body">
              {/* Add Feed */}
              <div className="d-flex mb-3">
                {/* Avatar */}
                <div className="avatar avatar-xs me-2">
                  <img className="avatar-img rounded-circle" src={user.avatarUrl} alt />
                </div>
                {/* Feed box  */}
                <form className="w-100">
                  <textarea className="form-control pe-4 fs-3 lh-1 border-0" rows={2} placeholder="Share your thoughts..." onChange={(e) => setContent(e.target.value)} value={content} />
                </form>
              </div>
              {/* Dropzone photo START */}
              <div>

                <div className="dropzone dropzone-default card shadow-none" data-dropzone="{&quot;maxFiles&quot;:2}">

                  {listFileImage.length > 0 ? null :
                    <label className="form-label" style={{ width: "100%", height: "100%", cursor: 'pointer' }}>
                      <input id='filepicker'
                        multiple  //: chọn nhiều file
                        type="file" style={{ display: 'none' }} />
                      <div className="dz-message" style={{ textAlign: 'center' }}>
                        <i className="bi bi-images display-3" />
                        <p>Click to upload photo.</p>
                      </div>
                    </label>
                  }
                  <div id="fileList">
                  </div>



                </div>
              </div>
              {/* Dropzone photo END */}
            </div>
            {/* Modal feed body END */}
            {/* Modal feed footer */}
            <div className="modal-footer ">
              {/* Button */}
              <button type="button" className="btn btn-danger-soft me-2" data-bs-dismiss="modal">Cancel</button>
              <button onClick={(e) => {
                handleSubmit();
              }} type="button" className="btn btn-success-soft" data-bs-dismiss="modal">Post</button>
            </div>
            {/* Modal feed footer */}
          </div>
        </div>
      </div>
    </>
  )
}
