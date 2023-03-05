import { formatDistance } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { BiComment, BiLike } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { Avatar } from '../components';
import CommentList from '../components/CommentList';
import PostDropdown from '../components/PostDropdown';
import usePost from '../hooks/usePost';

export default function Post() {
  const [post , setPost] = useState(false)
  const {id} = useParams()
  const { getSinglePost } = usePost();
  const [comment,setComment] = useState()
  const [rootComment , setRootComment] = useState([])

  const commentsDummy = [{
    message: "I am a root comment",
    userId: "6403637f0fb114cc128cbdf8",
    user :{
      name : "Deb"
    },
    postId: "640432fd002a32a011ce2fcb",
    commentId : "1",
    parentId :null
  },

  {
    message: "I am a nested comment",
    userId: "6403637f0fb114cc128cbdf8",
    postId: "640432fd002a32a011ce2fcb",
    user :{
      name : "notDeb"
    },
    commentId : "2",
    parentId : "1"
  },

  {
    message: "I am a nested nested comment",
    userId: "6403637f0fb114cc128cbdf8",
    user :{
      name : "Deb"
    },
    postId: "640432fd002a32a011ce2fcb",
    commentId : "3",
    parentId : "2"
  },

  {
    message: "I am another root comment",
    userId: "6403637f0fb114cc128cbdf8",
    user :{
      name : "Deb"
    },
    postId: "640432fd002a32a011ce2fcb",
    commentId : "4",
    parentId :null
  },

  {
    message: "I am a nested comment",
    userId: "6403637f0fb114cc128cbdf8",
    user :{
      name : "NotDeb"
    },
    postId: "640432fd002a32a011ce2fcb",
    commentId : "5",
    parentId : "4"
  },

]
  

  const submitHandler = (e)=>{
    e.preventDefault();
    
  }

  async function getPostHandler() {
    const body = [id]
    const  data = await getSinglePost(body);
    setPost(data.data)
    const group = {}
    commentsDummy.forEach(comment => {
      group[comment.parentId] ||= []
      group[comment.parentId].push(comment)
    })
    setRootComment(group[null])
  }

  useEffect(() => {
    getPostHandler();
  }, []);
  
  return ( <div className=' container-center'>
  {!post ? null : ( 
  <div className="mx-auto border-b-2 border-diffused bg-white my-2 rounded-lg p-2 ">    
        <div className="postHeader flex items-center justify-between p-1">
          <div className="postInfo flex items-center gap-3">
            <Avatar variant="bauhaus" name={post[0].groupName} />
            <div>
              <div>{post[0].groupName}</div>
              <div className="text-dark text-xs">
                {post[0].username} | {formatDistance(new Date(post[0].timestamps), new Date(), { addSuffix: true })}
              </div>
            </div>
            
          </div>
          <PostDropdown />
        </div>
        <div className="postBody p-1">
          <div className="title leading-tight py-2 font-medium text-lg">
            {post[0].title}
          </div>
          <div className="text-dark">{post[0].caption}</div>
        </div>
        <div className="flex justify-center items-center">
          <div className="p-3 rounded-xl flex justify-begin items-center hover:bg-diffused">
            <BiLike />
          </div>
        </div>
        
      </div>)}
      <h3>Comments</h3>
      <form className='flex' onSubmit={submitHandler}>
      <input
          className='border-secondary border-2 p-2 px-3 rounded-lg focus:border-dark'
          type='text'
          id='comment'
          placeholder='Comment'
          onChange={(e) => setComment(e.target.value)}
        />
         <button className=' ml-2   p-3 bg-primary text-white  rounded-lg' type='submit' >
          Post
        </button>
      </form>
      <section>
        {rootComment != null && rootComment.length > 0 &&(
          <div>
            <CommentList comments={rootComment} />
          </div>
        )}
      </section>
  </div>
    
  )
}
