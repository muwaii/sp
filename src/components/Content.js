import React, { useState } from "react";
import './Content.css';

function Content(props) {

  const { image, inputData } = props;


  return (
    <div className='content-component'>
      <h1>Add your Image this is content component</h1>
      <div>
        <img src={image} id="img"/>
      </div>
      



    </div>
  )
}

export default Content;