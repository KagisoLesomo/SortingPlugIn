import React, { useState, useEffect } from "react";
import "./styles.css";

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const QuicksortVisualizer = () => {
  const [array, setArray] = useState([7, 2, 1, 6, 8, 5, 3, 4]);

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
      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await sleep(500);
      }
    }
    i++;
    [arr[i], arr[right]] = [arr[right], arr[i]];
    setArray([...arr]);
    await sleep(500);
    return i;
  };

  useEffect(() => {
    const sortArray = async () => {
      await quickSort(array, 0, array.length - 1);
    };
    sortArray();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      {array.map((value, idx) => (
        <div
          key={idx}
          className={`circle ${idx === array.length - 1 ? "highlight" : ""}`}
        >
          {value}
        </div>
      ))}
    </div>
  );
};

export default QuicksortVisualizer;
