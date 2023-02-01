import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';

const CreateGroup = () => {
  const [groupname ,setGroupname] = useState('')
  const [about , setAbout] = useState('')
  const {user} = useAuthContext()
  const { accessToken } = user;
  const navigate = useNavigate()
  const handelSubmit = async (e) =>{
    e.preventDefault();
    const body = {
      name : groupname,
      about : about,
    }
    const { data } = await axios.post('/api/group/create', body,{
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      
    });
    console.log("res" , data)
    navigate(`/groups/${data.data._id}`)
  }

  return (
    <div>
      <form>
        <label>Group Name</label>
        <input type="text" placeholder='Enter Group Name' value={groupname} onChange={ (e)=>{setGroupname(e.target.value)}} />
        <label>About</label>
        <input type="text" placeholder='Write Something about the Group' value={about} onChange={ (e)=>{setAbout(e.target.value)} } />
        <button onClick={handelSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default CreateGroup