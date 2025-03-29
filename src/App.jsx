import { useState } from 'react'
import Home from './home/Home'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import MergeSort from './mergesort/MergeSort'
import TopBar from './topbar/TopBar'
import QuickSort from './quicksort/QuickSort'
import BubbleSort from './bubblesort/BubbleSort'
import Bfs from './bfs/Bfs'
import Dfs from './dfs/Dfs'
import Stack from './stack/Stack'

export default function App() {

  return (
    <>
      <TopBar></TopBar> 
      <Router>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/mergesort' element={<MergeSort></MergeSort>}></Route>
          <Route path='/quicksort' element={<QuickSort></QuickSort>}></Route>
          <Route path='/bubblesort' element={<BubbleSort></BubbleSort>}/>
          <Route path='/bfs' element={<Bfs></Bfs>}></Route>
          <Route path='/dfs' element={<Dfs></Dfs>}/>
          <Route path='/stack' element={<Stack></Stack>}></Route>
        </Routes>
      </Router> 
    </>
  )
}



