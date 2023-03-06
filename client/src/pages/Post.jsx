import { formatDistance } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar } from '../components';
import CommentList from '../components/CommentList';
import PostDropdown from '../components/PostDropdown';
import { useCommentContext } from '../context/CommentContext';
import usePost from '../hooks/usePost';
import { BiLike, BiDislike, BiComment, BiSave } from 'react-icons/bi';

export default function Post() {
  const [post, setPost] = useState(false);
  const { id } = useParams();
  const { getSinglePost, createComment } = usePost();
  const { comments, setComments, rootComments } = useCommentContext();
  const [message, setMessage] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      id: id,
      message: message,
    };
    setMessage('');
    createComment(body).then((res) => {
      setComments([res.data, ...comments]);
    });
  };

  async function getPostHandler() {
    const body = [id];
    const data = await getSinglePost(body);
    setPost(data.data);
  }

  useEffect(() => {
    getPostHandler();
  }, []);

  console.log(post);

  return (
    <div className='text-left lg:w-1/2 mx-auto text-dark'>
      {!post ? null : (
        <div className='mx-auto border-b-2 border-diffused bg-white my-2 rounded-lg p-2'>
          <div className='postHeader flex items-center justify-between p-1'>
            <div className='postInfo flex items-center gap-3'>
              <Avatar variant='bauhaus' name={post[0].groupName} />
              <div>
                <div>{post[0].groupName}</div>
                <div className='text-dark text-xs'>
                  {post[0].username} | {formatDistance(new Date(post[0].timestamps), new Date(), { addSuffix: true })}
                </div>
              </div>
            </div>
          </div>
          <div className='postBody p-1'>
            <div className='title leading-tight py-2 font-medium text-lg'>{post[0].title}</div>
            <div className='text-dark'>{post[0].caption}</div>
          </div>
          <div className='flex justify-start items-center text-dark text-xl'>
            <div className='p-3 rounded-xl flex justify-center items-center gap-2 text-xl hover:bg-diffused cursor-pointer'>
              <BiLike />
              <div className='text-base'>Like</div>
            </div>
            <div className='p-3 rounded-xl flex justify-center items-center gap-2 text-xl hover:bg-diffused cursor-pointer'>
              <BiDislike />
              <div className='text-base'>Dislike</div>
            </div>
            <div
              className='p-3 rounded-xl flex justify-center items-center gap-2 text-xl hover:bg-diffused cursor-pointer'
              onClick={() => navigate(`/posts/${id}`)}
            >
              <BiComment />
              <div className='text-base'>Comment</div>
            </div>
            <div className='p-3 rounded-xl flex justify-center items-center gap-2 text-xl hover:bg-diffused cursor-pointer'>
              <BiSave />
              <div className='text-base'>Save</div>
            </div>
            <PostDropdown username={post[0].username} postId={post[0]._id} groupId={post[0].groupId} />
          </div>
        </div>
      )}
      <h3>Comments</h3>
      <form className='flex' onSubmit={submitHandler}>
        <input
          className='border-secondary border-2 p-2 px-3 rounded-lg focus:border-dark'
          value={message}
          type='text'
          id='comment'
          placeholder='Comment'
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className=' ml-2   p-3 bg-primary text-white  rounded-lg' type='submit'>
          Post
        </button>
      </form>
      <section>
        {rootComments != null && rootComments.length > 0 && (
          <div>
            <CommentList comments={rootComments} />
          </div>
        )}
      </section>
    </div>
  );
}
