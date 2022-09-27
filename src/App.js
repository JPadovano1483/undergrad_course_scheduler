import logo from './MessiahLogo.JPG';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p
          className="App-title"
          target="_blank"
          rel="noopener noreferrer"
        >
          Please enter your username and password.
        </p>
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
        </div>
      </body>
    </div>
  );
}

export default App;