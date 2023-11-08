// HTMLComponent.js
import React, { useEffect } from 'react';

function HTMLComponent() {
  useEffect(() => {
    // Your existing JavaScript code can go here
    const canvas = document.getElementById("arrayCanvas");
    const ctx = canvas.getContext("2d");
    const squareSize = 30;
    const spacing = 5;
    const spaceBetweenHalves = 10; // Adjust this value for the desired spacing
    // Set the font and text color

    ctx.fillStyle = 'rgb(158, 231, 161)';
    ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);

    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    
    // Specify the coordinates and text to be written
    const x = 400;
    const y = 10;
    const text = ".";

    // Use fillText to write the text on the canvas
    ctx.fillText(text, x, y);
    const displayArray = (arr,y,start) => {
      ctx.font = '16px Arial';
      ctx.fillStyle = 'black';

      const startX =start;
      const startY = 30+y;
      let x=0;
      for (let i = 0; i < arr.length; i++) {
         x = startX + i * (squareSize + spacing);

        // Display the original boxes at y=30
        ctx.fillRect(x, startY, squareSize, squareSize);
        ctx.strokeRect(x, startY, squareSize, squareSize);

        ctx.fillStyle = 'white';
        ctx.fillText(arr[i], x + squareSize / 2 - 6, startY + squareSize / 2 + 6);
        ctx.fillStyle = 'black';
        
      }
      

      
      return {
    arr: arr,
    startY: startY,
    startX: x+30,
    start: start-30
  };
    };

    
    const left=(firstHalf,y,x)=>
    {
      let Y=y;
      let X=x;
      if (firstHalf.length!==0)
  
      { 
        
        let result=displayArray(firstHalf,Y,X )
    
        let arr = result.arr;
        let y = result.startY +80;
        let start= result.start;
        if (arr.length>1)
        {
       
        const firstHalf = arr.slice(0, Math.floor(arr.length / 2));
        const secondHalf = arr.slice(Math.floor(arr.length / 2));

       
        if (secondHalf.length!==0)
        {

          let x =startX;
        
          ctx.save();
          ctx.translate(270,0);
          again() ;
          ctx.restore();
          right(secondHalf,y,x);
          
        }
        if (firstHalf.length!==0)
        {
          let x =start;
          ctx.save();
          inside();
          ctx.restore();
          left(firstHalf,y,x);
          console.log("first half is ",firstHalf);
        }
      

      }

      }
    } 

    const right=( secondhalf,y,x)=>
    {
      let ry=y;
      let rX=x;
      console.log("array i have now is ", secondhalf);
      if (secondhalf.length!==0)
      {

        let result=displayArray( secondhalf,ry,rX )
        let arr = result.arr;
        let y = result.startY +80;
        let x =result.startX;
        console.log("the x im at is ", x);
        if (arr.length>1)
        {
       
        const firstHalf = arr.slice(0, Math.floor(arr.length / 2));
        
        const secondHalf = arr.slice(Math.floor(arr.length / 2));
        

        if (secondHalf.length>0)
        {
          ctx.save();
          ctx.translate(260,0);
          inside();
          ctx.restore();
          right(secondHalf,y,x);
        
        }
        if (firstHalf.length!==0)
        {
          ctx.save();
          again() ;
          ctx.restore();
          left(firstHalf,y,result.start);
          console.log("first half is ",firstHalf);
        }
        
      
       }
    }
  }
  

    const arr = [];
    for (let i = 0; i < 6; i++) {
      const randomNum = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
      arr.push(randomNum);
    }
    const totalWidth = arr.length * (squareSize + spacing);
    
    let startX =(canvas.width-totalWidth)/2;
    const result = displayArray(arr, 0,startX);
    const divideX = startX + (arr.length / 2) * (squareSize + spacing);
    function drawArrow() {


    // Set the starting point at the center
    ctx.moveTo(divideX-20, 60);

    // Draw the arrow body (line)
    ctx.lineTo(190, 150); // Adjust the arrow length as needed

    ctx.moveTo(divideX+20, 60);

// Draw the arrow body (line)
    ctx.lineTo(420, 150); // Adjust the arrow length as needed

    // Style the arrow
    ctx.strokeStyle = 'blue'; // Arrow outline color
    ctx.lineWidth = 1; // Arrow outline width
    ctx.fillStyle = 'blue'; // Arrow fill color

    // Draw the arrow
    ctx.stroke();
}
function inside() {


    // Set the starting point at the center
    ctx.moveTo(180, 165);

    // Draw the arrow body (line)
    ctx.lineTo(100, 250); // Adjust the arrow length as needed

    ctx.moveTo(180, 165);

// Draw the arrow body (line)
    ctx.lineTo(230, 250); 


    // Style the arrow
    ctx.strokeStyle = 'blue'; // Arrow outline color
    ctx.lineWidth = 1; // Arrow outline width
    ctx.fillStyle = 'blue'; // Arrow fill color

    // Draw the arrow
    ctx.stroke();
}

function again() {


    ctx.moveTo(230, 280);

// Draw the arrow body (line)
    ctx.lineTo(180,360 ); 

    ctx.moveTo(230, 280);

// Draw the arrow body (line)
    ctx.lineTo(275,360 ); 


    // Style the arrow
    ctx.strokeStyle = 'blue'; // Arrow outline color
    ctx.lineWidth = 1; // Arrow outline width
    ctx.fillStyle = 'blue'; // Arrow fill color

    // Draw the arrow
    ctx.stroke();
}

    console.log("value of startxx is ",result.startX, " and the arr  is " +result.arr);
         // Calculate the X-coordinate for dividing the array in half
    document.getElementById('drawLineButton').addEventListener('click', function() {

      drawArrow();
    // Draw a division line
    ctx.beginPath();
    ctx.moveTo(divideX, 10);
    ctx.lineTo(divideX, 400);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

   document.getElementById('left').addEventListener('click', function() {
    if (arr.length!==0)
    {
    let ay = result.startY +80;
    let ax = result.startX-275;
    const firstHalf = arr.slice(0, Math.floor(arr.length / 2));
    left(firstHalf, ay, ax);
    this.disabled = true;
    }
  });
document.getElementById('right').addEventListener('click', function() {
    if (arr.length!==0)
    {
    let y = result.startY+70+ spaceBetweenHalves;
    let x= result.startX-30;
    const secondHalf = arr.slice(Math.floor(arr.length / 2));
    right(secondHalf, y, x);
    this.disabled = true;
    }
  });
  this.disabled = true;
  });

  let s=spacing+50;
  for (let i = 0; i < arr.length; i++) {
    let  x = 85 + i * (squareSize + s);

    // Display the original boxes at y=30
    ctx.fillRect(x, 450, squareSize, squareSize);
    ctx.strokeRect(x,450, squareSize, squareSize);

    ctx.fillStyle = 'white';
    ctx.fillText(arr[i], x + squareSize / 2 - 8, 450+ squareSize / 2 +6);
    ctx.fillStyle = 'black';
    
  }
  const pairs = [];
 const arr2=[];
// Sort and group the numbers in pairs
for (let i = 0; i < arr.length; i += 2) {
  const pair = [arr[i], arr[i + 1]].sort((a, b) => a - b);
  pairs.push(pair);
  arr2.push(pair[0]);
  arr2.push(pair[1]);
}
console.log("array ",arr2);

for (let i = 0; i < arr2.length; i++) {
  let  x = 115 + i * (squareSize + s);

  // Display the original boxes at y=30
  ctx.fillRect(x, 500, squareSize, squareSize);
  ctx.strokeRect(x,500, squareSize, squareSize);

  ctx.fillStyle = 'white';
  ctx.fillText(arr2[i], x + squareSize / 2 - 8, 500+ squareSize / 2 +6);
  ctx.fillStyle = 'black';
  if (i%2===0)
  {
    s=5;
  }
  else
  {
    s=spacing+100;
  }
  
}


  }, []);

  return (
    <div>
      <button id="drawLineButton">Draw Line</button>
      <button id="left">left</button>
      <button id="right">right</button>
      <canvas id="arrayCanvas" width="600" height="600"></canvas>
    </div>
  );
}

export default HTMLComponent;