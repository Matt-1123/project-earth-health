import React from 'react'
import { Link } from 'react-router-dom';
import Feed from '../Feed'
import '../../App.css'

const Homepage = ({ actions }) => {    
    return (
        <>
            <div className="container grid-2-5-2 mt-2 mb-2" style={{ alignItems: "start" }}>
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
                        <li>
                            <Link to="/add-cleanup">Cleanup</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <Feed actions={actions} />
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
