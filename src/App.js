import React, { useEffect, useState } from 'react'

import './App.css'
import Friends from './components/Friends/Friends'
import Inputs from './components/Inputs/Inputs'
import Problems from './components/Problems/Problems'


const App = () => {

  const [data, setData] = useState([]);
  const [mainUserData, setMainUserData] = useState(new Map([]));

  const [mainUser, setMainUser] = useState('');
  const [friendUser, setFriendUser] = useState();
  const [arr, setArr] = useState(JSON.parse(localStorage.getItem('names')) || []);

  const mapMainUserData = (d) => {
    setMainUserData(new Map([]));

    for(let i=0;i<d.length;i++)
    {
      if(d[i].verdict === "OK")
        setMainUserData((p) => p.set(`${d[i].contestId}-${d[i].problem.index}`, 1))  
    }
  }

  const checkTime = (submitTime) => {
    // let currentDate = new Date();
    // let currentTime = currentDate.getTime()/1000;
    // let diff = currentTime - submitTime;

    let tday = new Date();
    tday.setHours(0,0,0,0);
    tday=tday.getTime()/1000;

    if(submitTime < tday)
      return false;
    return true;
  }

  const fetchData = async () => {
    setData([]);

    const res = await fetch(`https://codeforces.com/api/user.status?handle=${localStorage.getItem('friendUser')}&from=1&count=150`)
    let tmp = await res.json();
    tmp=tmp.result;

    const res1 = await fetch(`https://codeforces.com/api/user.status?handle=${localStorage.getItem('mainUser')}`)
    let tmp1 = await res1.json();
    tmp1 = tmp1.result;

    let todaysData=[];
    for(let i=0;i<tmp.length;i++)
    {
      if(checkTime(tmp[i].creationTimeSeconds))
        todaysData.push(tmp[i]);
      else
        break;
    }
    mapMainUserData(tmp1);
    setData(todaysData);
  }
  
  useEffect(() => {
    fetchData();
  }, [])
  
  return (

    <div className='main-container'>

      <div className='left'>
        <div className='left-top'>
          <Inputs mainUser={mainUser} setMainUser={setMainUser} friendUser={friendUser} setFriendUser={setFriendUser} fetchData={fetchData} arr={arr} setArr={setArr} />
        </div>

        <div className='left-bottom'>
          <Friends friendUser={friendUser} setFriendUser={setFriendUser} fetchData={fetchData} arr={arr} setArr={setArr} />
        </div>
      </div>

      
      <div className='right'>
          <Problems submissions={data} friendUser={friendUser} setFriendUser={setFriendUser} mp={mainUserData}/>
      </div>

    </div>
    
  )
}

export default App