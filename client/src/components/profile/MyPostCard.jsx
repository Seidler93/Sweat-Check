import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../utils/mutations';
import Card from 'react-bootstrap/Card';
import Auth from '../../utils/auth';
import Modal from 'react-bootstrap/Modal';

export default function MyPostCard({ post }) {
  const [commentText, setCommentText] = useState('');
  const [show, setShow] = useState(false);
  const userInfo = Auth.getProfile();
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [addComment, { error, data }] = useMutation(ADD_COMMENT);
  //console.log(post.comments); 
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    addComment({
      variables: {
        postId: post._id,
        commentInput: {
          userId: userInfo._id,
          username: userInfo.username,
          commentText,
          postId: post._id
        },
      },
    })
      .then((result) => {
        // Handle success
        //console.log('Comment added successfully', result);
      })
      .catch((error) => {
        // Handle error
        console.error('Error adding comment', error);
      });

    // Clear the input field after submission
    setCommentText('');
  };

  return (
    <>
      <div className='post-card' onClick={handleShow}>
        <img src={post.mediaUrl} alt="" className='post-cont-img'/>
      </div>
      <Modal show={show} onHide={handleClose} className='text-dark rel pt-5'>
        <button onClick={handleClose} className='close-btn'>X</button>
        <div className='d-flex bg-dark justify-content-between px-3'>
          <h2 className=''>{post.username}</h2>
          <h2>{post.workoutName}</h2>
        </div>
        <div className='d-flex flex-column'>
          <img src={post.mediaUrl} alt="" className='post-img'/>
          <div className='d-flex flex-column px-2'>
            <h4>Comments:</h4>
            {post.comments.map((comment, index) => 
            <div key={index} className='d-flex justify-content-end px-2 flex-wrap'>
              <div className='d-flex justify-content-between w100'>
                <p>{comment.commentText}</p>
                <p>{comment.commentAuthor}</p>
              </div>
              <p>{comment.createdAt}</p>
            </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}