import './Input.css'

function Input(props) {
  const { imageHandler, myTimeHandler, onInputChange, 
    inputData, showDayHandler, showMonthHandler,
    isDayShow, isMonthShow } = props;

  return (
    <div className="input-component">
      <section>
        <input type="file" accept="image/*" id="input" onChange={imageHandler} />
        <div className='my-wish-list-input'>
          <input type='text' placeholder="Mmy wish list" name='title' value={inputData.title} onChange={onInputChange} />
        </div>
        <div>
          <input type='text' placeholder="How much?" name='price' value={inputData.price} onChange={onInputChange} />
        </div>
      </section>
      <section className='date-container'>
        <div>when should I get it</div>
        <input type="date" min={new Date().toISOString().split("T")[0]} name='date' onChange={myTimeHandler}/>   
      </section>
      <div className='show-btn-container'>
        <div>
          <button className='show-day-btn' onClick={showDayHandler}>{ isDayShow ? 'Hide day' : "Collect money a day"}</button>
        </div>
        <div>
          <button className='show-month-btn' onClick={showMonthHandler}>{ isMonthShow ? 'Hide month' : "Collect money per month"}</button>
        </div>
      </div>
    </div>
  );
}

export default Input;