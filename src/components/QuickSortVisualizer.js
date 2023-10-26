import React from "react";

class ArrayVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: this.generateRandomArray(),
    };
  }

  generateRandomArray = () => {
    const size = Math.floor(Math.random() * 20) + 1; // Generates a random size between 1 and 20
    const array = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100)
    ); // Fills the array with random numbers
    return array;
  };

  handleClick = (item) => {
    // Handle click logic here
    console.log(`You clicked: ${item}`);
  };

  render() {
    const { array } = this.state;

    return (
      <div>
        {array.map((item, index) => (
          <button key={index} onClick={() => this.handleClick(item)}>
            {item}
          </button>
        ))}
      </div>
    );
  }
}

// Example usage
function QuickSortVisualizer() {
  return <ArrayVisualizer />;
}

export default QuickSortVisualizer;
