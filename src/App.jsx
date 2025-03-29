import { useState } from 'react'
import Home from './home/Home'
import SideBar from './sidebar/SideBar'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import MergeSort from './mergesort/MergeSort'

export default function App() {

  return (
    <>
      <HomeButton></HomeButton>
      <SideBar>

      </SideBar>
      <Router>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/mergesort' element={<MergeSort></MergeSort>}></Route>
        </Routes>
      </Router> 
    </>
  )
}

function HomeButton() {
  return (
    <div className='homeButtonDiv'>
      <a className='homeButton'>
      </a>
    </div>
  )
}