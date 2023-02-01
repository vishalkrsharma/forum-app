import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { Avatar } from '../components/index';
import useAuthContext from '../hooks/useAuthContext';

export default function Group() {
  const userData = useOutletContext()
  const {id} = useParams()
  const {user} = useAuthContext()
  const {accessToken} = user
  const [groupData , setGroupdata] = useState()

  useEffect(()=>{
    async function getGroup(){
      const body = {
        groupId : id
      }
      try {
        const { data : data   } = await axios.post('/api/group/getGroup', body, {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${accessToken}`,
          },
        });
        setGroupdata(data.data);
      } catch (err) {
        console.log(err);
      }
    }
    getGroup()
  },[])


  return (
    <div>
     {!groupData ? null : (
        <div className='userInfo text-center '>
          <div className=' bg-primary h-40 overflow-hidden -mb-11 rounded-lg max-w-xl m-auto'>
            <Avatar className='mx-auto ' name={groupData.name} variant='ring' size={600} square={true} />
          </div>
          <div className='profileImg mx-auto inline-block rounded-full border-4 border-white'>
            <Avatar className='mx-auto' name={groupData.name} variant='bauhaus' size={80} square={false} />
          </div>
          <div className='userName font-medium mt-2'>{groupData.name}</div>
        </div>
      )}
    </div>
  );
}
