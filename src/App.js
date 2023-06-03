import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Game from './components/Game';
import HiScores from './components/HiScores';

function Main() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/game');
  }, []);

  return (
    <div id='app'>
      <div id="topbar">
        <div id="playTrigger" className='linkTrigger'>
          <Link to='/game'>Play</Link>
        </div>
        <div id="hiScoreTrigger" className='linkTrigger'>
          <Link to='/hiscores'>High Scores</Link>
        </div>

      </div>
      <Routes>
        <Route path='/game' element={<Game />} />
        <Route path='/hiscores' element={<HiScores />} />
      </Routes>
      <div id="footer">
        <p>By Bennett Hilberg</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;
