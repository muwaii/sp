import { LayoutRouteProps } from "react-router-dom";

function Login(props) {
  const { setIsLogin, setLoginEmail, setLoginPassword, login } = props;
  return (
      <div>
        <div>
          <h4>Login</h4>
          <input
            placeholder='Email...'
            onChange={e => {
              setLoginEmail(e.target.value);
            }}
          />
          <input
            placeholder='Password...'
            onChange={e => {
              setLoginPassword(e.target.value);
            }}
          />
          <button onClick={login}>Login</button>
        </div>
        <button onClick={() => setIsLogin(prev => !prev)}>Sign in</button>
      </div>
  )
}

export default Login;