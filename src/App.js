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
      console.log(err.message);
    }
  }

  async function login() {
    try {
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    } catch(err) {
      console.log(err.message);
    }
  }

  async function logout() {
    await signOut(auth);
  }

  //--------------------------------------------------------


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
    // console.log('today :', a.getTime(), a);
    // console.log('that day :', y.getTime(), y);
    // console.log('diff day :', y.getTime()-a.getTime(), 'ms');
    // console.log('diff day :', (y.getTime()-a.getTime())/1000, 'sec');
    const myDaySec = ((y.getTime()-a.getTime())/1000) / day;
    // console.log('diis day :', myDaySec, 'days (in sec)');
    const myDays = Math.ceil(myDaySec);
    console.log('diff day :', myDays, 'days');
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
        console.log('ไปต่อค่าา')
        // เอา ราคา หาก จำนวนวันน
        const pricePerDay = priceNumber / dayLeft;
        console.log(pricePerDay)
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
        console.log('ไปต่อค่าา')
        // เอา ราคา หาก จำนวนวันน
        const pricePerMonth = priceNumber / (dayLeft/30);
        console.log(pricePerMonth)
        setCollectMoney({ ...collectMoney, perMonth: pricePerMonth });
      }
    }
  }


  if(!user) {
    if(isLogin) {
      return (
        <div className="App">
          <div>
            <h4>and jump right into it</h4>
            <input 
              placeholder='Email...' 
              onChange={e => setRegEmail(e.target.value)}
            />
            <input 
              placeholder='Password...' 
              onChange={e => setRegPassword(e.target.value)}
            />
            <button onClick={register}>Create User</button>
          </div>
          <button onClick={() => setIsLogin(prev => !prev)}>Login</button>
        </div>
      );
    } else {
      return (
        <Login
          setIsLogin={setIsLogin}
          setLoginEmail={setLoginEmail}
          setLoginPassword={setLoginPassword}
          login={login}
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
