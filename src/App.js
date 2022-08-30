import logo from './MessiahLogo.JPG';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Please enter your username and password.
        </p>
        <a
          className="App-title"
          target="_blank"
          rel="noopener noreferrer"
        >
          Messiah University
        </a>
      </header>
    </div>
  );
}

export default App;
