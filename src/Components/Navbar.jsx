import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import React from 'react';
import './Comp.css';

export default function Navbar() {
  return (
    <header  className='bg-slate-200 shadow-md'>
      <div  className='flex justify-between items-center max-w-6xl mx-auto p-3'>
          <Link to="/">
          <h1 className="heading">
              <span className="sp">My</span>
              <span className="sp1">Property</span>
          </h1>
          </Link>
          <form className="forminput">
              <input className="input"    type='text' placeholder='Search...'></input>
              <FaSearch className='text-slate-600'/>
          </form>
          <ul className="list">
            <Link to='/'>
            <li className='li'>Home</li>
            </Link>
            <Link to='/about'>
            <li className='li'>About</li>
            </Link>
            <Link to='/signup'>
            <li className='li'>Signup</li>
            </Link>
          </ul>
       </div>
    </header>
  )
}
