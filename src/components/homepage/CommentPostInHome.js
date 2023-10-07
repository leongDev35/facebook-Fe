
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from "react-redux";
import { socket } from '../../App';

export default function CommentPostInHome({ postId }) {
    const [comments, setComments] = useState([]);
    console.log(comments);

    const user = useSelector(({ users }) => {
        return users.currentUser.userData
    })
    function returnDate(datePost) {
        const dateString = datePost;
        const timestamp = new Date(dateString).getTime();
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const monthName = monthNames[month];
        return `${monthName} ${day} ${year} at ${hours}:${minutes}`
    }
    const loadComments = async () => {
        console.log(1);
        try {
            const response = await axios.get(`http://localhost:3001/posts/comment`, {
                params: {
                    postId: postId,
                },
            });
            const newComments = response.data.comments;
            setComments([...comments, ...newComments]);
        } catch (error) {
            console.error(error);
        }
    };
    async function submitForm(event, p, u) {
        event.preventDefault(); // Ngăn chặn form gửi thông tin mặc định
        const textarea = event.target.querySelector('textarea');
        const comment = textarea.value;
        socket.emit('comment', p, u, comment)
        setTextarea("")
        textarea.value = '';
    }
    const [textarea, setTextarea] = useState(
        ""
    );
    const handleChange = (event) => {
        setTextarea(event.target.value)
    }

    //! Socket 
        //! set comment trên bài post real time
    socket.on(`comment${postId}`, (commentS, p) => {
        setComments(commentS)
    });


    useEffect(() => {
        loadComments();
    }, []);
    return (
        <>
            {/* Add comment */}
            <div className="d-flex mb-3">
                {/* Avatar */}
                <div className="avatar avatar-xs me-2">
                    <a href="#!"> <img className="avatar-img rounded-circle" src={user.avatarUrl} alt /> </a>
                </div>
                {/* Comment box  */}

                <form class="w-100" onSubmit={(e) => {
                    submitForm(e, postId, user._id)
                }} >
                    <div class="input-group">
                        <textarea value={textarea} onChange={handleChange} data-autoresize="true" class="form-control pe-4 bg-light" rows="1" placeholder="Add a comment..."></textarea>
                        <button type="submit" class="btn btn-primary">
                            <i class="bi bi-arrow-right-circle-fill"></i>
                        </button>
                    </div>
                </form>
            </div>
            <ul className="comment-wrap list-unstyled">

                {comments.map(comment => <li className="comment-item">
                    <div className="d-flex position-relative">
                        {/* Avatar */}
                        <div className="avatar avatar-xs">
                            <a href="#!"><img className="avatar-img rounded-circle" src={comment.idUserComment.avatarUrl} alt /></a>
                        </div>
                        <div className="ms-2">
                            {/* Comment by */}
                            <div className="bg-light rounded-start-top-0 p-3 rounded">
                                <div className="d-flex justify-content-between">
                                    <h6 className="mb-1"> <a href="#!"> {comment.idUserComment.fullName}</a></h6>
                                    <small className="ms-2">{returnDate(comment.date)}</small>
                                </div>
                                <p className="small mb-0">{comment.contentComment}</p>
                            </div>
                            {/* Comment react */}
                            <ul className="nav nav-divider py-2 small">
                                <li className="nav-item">
                                    <a className="nav-link" href="#!"> Like (3)</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#!"> Reply</a>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                    
                </li>)}
                {/* Comment item START */}

                {/* Comment item END */}

            </ul>
        </>
    )
}
