import React, { FC ,useEffect,useState} from 'react'
//import {useParams} from 'react-router-dom'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';

const Edit:FC=()=>{
    //const {id=''}=useParams();
    const {loading,questionData}=useLoadQuestionData();

    return (
        <div>
            <p>Edit Page</p>
            {loading?<p>loading...</p>:<div>{JSON.stringify(questionData)}</div>}
        </div>
    )
}

export default Edit;
