import React, { useState } from 'react';
import './SortingAlgorithmsPage.css'; 
import BubbleSortVisualizer from './BubbleSortVisualizer';
import MergeSortVisualizer from './MergeSortVisualizer';
import QuickSortVisualizer from './QuickSortVisualizer';
import { Link } from 'react-router-dom';
//import QuickSortVisualizer from './QuickSortVisualizer';



const sortingAlgorithms = [
  {
    title: 'Bubble Sort',
    description: 'Bubble Sort is a sorting algorithm that operates by swapping nearby elements repeatedly if they are out of order. After every loop or pass, the largest item (in increasing order) until it reaches the end. The list is traversed again and again until it is sorted.',
    // Add more properties as needed
  },
  // Add information for other sorting algorithms
  {
    title: 'Merge Sort',
    description: 'Merge Sort uses the divide and conquer algorithm by dividing the input array into smaller subarrays, sort each subarray, and then merges the subarrays back together to obtain a sorted array',
    // Add more properties as needed
  },
  {
    title: 'Quick Sort',
    description: 'QuickSort is uses a technique that starts by selecting a special item from a list, called a "pivot".That then separates everything into two groups: all elements smaller than the pivot come before it, and all elements greater than the pivot come after it.',
    // Add more properties as needed
  },
];
const SortingAlgorithmsPage = () => {
  const [visualizerAlgorithm, setVisualizerAlgorithm] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const startVisualization = (algorithm) => {
    setVisualizerAlgorithm(algorithm);
  };

    // Function to toggle the menu drawer visibility
    const toggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
    };

  
  return (
    <div className="sorting-algorithms-page">
    <div className="menu-toggle-button" onClick={toggleDrawer}>
    </div>
    <h1 className="page-title">Visualize Sorting Algorithms</h1>
    <p style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }} className="page-description">
  Welcome to the visualizer page. Learn how different sorting algorithms work by clicking on "Visualize" to see them in action!
  <br />
  Zoom Out to see properly
</p>


    <div className="page-content">
      {/* Navigation drawer */}
      <div className={`navigation-drawer ${isDrawerOpen ? 'open' : ''}`}
      >
      </div>
        <div className="algorithm-list">
          {sortingAlgorithms.map((algorithm, index) => (
            <div key={index} className="algorithm-card">
              <h2>{algorithm.title}</h2>
              <p style={{  fontSize: '20px', fontWeight: 'bold' }} >{algorithm.description}</p>
              <button
  onClick={() => startVisualization(algorithm)}
  className="visualize-button"
  style={{
    backgroundColor: 'lightblue',
    borderRadius: '8px',
    fontSize: '1.5rem',  // Adjust the font size as needed
    padding: '10px 20px',  // Adjust the padding as needed
  }}
>
  Visualize
</button>

            </div>
          ))}
        </div>
        <div className="visualizer-container">
          {/* Conditional rendering based on the selected algorithm */}
          {visualizerAlgorithm && (
            visualizerAlgorithm.title === 'Bubble Sort' ? (
              <BubbleSortVisualizer />
            ) : 
              visualizerAlgorithm.title === 'Merge Sort' ? (
                <MergeSortVisualizer />
              ) :
             
                visualizerAlgorithm.title === 'Quick Sort' ? (
                  <QuickSortVisualizer />
                ) :null
           // )
          )}
        </div>
      </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <button style={{ backgroundColor: '#CD366C', color: 'white', borderRadius: '0.5rem', fontSize: '1rem', border: 'none', cursor: 'pointer', padding: '1rem 1rem', margin: '1rem' }}>
                Back
              </button>
            </Link>
                </div>
    </div>
  );
};

export default SortingAlgorithmsPage;
