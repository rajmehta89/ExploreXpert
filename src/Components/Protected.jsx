import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Protected(props){
    const {Component}=props
    const navigate=useNavigate();
    useEffect(() => {
        const username = localStorage.getItem('token');
        if(!username){
            navigate('/login');
        }
      });
  return (
    <div>
        <Component/>
    </div>
  )
}

export default Protected
