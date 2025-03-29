import React, { useEffect, useState } from 'react'
import './topbar.css'
import tempSvg from '../../public/algo-temp-icon.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

export default function TopBar() {
    const [scrolled, setScrolled] = useState(false)

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
                    <a className='navButton'>Sorting <FontAwesomeIcon icon={faAngleDown} className='navButtonArrow'/>  </a>
                    <a className='navButton'>Trees <FontAwesomeIcon icon={faAngleDown} className='navButtonArrow'/></a>
                    <a className='navButton'>Misc <FontAwesomeIcon icon={faAngleDown} className='navButtonArrow'/></a>
                </nav>
                <a className='homeButton'>
                    WHITEBRIDGE 
                    <img src={tempSvg} height='50px' width='50px'></img>
                </a>
            </header>
        </div>
    )
}
