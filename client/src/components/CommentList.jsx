import React from 'react'
import Comment from './Comment'

export default function CommentList({comments}) {
  console.log(comments)
  return comments.map(comment =>(
    <div key = {comment.commentId} className = "mt-3">
      <Comment {...comment}/>
    </div>
  ))
  
}
