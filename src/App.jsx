import logo from './logo.svg';
import './styles/App.css';
import HeaderPanel from './components/HeaderPanel';
import GameBoard from './components/GameBoard';

function App() {
  return (
    <div className="App">
      <div className="game-container">
        <h1 className="game-title">GAME - Clear the Points</h1>
        <HeaderPanel />
        <GameBoard />
      </div>
    </div>
  );
}

export default App;
