import './Input.css'

function Input(props) {
  const { imageHandler, myTimeHandler, onInputChange, 
    inputData, showDayHandler, showMonthHandler,
    isDayShow, isMonthShow } = props;

  return (
    <div className="input-component">
      <input type="file" accept="image/*" id="input" onChange={imageHandler} />
      <div>
        <label htmlFor="input"></label>
      </div>
      <div>
        <input type='text' placeholder="what's next" name='title' value={inputData.title} onChange={onInputChange} />
      </div>
      <div>
        <input type='text' placeholder="how much?" name='price' value={inputData.price} onChange={onInputChange} />
      </div>
      <div>
        <div>when should I git it</div>
        <input type="date" min={new Date().toISOString().split("T")[0]} name='date' onChange={myTimeHandler}/>   
      </div>
      <div>
        <button onClick={showDayHandler}>{ isDayShow ? 'Hide day' : "Show collect money a day"}</button>
      </div>
      <div>
        <button onClick={showMonthHandler}>{ isMonthShow ? 'Hide month' : "Show collect money per month"}</button>
      </div>
    </div>
  );
}

export default Input;