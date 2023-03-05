import React, { useState } from 'react'
import { useCommentContext } from '../context/CommentContext'
import usePost from '../hooks/usePost'
import CommentList from '../components/CommentList';
import { useParams } from 'react-router-dom';


export default function Comment({_id , message , user , createdAt}) {
  const {getReplies ,comments , setComments} = useCommentContext()
  const [isReplying, setIsReplying] = useState(false)
  const childComments = getReplies(_id)
  const [areChildrenHidden , setAreChildrenHidden] = useState(false)
  const dateFormatter = new Intl.DateTimeFormat(undefined, { dateStyle : "medium" , timeStyle : "short"})
  const [messages , setMessages] = useState("")
  const {createComment} = usePost()
  const {id} = useParams()

  const submitHandler = (e)=>{
    e.preventDefault();
    const body = {
      id : id,
      message : messages,
      parentId : _id
    }
    setMessages("")
    createComment(body).then((res)=>{
      setComments([res.data,...comments])
    })
  }

  return ( <>
    <div className="comment">
      <div className="header">
        <span className="name">
          {user.username}
        </span>
        <span className="date">{dateFormatter.format(Date.parse(createdAt))}</span>
      </div>
      
      <div className="message">
        {message}
      </div>
      <div className="footer">
        <button className=' bg-diffused p-1 rounded-full' onClick={() => setIsReplying(!isReplying) }>💬</button>
      </div>
    </div>
    {isReplying && 
      <div className="m-2">
        <form className='flex' onSubmit={submitHandler}>
      <input
          className='border-secondary border-2 p-2 px-3 rounded-lg focus:border-dark'
          value = {messages}
          type='text'
          id='comment'
          placeholder='Comment'
          onChange={(e) => setMessages(e.target.value)}
        />
         <button className=' ml-2   p-3 bg-primary text-white  rounded-lg' type='submit' >
          Post
        </button>
      </form>
      </div>
    }
    {childComments?.length > 0 &&(
      <>
      {!areChildrenHidden &&
      <div className={`nested-comments-stack`}>
      <button
        className="collapse-line"
        aria-label="Hide Replies"
        onClick={() => setAreChildrenHidden(true)}
      />
      <div className="nested-comments">
        <CommentList comments={childComments} />
      </div>
    </div>
      }
        
          {areChildrenHidden &&
           <button
           className={`btn mt-1 ${!areChildrenHidden ? "hide" : ""}`}
           onClick={() => setAreChildrenHidden(false)}
         >
           Show Replies
         </button>
          }
         
      </>
    )}
  </>
    
  )
}
