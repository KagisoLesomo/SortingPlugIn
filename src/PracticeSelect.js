import React, { useState } from "react";

const QuickSort = () => {
  const [inputArray, setInputArray] = useState("");
  const [sortedArray, setSortedArray] = useState([]);
  const [pivot, setPivot] = useState(null);
  const [selectedPivot, setSelectedPivot] = useState(null);
  const [isPivotCorrect, setIsPivotCorrect] = useState(null);

  const generateRandomArray = (length, max) => {
    let randomArray = [];
    for (let i = 0; i < length; i++) {
      randomArray.push(Math.floor(Math.random() * max) + 1);
    }
    setInputArray(randomArray.join(","));
  };

  const handleInputChange = (e) => {
    setInputArray(e.target.value);
  };

  const sortArray = () => {
    const arr = inputArray.split(",").map((item) => parseInt(item));
    if (selectedPivot === pivot) {
      setIsPivotCorrect(true);
      quickSort(arr, 0, arr.length - 1);
      setSortedArray(arr);
    } else {
      setIsPivotCorrect(false);
    }
  };

  const quickSort = (arr, left, right) => {
    if (left < right) {
      let pivotIndex = getPivotIndex(arr, left, right);
      let partitionIndex = partition(arr, left, right, pivotIndex);

      quickSort(arr, left, partitionIndex - 1);
      quickSort(arr, partitionIndex + 1, right);
    }
  };

  const getPivotIndex = (arr, left, right) => {
    const a = arr[left];
    const b = arr[right];
    const mid = Math.floor((left + right) / 2);
    const c = arr[mid];

    const median = [a, b, c].sort((x, y) => x - y)[1];
    setPivot(median);

    return mid;
  };

  const partition = (arr, left, right, pivotIndex) => {
    const pivotValue = arr[pivotIndex];
    swap(arr, pivotIndex, right);

    let storeIndex = left;

    for (let i = left; i < right; i++) {
      if (arr[i] < pivotValue) {
        swap(arr, i, storeIndex);
        storeIndex++;
      }
    }

    swap(arr, storeIndex, right);
    return storeIndex;
  };

  const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  const handlePivotSelection = (e) => {
    setSelectedPivot(parseInt(e.target.value));
  };

  return (
    <div>
      <h2>QuickSort with Median of Three Pivot</h2>
      <div>
        <button onClick={() => generateRandomArray(10, 100)}>
          Generate Random Array
        </button>
        <input
          type="text"
          value={inputArray}
          onChange={handleInputChange}
          placeholder="Enter comma-separated numbers"
        />
        <button onClick={sortArray}>Sort</button>
      </div>
      <div>
        <h3>Select the Pivot</h3>
        {pivot &&
          [pivot, inputArray.split(",").map((item) => parseInt(item)).pop()].map(
            (item, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="pivot"
                  value={item}
                  onChange={handlePivotSelection}
                />
                {item}
              </label>
            )
          )}
      </div>
      {selectedPivot !== null &&
        (isPivotCorrect ? (
          <p>Correct! You chose the correct pivot.</p>
        ) : (
          <p>
            Incorrect! The correct pivot is {pivot}. Please choose again.
          </p>
        ))}
      <div>
        <h3>Sorted Array</h3>
        <p>{sortedArray.join(", ")}</p>
      </div>
    </div>
  );
};

export default QuickSort;
