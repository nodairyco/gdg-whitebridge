import React, { useEffect, useState } from 'react'
import './topbar.css'
import tempSvg from '../../public/algo-temp-icon.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

export default function TopBar() {

    const [scrolled, setScrolled] = useState(false)
    const [isHoveredSort, setIsHoveredSort] = useState(false)
    const [isHoveredTrees, setIsHoveredTrees] = useState(false)
    const [isHoveredMisc, setIsHoveredMisc] = useState(false)

    useEffect(() => {
        function handleScroll() {
            if (window.scrollY > 10 !== scrolled) {
                setScrolled(window.scrollY > 10)
            }
        }

        document.addEventListener('scroll', handleScroll)

        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [scrolled])


    return (
        <div className={
            `topBarContainer${scrolled ? '-border' : ''}`
        }>
            <header className='navContainerHeader'>
                <nav className='topBarNav'>
                    <NavItem name='Sorting' setIsHovered={setIsHoveredSort}
                        isHovered={isHoveredSort}>
                        {
                            isHoveredSort &&
                            <Dropdown setIsHovered={setIsHoveredSort}>
                                <a href='/quicksort' className='dropDownItem'>
                                    Quick Sort
                                </a>
                                <a href = '/mergesort' className='dropDownItem'>
                                    Merge Sort
                                </a>
                                <a href='/bubblesort' className='dropDownItem'>
                                    Bubble Sort
                                </a>
                            </Dropdown>
                        }
                    </NavItem>

                    <NavItem name='Trees' setIsHovered={setIsHoveredTrees}
                        isHovered={isHoveredTrees}>
                        {
                            isHoveredTrees &&
                            <Dropdown setIsHovered={setIsHoveredTrees}>
                                <a href='/dfs' className='dropDownItem'>
                                    Depth First Search
                                </a>
                                <a href='/bfs' className='dropDownItem'>
                                    Breadth First Search 
                                </a>
                            </Dropdown>
                        }
                    </NavItem>

                    <NavItem name='Misc' setIsHovered={setIsHoveredMisc}
                        isHovered={isHoveredMisc}>
                        {
                            isHoveredMisc &&
                            <Dropdown setIsHovered={setIsHoveredMisc}>
                                <a href='/stack' className='dropDownItem'>
                                    Stack
                                </a>
                            </Dropdown>
                        }
                    </NavItem>
                </nav>
                <a className='homeButton' href='/'>
                    WHITEBRIDGE
                    <img src={tempSvg} width='50px' alt='logo' className='tempIcon'></img>
                </a>
            </header>
        </div>
    )
}

function NavItem(props) {

    return (
        <a className='navButton' onMouseEnter={() => { props.setIsHovered(true) }}
            onMouseLeave={() => { props.setIsHovered(false) }} aria-disabled='true'>
            {props.name} <FontAwesomeIcon icon={faAngleDown} className='navButtonArrow' />
            {props.children}
        </a>
    );
}

function Dropdown(props) {

    return (
        <div className='dropDownContainer'
            onMouseEnter={() => { props.setIsHovered(true) }}
            onMouseLeave={() => { props.setIsHovered(false) }}>
            <div className='dropDown'
                onMouseEnter={() => { props.setIsHovered(true) }}
                onMouseLeave={() => { props.setIsHovered(false) }}
            >
                {props.children}
            </div>
        </div>
    );
}