import React, { useState } from 'react';
import './MergeSort.css';

const MergeSortVisualizer = () => {
  const initialArray = [17, 20, 18, 16, 14, 12, 10];
  const [array, setArray] = useState([...initialArray]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]);
  const [mergeRange, setMergeRange] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [activeLanguage, setActiveLanguage] = useState('python');

  const resetArray = () => {
    setArray([...initialArray]);
    setActiveIndices([]);
    setMergeRange([]);
    setSortedIndices([]);
  };

  const mergeSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    setSortedIndices([]);
    
    const arrayCopy = [...array];
    await mergeSortHelper(arrayCopy, 0, array.length - 1);
    
    setSortedIndices(Array.from({ length: array.length }, (_, i) => i));
    await celebrationAnimation();
    setIsSorting(false);
  };

  const mergeSortHelper = async (arr, start, end) => {
    if (start >= end) return;
    
    const mid = Math.floor((start + end) / 2);
    setMergeRange([start, end]);
    await sleep(500);
    
    await mergeSortHelper(arr, start, mid);
    await mergeSortHelper(arr, mid + 1, end);
    await merge(arr, start, mid, end);
  };

  const merge = async (arr, start, mid, end) => {
    const temp = [];
    let i = start;
    let j = mid + 1;
    
    setMergeRange([start, end]);
    await sleep(500);

    while (i <= mid && j <= end) {
      setActiveIndices([i, j]);
      await sleep(800);
      
      if (arr[i] <= arr[j]) {
        temp.push(arr[i++]);
      } else {
        temp.push(arr[j++]);
      }
      
      const newArray = [...arr];
      setArray([...newArray]);
      await sleep(300);
    }

    while (i <= mid) {
      temp.push(arr[i++]);
      const newArray = [...arr];
      setArray([...newArray]);
      await sleep(300);
    }

    while (j <= end) {
      temp.push(arr[j++]);
      const newArray = [...arr];
      setArray([...newArray]);
      await sleep(300);
    }

    for (let k = 0; k < temp.length; k++) {
      arr[start + k] = temp[k];
    }
    
    setArray([...arr]);
    setMergeRange([]);
    setActiveIndices([]);
    await sleep(500);
  };

  const celebrationAnimation = async () => {
    for (let i = 0; i < array.length; i++) {
      setActiveIndices([i]);
      await sleep(150);
    }
    setActiveIndices([]);
    await sleep(300);
    setActiveIndices(Array.from({ length: array.length }, (_, i) => i));
    await sleep(300);
    setActiveIndices([]);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const pythonCode = `def mergesort(arr):
    """Main MergeSort function (returns new sorted list)"""
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = mergesort(arr[:mid])  # Sort left half
    right = mergesort(arr[mid:]) # Sort right half
    return merge(left, right)     # Merge sorted halves

def merge(left, right):
    """Merge two sorted lists"""
    merged = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1
    
    # Add remaining elements
    merged += left[i:]
    merged += right[j:]
    return merged

# Example usage
if __name__ == "__main__":
    arr = [10, 7, 8, 9, 1, 5]
    sorted_arr = mergesort(arr)
    print("Sorted array:", sorted_arr)`;

  const javaCode = `public class MergeSort {
    public static void sort(int[] arr) {
        if (arr == null || arr.length <= 1) return;
        int[] temp = new int[arr.length];
        mergeSort(arr, 0, arr.length - 1, temp);
    }

    private static void mergeSort(int[] arr, int low, int high, int[] temp) {
        if (low < high) {
            int mid = low + (high - low) / 2;
            mergeSort(arr, low, mid, temp);     // Sort left half
            mergeSort(arr, mid + 1, high, temp); // Sort right half
            merge(arr, low, mid, high, temp);    // Merge sorted halves
        }
    }

    private static void merge(int[] arr, int low, int mid, int high, int[] temp) {
        int i = low, j = mid + 1, k = low;

        // Merge left and right in sorted order
        while (i <= mid && j <= high) {
            temp[k++] = (arr[i] <= arr[j]) ? arr[i++] : arr[j++];
        }

        // Copy remaining elements
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= high) temp[k++] = arr[j++];

        // Copy back to original array
        System.arraycopy(temp, low, arr, low, high - low + 1);
    }

    public static void main(String[] args) {
        int[] arr = {10, 7, 8, 9, 1, 5};
        sort(arr);
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }
}`;

  return (
    <div className="merge-sort-container">
      <h1>Merge Sort Visualization</h1>
      <div className="main-content">
        {/* Visualization Panel */}
        <div className="visualization-panel">
          <div className="controls">
            <button 
              className="sortButton" 
              onClick={mergeSort}
              disabled={isSorting}
            >
              {isSorting ? 'Sorting...' : 'Merge Sort'}
            </button>
            <button 
              className="restartButton" 
              onClick={resetArray}
              disabled={isSorting}
            >
              Reset
            </button>
          </div>
          <div className="figures-container">
            {array.map((value, index) => {
              const height = 150 + value * 5;
              const isActive = activeIndices.includes(index);
              const isInMergeRange = index >= mergeRange[0] && index <= mergeRange[1];
              const isSorted = sortedIndices.includes(index);
              
              return (
                <div 
                  key={index}
                  className={`figure ${isActive ? 'comparing' : ''} 
                    ${isInMergeRange ? 'merge-range' : ''} 
                    ${isSorted ? 'sorted' : ''}`}
                  style={{ height: `${height}px` }}
                >
                  <div className="text">{value}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Description Panel */}
        <div className="description-panel">
          <div className="algorithm-description">
            <h2>Merge Sort (Description)</h2>
            <p>
              Merge sort is a sorting algorithm that follows the divide-and-conquer approach. 
              It works by recursively dividing the input array into smaller subarrays and sorting 
              those subarrays then merging them back together to obtain the sorted array.
            </p>
            
            <h3>How It Works?</h3>
            <ol>
              <li><strong>Divide:</strong> Split the array into left and right halves</li>
              <li><strong>Conquer:</strong> Recursively sort each half</li>
              <li><strong>Merge:</strong> Combine two sorted halves into one sorted array</li>
            </ol>
            
            <h3>Time Complexity:</h3>
            <p>All Cases: O(n log n) (Consistently fast)</p>
            
            <h3>Space Complexity:</h3>
            <p>O(n) (Requires temporary array)</p>
          </div>

          <div className="code-tabs">
            <div className="language-selector">
              <button 
                className={activeLanguage === 'python' ? 'active' : ''}
                onClick={() => setActiveLanguage('python')}
              >
                Python
              </button>
              <button 
                className={activeLanguage === 'java' ? 'active' : ''}
                onClick={() => setActiveLanguage('java')}
              >
                Java
              </button>
            </div>
            
            <div className="code-display">
              {activeLanguage === 'python' ? (
                <pre>{pythonCode}</pre>
              ) : (
                <pre>{javaCode}</pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MergeSortVisualizer;
