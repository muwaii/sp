import { useState, useEffect } from 'react';
import './App.css';
import Content from './components/Content.js';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebaseconfig'
import Login from './components/Login';
import Header from './components/Header';
import Input from './components/Input';
import Footer from './components/Footer';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [user, setUser] = useState({});
  const [image, setImage] = useState('');
  // const [priceData, setPriceData] = useState('');
  const [inputData, setInputData] = useState({
    title: '',
    price: '',
  });
  const [dayLeft, setDayLeft] = useState('');
  const [collectMoney, setCollectMoney] = useState({
    perDay: '',
    perMonth: ''
  });
  const [isDayShow, setIsDayShow] = useState(false);
  const [isMonthShow, setIsMonthShow] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  // what to do when the user changed their login
  // or another account if they sing out
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });
  }, []);

  async function register() {
    try {
      const user = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
    } catch(err) {
      setErrMsg(err.message);
    }
  }

  async function login() {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch(err) {
      setErrMsg(err.message);
    }
  }

  async function logout() {
    await signOut(auth);
  }

  function imageHandler(e) {
    const reader = new FileReader();
    reader.onload = () => {
      if(reader.readyState === 2) {
        setImage(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  const sec = 1;
  const min = sec * 60;
  const hour = min * 60;
  const day = hour * 24;
  
  function onInputChange(e) {
    setInputData((prev) => {
      return (
        {
          ...prev,
          [e.target.name]: e.target.value
        }
      )
    });
  }

  function myTimeHandler(e) {
    const x = e.target.value
    const y = new Date(x);   
    const a = new Date();
    const myDaySec = ((y.getTime()-a.getTime())/1000) / day;
    const myDays = Math.ceil(myDaySec);
    setDayLeft(myDays);
  }

  function showDayHandler() {
    setIsDayShow(prev => !prev);
    if(dayLeft==='') {
      alert('Please select date');
    } else {
      const priceNumber = Number(inputData.price); // set price to number for checking 
      if(isNaN(priceNumber)) {
        alert('Price should be a number') 
        setInputData({...inputData, price: ''});
      } else {
        const pricePerDay = priceNumber / dayLeft;
        setCollectMoney({ ...collectMoney, perDay: pricePerDay });
      }
    }
  }

  function showMonthHandler() {
    setIsMonthShow(prev => !prev);
    if(dayLeft==='') {
      alert('Please select date');
    } else {
      const priceNumber = Number(inputData.price); // set price to number for checking 
      if(isNaN(priceNumber)) {
        alert('Price should be a number') 
        setInputData({...inputData, price: ''});
      } else {
        const pricePerMonth = priceNumber / (dayLeft/30);
        setCollectMoney({ ...collectMoney, perMonth: pricePerMonth });
      }
    }
  }


  if(!user) {
    if(isLogin) {
      return (
        <div className="sign-in-page">

          <div>
            <div className='header-signin'>Let's make a wish</div>
            <div className='err-msg'>{errMsg}</div>
            <div className='input-container'>
              <input 
                className="password-input"
                type="text"
                placeholder='Email Address' 
                onChange={e => {
                  setErrMsg('');
                  setRegEmail(e.target.value);
                }}
              />
            </div>

            <div className='input-container'>
              <input 
                className="password-input"
                type="password"
                placeholder='Password' 
                onChange={e => {
                  setErrMsg('');
                  setRegPassword(e.target.value)
                }}
              />
            </div>

            <div className="input-container">
              <button className='create-btn' onClick={register}>Create User</button>
            </div>

            <div>
              <span>You have an account?</span>
              <button className='go-to-login' onClick={() => setIsLogin(prev => !prev)}>Login</button>
            </div>

          </div>

        </div>
      );
    } else {
      return (
        <Login
          setIsLogin={setIsLogin}
          setLoginEmail={setLoginEmail}
          setLoginPassword={setLoginPassword}
          login={login}
          errMsg={errMsg} 
          setErrMsg={setErrMsg}
        />
      )
    }
  } else {
    return (
      <div>
        <Header logout={logout} />
        <section className='main-content'>
          <Input 
            image={image}
            setImage={setImage}
            imageHandler={imageHandler}
            myTimeHandler={myTimeHandler}
            onInputChange={onInputChange}
            inputData={inputData}
            showDayHandler={showDayHandler}
            showMonthHandler={showMonthHandler}
            isDayShow={isDayShow}
            isMonthShow={isMonthShow}
          />
          <Content 
            image={image} 
            inputData={inputData}
            collectMoney={collectMoney}
            isDayShow={isDayShow}
            isMonthShow={isMonthShow}
          />
        </section>
        <Footer />
      </div>
    )
  }
}

export default App;
