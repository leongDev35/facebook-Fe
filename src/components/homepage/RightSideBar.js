import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios'
import { SITE, socket } from '../../App';

export default function RightSideBar() {

  const [listStranger, setListStranger] = useState([]);

  const user = useSelector(({ users }) => {
    return users.currentUser.userData
  })

  async function handleSentFriendRequest( idReceiver) {
    try {
        socket.emit('sendFriendRequest', user._id , idReceiver)

        const updateListStranger = [...listStranger]
        const newArray = updateListStranger.filter((item) => item._id !== idReceiver);
        console.log(newArray);
        setListStranger(newArray);
        await axios.post(`${SITE}/users/friend/request`, {
            
              idSender: user._id,
              idReceiver: idReceiver
              // after: endCursor, // Gửi giá trị con trỏ trong đường dẫn URL
            
          });

         

    } catch (error) {
     console.log(error);   
    }


  }

  const loadListStranger = async () => {
    try {
      const response = await axios.get(`${SITE}/users/stranger`, {
        params: {
            userIdToCheck: user._id, 
          // after: endCursor, // Gửi giá trị con trỏ trong đường dẫn URL
        },
      });
      console.log(response.data);
      const newListStranger = response.data.stranger;
      setListStranger([...listStranger, ...newListStranger])

    } catch (error) {
      console.log(error);
    }

  }
  console.log(listStranger);
  useEffect(() => {
    loadListStranger();
  }, []);


  return (
    <>

      <div className="col-lg-3">
        <div className="row g-4">
          {/* Card follow START */}
          <div className="col-sm-6 col-lg-12">
            <div className="card">
              {/* Card header START */}
              <div className="card-header pb-0 border-0">
                <h5 className="card-title mb-0">Suggestion</h5>
              </div>
              {/* Card header END */}
              {/* Card body START */}
              <div className="card-body">

              {listStranger.map(friend => 
              <div className="hstack gap-2 mb-3">
              {/* Avatar */}
              <div className="avatar">
                <a href="#!"><img className="avatar-img rounded-circle" src={friend.avatarUrl} alt /></a>
              </div>
              {/* Title */}
              <div className="overflow-hidden">
                <a className="h6 mb-0" href="#!">{friend.fullName} </a>
                <p className="mb-0 small text-truncate">News anchor</p>
              </div>
              {/* Button */}
              <a onClick={()=>{
                    handleSentFriendRequest(friend._id);
                  }} className="btn btn-primary-soft rounded-circle icon-md ms-auto" ><i className="fa-solid fa-plus"> </i></a>
            </div> )}
                
                {/* Connection item END */}
                {/* View more button */}
                <div className="d-grid mt-3">
                  <a className="btn btn-sm btn-primary-soft" href="#!">View more</a>
                </div>
              </div>
              {/* Card body END */}
            </div>
          </div>
          {/* Card follow START */}

        </div>
      </div>
    </>
  )
}
