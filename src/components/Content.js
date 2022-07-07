import React, { useState } from "react";
import './Content.css';

function Content(props) {

  const { image, inputData, collectMoney, isDayShow, isMonthShow } = props;


  return (
    <div className='content-component'>
      <h1>{inputData.title}</h1>
      <div>
        <img src={image} id="img"/>
      </div>
      { isDayShow ? <div>{collectMoney.perDay}</div> : '' }
      { isMonthShow ? <div>{collectMoney.perMonth}</div> : '' }
      



    </div>
  )
}

export default Content;