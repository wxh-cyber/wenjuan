import React, { FC } from 'react'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';

const Stat:FC=()=>{
    const {loading,questionData}=useLoadQuestionData();
    return (
        <div>
            <p>Stat Page</p>
            {loading?<p>loading...</p>:<div>{JSON.stringify(questionData)}</div>}
        </div>
    )
}

export default Stat;
