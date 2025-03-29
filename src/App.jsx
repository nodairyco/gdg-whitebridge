import { useState } from 'react'
import Home from './home/Home'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import MergeSort from './mergesort/MergeSort'
import TopBar from './topbar/TopBar'

export default function App() {

  return (
    <>
      <TopBar></TopBar> 
      <Router>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/mergesort' element={<MergeSort></MergeSort>}></Route>
        </Routes>
      </Router> 
    </>
  )
}

