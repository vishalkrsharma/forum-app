import React from 'react'
import usePost from '../hooks/usePost'

export default function Comment({id , message , user , createdAt}, {commentsByParentId}) {
  console.log(message)
  const {getReplies} = usePost()
  const childComments = getReplies(id , commentsByParentId)

  const dateFormatter = new Intl.DateTimeFormat(undefined, { dateStyle : "medium" , timeStyle : "short"})
  return ( <>
    <div className="comment">
      <div className="header">
        <span className="name">
          {user.name}
        </span>
        <span className="date">{dateFormatter.format(Date.parse(new Date()))}</span>
      </div>
      <div className="message">
        {message}
      </div>
    </div>
  </>
    
  )
}
