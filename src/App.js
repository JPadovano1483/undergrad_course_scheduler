import logo from './MessiahLogo.JPG';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-title"
          target="_blank"
          rel="noopener noreferrer"
        >
          Please enter your username and password.
        </a>
      </header>
      <body>
        <div class="App-Email">
          <h1>Login</h1>
          <form>
            <div class="form-control">
              <label>
                <input type="text" required />Email
              </label>
            </div>
            <div class="form-control">
              <label id='pwd'>
                <input type="password" required />Password
              </label>
            </div>
            <Link to="/home">
              <button type="submit" class="Login"> Login </button>
            </Link>
          </form>
          <h4>
            Forgot Username or Password? Click below to reset
          </h4>
          <a href="https://www.messiah.edu/">Reset</a>
        </div>
      </body>
    </div>
  );
}

export default App;
