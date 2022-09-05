import logo from './MessiahLogo.JPG';
import './App.css';

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
    </div>
  );
}

export default App;
