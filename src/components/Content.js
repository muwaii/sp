import './Content.css';

function Content(props) {
  const { image, inputData, collectMoney, isDayShow, isMonthShow } = props;

  return (
    <div className='content-component'>
      <div className="header-content">{inputData.title}</div>
      <div className="img-container">
        <img src={image} id="img"/>
      </div>
      { isDayShow ? <div className="day-price">{`${collectMoney.perDay}  a day`}</div> : '' }
      { isMonthShow ? <div className="month-price">{`${collectMoney.perMonth}  per month`}</div> : '' }
    </div>
  )
}

export default Content;