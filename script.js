const canvas = document.getElementById("bubble-canvas");
const ctx = canvas.getContext("2d");
const result = document.getElementById("result");

let arrayToSort = generateRandomArray();
let currentStep = 0;
let isSorting = false;
let userInput = [];
let userInputPrompts = 0;

function generateRandomArray() {
  const size = Math.floor(Math.random() * 6) + 5; // Random size between 5 and 10
  return Array.from({ length: size }, () => Math.floor(Math.random() * 100)); // Random numbers between 0 and 99
}

// Function to display the array with optional comparingIndices for highlighting
function displayArray(comparingIndices) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    const bubbleWidth = 50;
    const bubbleSpacing = 10;
    const startY = canvas.height / 2 - bubbleWidth / 2;
  
    arrayToSort.forEach((num, index) => {
      const bubbleX = index * (bubbleWidth + bubbleSpacing);
      const bubbleY = startY;
      // Draw the blue bubble for each number
      ctx.fillStyle = "lightblue";
      ctx.beginPath();
      ctx.arc(bubbleX + bubbleWidth / 2, bubbleY + bubbleWidth / 2, bubbleWidth / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      // Display the number within the bubble
      ctx.fillText(num, bubbleX + bubbleWidth / 2 - 10, bubbleY + bubbleWidth / 2 + 5);
  
      if (comparingIndices && (index === comparingIndices[0] || index === comparingIndices[1])) {
        // Highlight the bubbles being compared as red bubbles
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(bubbleX + bubbleWidth / 2, bubbleY + bubbleWidth / 2, bubbleWidth / 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.lineWidth = 1;
      }
    });
  
    // Restore the stroke and font settings
    ctx.strokeStyle = "black";
    ctx.font = "20px Arial";
  }

function enableInput() {
  document.getElementById("start-sort").disabled = false;
}

function disableInput() {
  document.getElementById("start-sort").disabled = true;
}

async function promptUserInput() {
  if (userInputPrompts < 3) {
    const input = prompt("Enter the next state of the array separated by spaces (e.g., '1 2 3 4 5 6 7'):");
    const inputArray = input.split(" ").map(Number);

    if (arraysMatch(inputArray, arrayToSort)) {
      userInput = inputArray;
      userInputPrompts++;
      alert("Correct! You can continue sorting.");
    } else {
      alert("Incorrect input. Please try again.");
      await promptUserInput();
    }
  } else {
    alert("You've solved all questions for this section. Sorting will continue.");
  }
}

function arraysMatch(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value, index) => value === arr2[index]);
}

async function bubbleSort() {
  let n = arrayToSort.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < n - currentStep - 1; i++) {
      displayArray([i, i + 1]);

      if (arrayToSort[i] > arrayToSort[i + 1]) {
        let temp = arrayToSort[i];
        arrayToSort[i] = arrayToSort[i + 1];
        arrayToSort[i + 1] = temp;
        swapped = true;

        if (currentStep === userInputPrompts) {
          disableInput();
          await promptUserInput();
          enableInput();
        }
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      displayArray();
    }
    currentStep++;
  } while (swapped);
  result.textContent = "Sorting completed!";
  displayArray();
}

document.getElementById("start-sort").addEventListener("click", async () => {
  if (!isSorting) {
    isSorting = true;
    enableInput();
    await bubbleSort();
    isSorting = false;
    disableInput();
  }
});

displayArray();
