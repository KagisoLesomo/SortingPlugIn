import React, { useState } from 'react';
//import './Bubble.css'; // Add your custom CSS

const generateRandomArray = (size) => {
    const randomArray = Array.from({ length: size }, () => Math.floor(Math.random() * 100));
    return randomArray;
  };
const BubbleSortPractice = () => {
	const [arraySize, setArraySize] = useState(8);
	const [array, setArray] = useState(generateRandomArray(arraySize));
  const [currentPass, setCurrentPass] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false); // Track correct pass
  const n = array.length;

  const handleGenerateRandomArray = () => {
    setArray(generateRandomArray(arraySize));
    setCurrentPass(0);
    setUserAnswer('');
    setIsCorrect(false);
  };


  const handleCheckAnswer = () => {
    const correctAnswer = bubbleSortPass([...array], currentPass);
    if (userAnswer === correctAnswer.join(',')) {
      if (currentPass < n - 1) {
        setIsCorrect(true); // Set correct pass
        setCurrentPass(currentPass + 1);
        setUserAnswer('');
        setTimeout(() => setIsCorrect(false), 2000); // Clear correct pass after 2 seconds
      } else {
        alert('Congratulations! You completed the Bubble Sort practice.');
      }
    } else {
      alert('Incorrect. Try again.');
    }
  };

  const bubbleSortPass = (arr, pass) => {
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap elements
        }
      }
      if (i === pass) {
        return arr; // Return the array state after the specified pass
      }
    }
    return arr;
  };



  const containerStyle = {
    textAlign: 'center',
    margin: '20px',
    padding: '20px',
    backgroundColor: '#9EE7A1',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    position: 'relative',
  };

  const balloonStyle = {
    position: 'absolute',
    top: isCorrect ? '400px' : '-200px', // Apply animation to the top property
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100px',
    height: '100px',
    background: '#00ff00',
    borderRadius: '50%',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    transition: 'top 2s', // Apply a smooth transition to the top property
  };

  return (
    <div style={containerStyle}>
      <h2>Practice Bubble Sort</h2>
      <button onClick={handleGenerateRandomArray}>Generate Random Array</button>
      <p>Sort the following array using the Bubble Sort algorithm.</p>
      <div>Array: {array.join(', ')}</div>
      <div>Pass {currentPass + 1}</div>
      <input
        type="text"
        placeholder="Enter the sequence for this pass"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        style={{ padding: '5px', fontSize: '16px', width: '100%' }}
      />
      <button onClick={handleCheckAnswer} style={{ padding: '8px 16px', fontSize: '16px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
        Check Answer
      </button>
      <div style={balloonStyle}>
        Passed
        <div className="balloon-tail"></div>
      </div>
    </div>
  );
};

export default BubbleSortPractice;
