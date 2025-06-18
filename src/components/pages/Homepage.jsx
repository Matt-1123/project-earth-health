import React from 'react'
import Feed from '../Feed'
import { FaMapMarker } from 'react-icons/fa'
import '../../App.css'


const Homepage = () => {
  return (
    <>
        <h1>Project Earth Health</h1>
        <div className="grid-2-5-2 my-2" style={{ alignItems: "start" }}>
            <div className="container">
            <h2 className="text-left">Actions</h2>
            <hr />
            <p className="mt-1" style={{ lineHeight: "1.125" }}>
                Choose an action type:
            </p>
            <ul className="list">
                {/* <li>
                    <Link to="/add-travel">Travel</Link>
                </li> */}
            </ul>
            </div>

            <div>
                <Feed />
            </div>

            <div className="container">
                <h2 className="text-left">Learn More</h2>
                <hr />
                <ul className="list">
                    {/* <li>
                        <Link to="/about">About</Link>
                    </li> */}
                </ul>
            </div>
        </div>
    </>
  )
}

export default Homepage
