import React, { useState } from 'react'

import './Inputs.css';

const Inputs = ({ mainUser, setMainUser, friendUser, setFriendUser, fetchData, arr, setArr }) => {

  const mUser = localStorage.getItem('mainUser');
  const [tmpUser, setTmpUser] = useState("");

  const handleMainUser = () => {
    localStorage.setItem('mainUser', mainUser);
    setMainUser("");
    fetchData();
  }

  const handleFriendUser = () => {
    let f=0;
    for(let i=0;i<arr.length;i++)
    {
      if(tmpUser===arr[i])
      {
        f=1;
        let tt=arr[i];
        arr[i]=arr[0];
        arr[0]=tt;
        break;
      }
    }
    localStorage.setItem('friendUser', tmpUser);
    localStorage.setItem('names', JSON.stringify(arr));
    if(!f)
    {
      arr.unshift(tmpUser);
      localStorage.setItem('names', JSON.stringify(arr));
    }
    setFriendUser(tmpUser);
    setTmpUser("");
    fetchData();
  }

  return (
    <div className='input-main-container'>
        <h1 className='input-title'>Welcome <a href={`https://codeforces.com/profile/${mUser}`} target="_blank" rel='noreferrer' >{mUser}</a>
        </h1>
        <div className='user-input-div'>
            <input required value={mainUser} onChange={(e) => setMainUser(e.target.value)} type='text' placeholder="Enter Your Codeforces Handle" />
            <button className='input-btn' onClick={handleMainUser}>Add</button>
        </div>
        <div className='user-input-div'>
            <input required value={tmpUser} onChange={(e) => setTmpUser(e.target.value)} type='text' placeholder="Enter Your Friend's Handle" />
            <button className='input-btn' onClick={handleFriendUser}>Add</button>
        </div>
    </div>
  )
}

export default Inputs