// Quicksort.js
import React, { useState, useEffect } from "react";
import "./Quicksort.css";

const Quicksort = () => {
  const [arr, setArr] = useState([]);
  const [arrayLength, setArrayLength] = useState("");
  const [inputArr, setInputArr] = useState("");
  const [isSorting, setIsSorting] = useState(false);
  const [steps, setSteps] = useState([]);
  const [pivotPosition, setPivotPosition] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [comparingNumbers, setComparingNumbers] = useState([]);

  const handleSetPivot = (value) => {
    setPivotPosition(arr.indexOf(value));
  };

  const handleArrayLengthChange = (e) => {
    setArrayLength(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputArr(e.target.value);
  };

  
  const handleGenerateRandomArray = () => {
    const length = parseInt(arrayLength, 10);
    if (!isNaN(length) && length > 0) {
      setIsSorting(false); // Stop the sorting process if it's ongoing
      setPivotPosition(null);
      setComparingNumbers([]);
      setArr(generateRandomArray(length));
    } else {
      alert("Please enter a valid array length.");
    }
  };
  const handleSortArray = async () => {
    setIsSorting(true);
    const arrToSort = [...arr];
    const sortingSteps = [];

    // Select the initial pivot
    await quicksort(arrToSort, 0, arrToSort.length - 1, sortingSteps);

    setIsSorting(false);
    setCorrectAnswer(""); // Reset correct answer after sorting is complete
    alert("Sorting is complete!");
  };

  const generateRandomArray = (length) => {
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(Math.floor(Math.random() * 100));
    }
    return arr;
  };

  const quicksort = async (arr, start, end, steps) => {
    if (start >= end) {
      return;
    }

    const pivotIndex = await partition(arr, start, end, steps);

    // Pause after every three steps
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setCurrentStep(currentStep + 1);

    await quicksort(arr, start, pivotIndex - 1, steps);
    await quicksort(arr, pivotIndex + 1, end, steps);
  };

  const partition = async (arr, start, end, steps) => {
    const pivot = arr[end];
    let i = start - 1;

    for (let j = start; j < end; j++) {
      if (arr[j] < pivot) {
        i++;
        await swap(arr, i, j, steps);
      }
      setComparingNumbers([arr[j], arr[pivotPosition]]);
    }

    await swap(arr, i + 1, end, steps);
    setPivotPosition(i + 1);
    setComparingNumbers([]);

    return i + 1;
  };

  const swap = async (arr, i, j, steps) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
  
        // Highlight the numbers being compared in yellow
        const comparingIndexes = [i, j];
        steps.push([
          arr.map((_, index) => ({
            value: arr[index],
            isComparing: comparingIndexes.includes(index),
            isFinalPosition: index === j,
          })),
          pivotPosition,
        ]);
  
        setArr([...arr]);
        setSteps([...steps]);
  
        resolve();
      }, 1000);
    });
  };
  
  

  return (
    <div className="quicksort-container">
      <div className="options">
        <input
          type="text"
          placeholder="Enter array (e.g., 1, 2, 3)"
          value={inputArr}
          onChange={handleInputChange}
        />
         <input
          type="text"
          placeholder="Enter array length"
          value={arrayLength}
          onChange={handleArrayLengthChange}
        />
        <button onClick={() => setArr(inputArr.split(",").map(Number))}>
          Use Input Array
        </button>
        <button onClick={handleGenerateRandomArray}>
          Generate Random Array
        </button>
        <button onClick={handleSortArray} disabled={isSorting}>
          Sort Array
        </button>
      </div>
      <div className="array-container">
        {arr.length > 0 && pivotPosition === null && (
          <p className="select-pivot-message">
            Please select a pivot or click "Sort Array" to randomly pick a
            pivot.
          </p>
        )}
        <div className="step">
          {arr.map((num, index) => (
            <div
              key={index}
              className={`circle ${
                index === pivotPosition ? "selected-pivot" : ""
              } ${comparingNumbers.includes(num) ? "green" : ""}`}
              onClick={() => handleSetPivot(num)}
            >
              {num}
            </div>
          ))}
        </div>
        <div className="pivot-label">
          {pivotPosition !== null && (
            <div>
              <span className="label-text">Pivot:</span>
              <span className="pivot-number">{arr[pivotPosition]}</span>
            </div>
          )}
        </div>
        {comparingNumbers.length > 0 && (
          <div className="comparing-label">
            <span className="label-text">Comparing:</span>
            {comparingNumbers.map((num, index) => (
              <span key={index} className="comparing-number">
                {num}
              </span>
            ))}
          </div>
        )}
      </div>
      {correctAnswer && (
        <div>
          <p>Correct Answer: {correctAnswer}</p>
        </div>
      )}
    </div>
  );
};

export default Quicksort;