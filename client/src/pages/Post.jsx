import { formatDistance } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { BiComment, BiLike } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { Avatar } from '../components';
import CommentList from '../components/CommentList';
import PostDropdown from '../components/PostDropdown';
import { useCommentContext } from '../context/CommentContext';
import usePost from '../hooks/usePost';

export default function Post() {
  const [post , setPost] = useState(false)
  const {id} = useParams()
  const { getSinglePost , createComment } = usePost();
  const {comments , setComments , rootComments} = useCommentContext()
  const [message , setMessage] = useState("");

  const submitHandler = (e)=>{
    e.preventDefault();
    const body = {
      id : id,
      message : message
    }
    setMessage("")
    createComment(body).then((res)=>{
      setComments([res.data,...comments])
    })
  }

  async function getPostHandler() {
    const body = [id]
    const  data = await getSinglePost(body);
    setPost(data.data)
  }

  useEffect(() => {
    getPostHandler();
  }, []);
  
  return ( <div className=' container-centertext-left lg:w-1/2 mx-auto'>
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
          value = {message}
          type='text'
          id='comment'
          placeholder='Comment'
          onChange={(e) => setMessage(e.target.value)}
        />
         <button className=' ml-2   p-3 bg-primary text-white  rounded-lg' type='submit' >
          Post
        </button>
      </form>
      <section>
        {rootComments != null && rootComments.length > 0 &&(
          <div>
            <CommentList comments={rootComments} />
          </div>
        )}
      </section>
  </div>
    
  )
}
