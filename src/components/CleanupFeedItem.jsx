import React from 'react'
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEllipsisH } from 'react-icons/fa'

const CleanupFeedItem = ({ action }) => {
  console.log(JSON.stringify(action))
  const { id, title, date, userName, description, groupSize, duration, location, environmentType, totalItems, totalBags } = action;
  
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
          <p className="font-sm">{userName}</p>
          <p className="font-sm">{date}</p>
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
          <button>
            <Link to="/" style={{ marginRight: "10px" }}>
              <FaTrash style={{ color: "#dc3545" }} />
            </Link>
          </button>
          <button style={{ height: "1rem" }} onClick={console.log('button clicked')}>
            <FaEllipsisH
              style={{ color: "#555", justifySelf: "end" }}
            />
          </button>
        </div>
      </div>
      <div
        className="flex"
        style={{ alignItems: "center", marginBottom: ".25em" }}
      >
        <FaTrash className="icon-primary" />
        <h3
          // onClick={handleTitleLink}
          className="font-md ml-1 title"
          style={{ cursor: "pointer" }}
        >
          {/* <Link to=`/actions/${id}`>{title}</Link> */}
          {title}
        </h3>
      </div>
      
        <p className="font-sm" style={{ marginBottom: ".5em" }}>
          {description}
        </p>
      <div style={styles.stats}>
        <div className="text-primary mr">
          <p className="font-sm">
            Total weight collected
          </p>
          <p className="font-md" style={{ lineHeight: "1", marginBottom: "0" }}>
            3 lbs.
          </p>
        </div>
        <div className="mr">
          <p className="font-sm">Environment Type</p>
          <p>
            {environmentType}
          </p>
        </div>
        <div className="mr">
          <p className="font-sm">Location</p>
          <p>
            {location}
          </p>
        </div>
        <div className="mr">
          <p className="font-sm">Group Size</p>
          <p>
            {groupSize}
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
