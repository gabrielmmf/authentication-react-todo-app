import { useState } from "react"
import { useCookies } from "react-cookie"

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isLogIn, setIsLogIn] = useState(true);

  console.log(cookies);

  const toggleIsLogin = () => {
    setIsLogIn(!isLogIn);
  }

  const viewLogin = (status) => {
    setError(null);
    setIsLogIn(status);
  }
  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      console.log("password not match")
      setError("Password and confirm password are not match");
      alert("Password And confirm password not match")
      return;
    }

    console.log("email: ", email, "password: ", password);

    const response = await fetch(`https://authentication-react-todo-app.herokuapp.com/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await response.json();

    if (data.detail) {
      alert(data.detail);
    }
    else {
      setCookie('Email', data.email)
      setCookie('AuthToken', data.token)

      window.location.reload()
    }
    console.log(data);
  }
  return (
    <div className="auth-container">
      <div className="auth-container-box">

        <form>
          <h2>
            {isLogIn ? 'Login' : 'Sign Up '}
          </h2>

          <input
            className="email-input"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)} />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} />
          {!isLogIn && <input
            type="password"
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)} />}
          <button className="auth-button" onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')} >{isLogIn ? 'Login' : 'Sign Up'}</button>

          <span className="small-text">{isLogIn ? 'First Time? ' : 'Already have an account? '} <span className="link-text" onClick={toggleIsLogin}>{isLogIn ? 'Create an account' : 'Login'} </span></span>

        </form>
      </div>
    </div>
  )
}

export default Auth