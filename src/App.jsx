import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="game-container">
        <h1 className="game-title">HAIBAZO - Clear the Points</h1>
        <HeaderPanel />
        <GameBoard />
      </div>
    </div>
  );
}

export default App;
