import './Login.css' 

function Login(props) {
  const { setIsLogin, setLoginEmail, setLoginPassword, 
    login, errMsg, setErrMsg } = props;
  return (
      <div className="login-component">
        <div className="header-gogetit">go get it</div>
        <div className="err-msg">{errMsg}</div>
        <div className="input-container">
          <input
            type="text"
            className="email-input"
            placeholder='Email Address'
            onChange={e => {
              setErrMsg('');
              setLoginEmail(e.target.value);
            }}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            className="password-input"
            placeholder='Password'
            onChange={e => {
              setErrMsg('');
              setLoginPassword(e.target.value);
            }}
          />
        </div>
        <div className="input-container">
          <button className="login-btn" onClick={login}>Log in</button>
        </div>
        <div className="forgot-password">
          <a href="mailto:muawatt@gmail.com">Forgotten password?</a>
        </div>
        <div>
          <span>Don't have an account? </span>
          <button className="back-to-signin" onClick={() => setIsLogin(prev => !prev)}>Sign up</button>
        </div>
      </div>
  )
}

export default Login;