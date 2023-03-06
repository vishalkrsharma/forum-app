import React from 'react'
import Comment from './Comment'

export default function CommentList({comments}) {
  return comments.map(comment =>(
    <div key = {comment._id} className = "comment-stack ">
      <Comment {...comment}/>
    </div>
  ))
  
}
