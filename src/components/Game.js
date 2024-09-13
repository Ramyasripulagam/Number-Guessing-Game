import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Game.css'; // Include this if you want custom styles
import Confetti from 'react-confetti';

const Game = () => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('Start Guessing');
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username') || 'Guest'); // Assuming you have user authentication

  // Function to generate a random number between 1 and 50
  function generateRandomNumber() {
    return Math.floor(Math.random() * 50) + 1;
  }

  // Fetch high score from the backend on load
  useEffect(() => {
    const fetchHighscore = async () => {
      try {
        const response = await axios.get(`/api/user/${username}/highscore`);
        setHighscore(response.data.highscore);
      } catch (error) {
        console.error('Error fetching high score:', error);
      }
    };
    fetchHighscore();
  }, [username]);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const handleGuess = async (e) => {
    e.preventDefault();
    const guessNumber = parseInt(guess, 10);

    if (guessNumber === randomNumber) {
      setMessage(`Correct Guess! The number was ${randomNumber}.`);
      setShowConfetti(true);
      setGameOver(true);

      // Update highscore if score is less than current highscore or if this is the first attempt
      if (highscore === null || score + 1 < highscore) {
        setHighscore(score + 1);
        try {
          // Save new highscore to the backend
          await axios.post(`/api/user/${username}/highscore`, { highscore: score + 1 });
        } catch (error) {
          console.error('Error updating high score:', error);
        }
      }
    } else if (guessNumber > randomNumber) {
      setMessage('Guess is Higher');
    } else {
      setMessage('Guess is Lower');
    }
    setScore(score + 1);
    setGuess('');
  };

  const playAgain = () => {
    setRandomNumber(generateRandomNumber());
    setMessage('Start Guessing');
    setScore(0);
    setGuess('');
    setGameOver(false);
  };

  const resetGame = () => {
    setRandomNumber(generateRandomNumber());
    setMessage('Start Guessing');
    setGuess('');
    setScore(0);
    setGameOver(false);
  };

  return (
    <div className='body'>
      <div className='welcome'>
        <h2> Let's Play Number Gussing Game</h2>
      </div>
      <div className='back'></div>
      
      {!gameOver && (  // Conditional rendering of the spng element
        <div className="spng"></div>
      )}
      
      <div className="game-container">
        {!gameOver ? (
          <form onSubmit={handleGuess}>
            <h1>Guess the Number</h1>
            <h3>{message}</h3>
            <p>Guess a number between 1 and 50!</p>
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Enter your guess"
              required
            />
            
            <button type="submit" className="game-button">Submit Guess</button>
            <p>Score: {score}</p>
          </form>
        ) : (

          <div className='correct'>
            <div className='img'></div>
            <div className='score'>
              
              <div className='cele'>{showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}</div>
              
              <p>{message}</p>
              <p>Highscore (Least Attempts): {highscore === null ? 'N/A' : highscore}</p>
              <div className='btn'>
                <button onClick={playAgain} className="game-button1">Play Again</button>
                <button onClick={resetGame} className="game-button2">Reset Game</button>

              </div>
              <div className='msg'>
              <p>Score: {score}</p></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  

};

export default Game;
