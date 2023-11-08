import React, { useState, useEffect } from "react";
import "./styles.css";

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const QuicksortVisualizer = () => {
  const generateRandomArray = (length) => {
    const array = [];
    for (let i = 0; i < length; i++) {
      array.push(Math.floor(Math.random() * 100) + 1);
    }
    return array;
  };

  const [array, setArray] = useState(generateRandomArray(8));
  const [inputArray, setInputArray] = useState("");
  const [highlightedIndices, setHighlightedIndices] = useState([]);

  const handleChange = (event) => {
    setInputArray(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputArray) {
      const newArray = inputArray.split(",").map((item) => parseInt(item.trim()));
      setArray(newArray);
      sortArray(newArray, 0, newArray.length - 1);
    } else {
      const newArray = generateRandomArray(8);
      setArray(newArray);
      sortArray(newArray, 0, newArray.length - 1);
    }
  };

  const quickSort = async (arr, left, right) => {
    if (left >= right) return;
    let index = await partition(arr, left, right);
    await Promise.all([
      quickSort(arr, left, index - 1),
      quickSort(arr, index + 1, right),
    ]);
  };

  const partition = async (arr, left, right) => {
    const pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
      setHighlightedIndices([j, right]);
      await sleep(500);
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        setHighlightedIndices([i, j]);
        await sleep(500);
      }
    }
    i++;
    [arr[i], arr[right]] = [arr[right], arr[i]];
    setArray([...arr]);
    await sleep(500);
    setHighlightedIndices([]);
    return i;
  };

  const sortArray = (newArray, left, right) => {
    quickSort(newArray, left, right);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Comma Separated Numbers:
          <input type="text" value={inputArray} onChange={handleChange} />
        </label>
        <button type="submit">Sort</button>
        <button type="submit" onClick={handleSubmit} className="random-button">
          Generate Random Array
        </button>
      </form>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        {array.map((value, idx) => (
          <div
            key={idx}
            className={`circle ${idx === array.length - 1 ? "highlight" : ""} ${
              highlightedIndices.includes(idx) ? "ring" : ""
            }`}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuicksortVisualizer;
