import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaEdit, FaTrash, FaEllipsisH } from 'react-icons/fa'

const CleanupFeedItem = () => {
  return (
    <div className="card bg-dark feed-item">
      <div
        className="grid mb"
        style={{
          gridTemplateColumns: "42px 1fr auto",
        }}
      >
        <img src="" alt="" style={styles.avatar} />
        <div style={styles.meta}>
          <p className="font-sm">Matt Russo</p>
          <p className="font-sm">June 19, 2025</p>
          {/* <p className="font-sm">{username}</p>
          <p className="font-sm">{dateConverter(date)}</p> */}
        </div>
        <div
          style={{
            display: "inline-block",
          }}
        >
          <button style={{ marginRight: "10px" }}>
            <FaEdit style={{ color: "#999" }} />
          </button>
          <NavLink to="/" style={{ marginRight: "10px" }}>
            <FaTrash style={{ color: "#dc3545" }} />
          </NavLink>
        </div>
        <button style={{ height: "1rem" }} onClick={console.log('button clicked')}>
          <FaEllipsisH
            style={{ color: "#555", justifySelf: "end" }}
          />
        </button>
      </div>
      <div
        className="flex"
        style={{ alignItems: "center", marginBottom: ".25em" }}
      >
        <FaTrash className="icon-primary" />
        <h3
        //   onClick={handleTitleLink}
          className="font-md ml-1 title"
          style={{ cursor: "pointer" }}
        >
          {/* {title} */}
          Carroll Path Cleanup
        </h3>
      </div>
      
        <p className="font-sm" style={{ marginBottom: ".5em" }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis nisi id autem explicabo exercitationem perspiciatis.
        </p>
      <div style={styles.stats}>
        <div className="text-primary mr">
          <p className="font-sm">
            Total weight collected
          </p>
          <p className="font-lg" style={{ lineHeight: "1", marginBottom: "0" }}>
            3 lbs.
          </p>
        </div>
        <div className="mr">
          <p className="font-sm">Environment Type</p>
          <p className="font-md">
            Nature path
          </p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  avatar: {
    height: "42px",
    width: "42px",
    border: "1px solid #fff",
    borderRadius: "50%",
  },
  meta: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  icon: {
    height: "1rem",
    width: "1rem",
    border: "1px solid #fff",
  },
  stats: {
    display: "inline-flex",
    flexWrap: "wrap",
    gap: "1rem",
  },
};

export default CleanupFeedItem
