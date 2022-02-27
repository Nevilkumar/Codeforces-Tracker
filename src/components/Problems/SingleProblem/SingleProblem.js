import React from 'react'

import './SingleProblem.css'
import { FaCheck } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';
import { FiCheckSquare } from 'react-icons/fi';

const SingleProblem = ({ problem, mp }) => {

    let problemLink = `https://codeforces.com/contest/${problem.contestId}/problem/${problem.problem.index}`
    let submissionLink = `https://codeforces.com/contest/${problem.contestId}/submission/${problem.id}`
    
    return (
    <div className='single-problem-container'>
        <div className='problem-links'>
            <div className='problem-checkDone-div'>
                <a href={problemLink} target='_blank' className='problem-title' rel='noreferrer'>
                    {problem.problem.index} - {problem.problem.name}
                </a> 
                {
                    mp.has(`${problem.contestId}-${problem.problem.index}`) && <FiCheckSquare className='done-icon' />
                }
            </div>
            <a href={submissionLink} target='_blank' className='problem-title' rel='noreferrer'>
                Code
            </a> 
        </div>
        <div className='problem-links'>
            <h1 className='difficulty'>Difficulty: {problem.problem.rating ? problem.problem.rating : "N/A"}</h1>
            {
                problem.verdict === "OK" ? 
                (
                    <div className='status-div'>
                        <FaCheck className='status-icon-correct'/>
                        <h1 className='problem-status'>Accepted</h1>
                    </div>
                )
                :
                (
                    <div className='status-div'>
                        <MdOutlineClose className='status-icon-wrong'/>
                        <h1 className='wrong-problem-status'>{problem.verdict}</h1>
                    </div>
                )
            }
        </div>
        <div className='problem-tags'>
            {
                problem.problem.tags.map((t, id) => (
                    <div key={id} className='single-tag'>{t}</div>
                ))
            }
        </div>
    </div>
    )
}

export default SingleProblem