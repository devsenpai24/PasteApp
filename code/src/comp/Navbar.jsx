import React from 'react'
import { NavLink } from 'react-router'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-4 mt-3 place-content-evenly'>
     <NavLink to={"/"}>Home</NavLink>
     <NavLink to={"pastes"}>Pastes</NavLink>
    </div>
  )
}

export default Navbar
