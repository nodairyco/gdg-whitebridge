import React from 'react'
import './SideBar.css'
import { useNavigate } from 'react-router-dom'

export default function SideBar() {
    return (
        <div className='sideBar'>
            <a className='sideBarButton' id="mergeSortButton" href='/mergesort'>
                Merge Sort
            </a>
            <button className='sideBarButton'>
                Quick Sort
            </button>
            <button className='sideBarButton'>
                Bubble Sort
            </button>
            <button className='sideBarButton'>
                Depth First Search
            </button>



        </div>
    )
}
