import './Input.css'

function Input(props) {
  const { imageHandler, myTime, onInputChange } = props;


  

  return (
    <div className="input-component">
      <input type="file" accept="image/*" id="input" onChange={imageHandler} />
      <div>
        <label htmlFor="input"></label>
      </div>
      <div>
        <input type='text' placeholder="what's next" name='title' onChange={onInputChange} />
      </div>
      <div>
        <input type='text' placeholder="how much?" name='price' onChange={onInputChange} />
      </div>
      <div>
        <div>when should I git it</div>
        <input type="date" min="2022-06-30" max="2122-09-01" name='date' onChange={myTime}/>   
      </div>
      <div>
        <button>Show collect money a day</button>
      </div>
      <div>
        <button>Show collect money per month</button>
      </div>
    </div>
  );
}

export default Input;