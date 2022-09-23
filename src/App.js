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
<<<<<<< HEAD
        <div class="App-Email">
          <h1>Login</h1>
          <form>
            <div class="form-control">
=======
        <div className="App-Email">
          <h1>Login</h1>
          <form>
            <div className="form-control">
>>>>>>> ad9e308 (updated App.js)
              <label>
                <input type="text" required />Email
              </label>
            </div>
<<<<<<< HEAD
            <div class="form-control">
=======
            <div className="form-control">
>>>>>>> ad9e308 (updated App.js)
              <label id='pwd'>
                <input type="password" required />Password
              </label>
            </div>
            <Link to="/home">
<<<<<<< HEAD
              <button type="submit" class="Login"> Login </button>
=======
              <button type="submit" className="Login"> Login </button>
>>>>>>> ad9e308 (updated App.js)
            </Link>
          </form>
          <h4>
            Forgot Username or Password? Click below to reset
          </h4>
<<<<<<< HEAD

=======
>>>>>>> ad9e308 (updated App.js)
        </div>
      </body>
    </div>
  );
}

export default App;