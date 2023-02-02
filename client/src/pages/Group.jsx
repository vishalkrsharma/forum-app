import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { Avatar } from '../components/index';
import useGroup from '../hooks/useGroup';

export default function Group() {
  const userData = useOutletContext();
  const { id } = useParams();

  const { getGroup } = useGroup();
  const [groupData, setGroupdata] = useState();

  async function getGroupHandler(body) {
    const { data } = await getGroup(body);
    setGroupdata(data);
  }

  useEffect(() => {
    const groupId = id;
    const body = {
      groupId,
    };

    getGroupHandler(body);
  }, []);

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
