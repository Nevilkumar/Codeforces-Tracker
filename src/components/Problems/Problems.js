import React, { useEffect, useState } from 'react'

import { CircularProgress } from '@mui/material';
import './Problems.css';
import SingleProblem from './SingleProblem/SingleProblem';

const Problems = ({ submissions, friendUser, setFriendUser, mp }) => {

    const [fUser, setfUser] = useState(localStorage.getItem('friendUser'));
    const [solvedmp, setSolvedmp] = useState(new Map([]));
    const [solved, setSolved] = useState(0);

    const handleSolved = () => {
        setSolved(0);
        setSolvedmp(new Map([]));

        for(let i=0;i<submissions.length;i++)
        {
            if(submissions[i].verdict ==="OK")
            {
                if(!solvedmp.has(`${submissions[i].contestId}-${submissions[i].problem.index}`))
                {
                    setSolvedmp((p) => p.set(`${submissions[i].contestId}-${submissions[i].problem.index}`, 1)) 
                    setSolved((p) => p+1);
                }
                else
                {
                    
                }
            }
                
        }
    }

    useEffect(() => {
        setfUser(localStorage.getItem('friendUser'));  
    }, [friendUser])
    
    useEffect(() => {
        handleSolved();
    }, [submissions, friendUser])

    return (
    <>
        {
            fUser && fUser!=='' &&  
            <h1 className='solved-title'>
                No. Of Problems Solved Today By <a href={`https://codeforces.com/profile/${fUser}`} target='_blank' rel='noreferrer'>{fUser}</a> : {solved}
            </h1>
        }
        <div className='problems-main-container'>
        {
            submissions?.map((p, id) => (
                <SingleProblem key={id} problem={p} mp={mp} />
            ))
        }
        </div>
        {/* {
            submissions.length>0 ?
            <div className='problems-main-container'>
            {
                submissions?.map((p, id) => (
                    <SingleProblem key={id} problem={p} mp={mp} />
                ))
            }
            </div>
            :
            fUser && 
            <div className='loading'>
                <CircularProgress size={60}/>
            </div>
        } */}
    </>
    )
}

export default Problems