import React, { FC ,useEffect,useState} from 'react'
//import {useParams} from 'react-router-dom'
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';

const Edit:FC=()=>{
    //const {id=''}=useParams();
    const {loading,data}=useLoadQuestionData();

    return (
        <div>
            <p>Edit Page</p>
            {loading?<p>loading...</p>:<div>{JSON.stringify(data)}</div>}
        </div>
    )
}

export default Edit;
