import React from 'react'

import './Friends.css'
import {AiOutlineClose} from 'react-icons/ai'


const Friends = ({ friendUser, setFriendUser, fetchData, arr, setArr }) => {
  
  const handleChangeUser = (p) => {

    for(let i=0;i<arr.length;i++)
    {
      if(arr[i]===p)
      {
        let t=arr[i];
        arr[i]=arr[0];
        arr[0]=t;
        break;
      }
    }
    localStorage.setItem('names', JSON.stringify(arr)); 
    localStorage.setItem('friendUser', p);
    setFriendUser(p);
    fetchData();
  }

  const handleDeleteFriend = (name) => {

    const tmpArr = [];
    for(let i=0;i<arr.length;i++)
    {
      if(arr[i] !== name)
        tmpArr.push(arr[i]);
    }
    setArr(tmpArr)
    localStorage.setItem('names', JSON.stringify(tmpArr)); 

    arr=tmpArr;
    if(friendUser === name)
    {
      if(arr.length >= 1)
      {
        setFriendUser(tmpArr[0]);
        localStorage.setItem('friendUser', tmpArr[0]);
      }
      else
      {
        setFriendUser("");
        localStorage.setItem('friendUser', '');
      }
      fetchData();
    }
  }


  return (
    <>
      <h1 className='friends-title'>Your Friends</h1>
      <div className='users-div'>
        {
          arr && arr?.map((p, id) => (
            p === localStorage.getItem('friendUser') ?
              <div className='user-names current-user-color' key={id}>
                <p onClick={() => handleChangeUser(p)}>{p}</p>
                <AiOutlineClose className='user-names-cross-icon' onClick={() => handleDeleteFriend(p)} />
              </div>
            :
            <div className='user-names' key={id}>
              <p onClick={() => handleChangeUser(p)}>{p}</p>
              <AiOutlineClose className='user-names-cross-icon' onClick={() => handleDeleteFriend(p)}/>
            </div>
          ))
        }
      </div>
    </>

  )
}

export default Friends