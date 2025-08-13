import { useState, useEffect } from 'react'
import {useNavigate, Link, useLocation } from 'react-router-dom';
// import { useParams, useLoaderaction, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaTrash, FaEdit } from 'react-icons/fa';
import Spinner from '../Spinner';
import { toast } from 'react-toastify';
import dateConverter from '../../utils/dateConverter';
import axios from 'axios';

const ActionPage = ({cleanup}) => {
  const navigate = useNavigate();
  const locationHook = useLocation();
  const actionId = locationHook.pathname.split("/")[2];

  const [action, setAction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAction = async () => {
      try {
        const res = await fetch(`/api/cleanups/${actionId}`);
        if (!res.ok) throw new Error('Failed to fetch action');
        const action = await res.json();
        setAction(action);
        console.log('action: ', action)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAction();
  }, []);

  const deleteAction = async (id) => {
    try {
      await axios.delete(`/api/cleanups/${id}`);
    } catch (err) {
      console.log(err);
    }
  }
  
  const onDeleteClick = (actionId) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this action?'
    );

    if (!confirm) return;

    deleteAction(actionId);

    toast.success('Action deleted successfully');

    navigate('/');
  };

  // const { id, title, date, description, group_size, location, env_type, total_items, total_bags } = action[0] || {};

  return (    
    <>
      {loading && <Spinner loading={loading} />}
      {error && <p>Error fetching action: {error.message}</p>}
      {action && (
        <div className="container-narrow">
          {/* <div className="grid-2 my-2">
            <button className="btn btn-light" onClick={handleDelete}>
              Cancel
            </button>
            <button className="btn btn-primary--dark" onClick={handleSave}>
              Save
            </button>
          </div> */}
          <div className='flex mb-2' style={styles.top}>
            <Link to='/' className='back-link'>
              <FaArrowLeft className='mr' /> Back to Home
            </Link>
            <div>
              <button className="mr-1">
                <Link to={`/edit-cleanup/${actionId}`}>
                  <FaEdit style={{ color: "#999" }} /> Edit
                </Link>
              </button>
              <button onClick={() => onDeleteClick(actionId)}>
                <FaTrash style={{ color: "#dc3545" }} /> Delete
              </button>
            </div>
          </div>
          <div
            className="grid mb"
            style={{
              gridTemplateColumns: "42px 1fr",
            }}
          >
            <img src="" alt="" style={styles.avatar} />
            <div style={styles.meta}>
              {/* <p className="font-sm">{userName}</p> */}
              {/* <p className="font-sm">{dateConverter(date)}</p> */}
            </div>
          </div>

          <h1>Action Summary</h1>
          <div className="container-narrow bg-dark">
            <p>Title: {action[0]['title']}</p>
            {description && <p>Description: {action.description}</p>}
            {/* <p>Date: {dateConverter(date)}</p> */}
          </div>
          <div className="container-narrow bg-dark">
            <p>Group size: {group_size}</p>
            <p>Environment type: {env_type}</p>
            <p>Location: {location}</p>
            {/* CO2e prevented:{" "}
            <span className="font-lg text-primary">{carbonPrevented} kg</span> */}
          </div>
          
          <div className="container-narrow bg-dark">
            <h3 className="px-1 mb-1">Impact</h3>
            <div className="grid-2" style={{ gridGap: 0 }}>
              <div style={{ textAlign: "center" }}>
                {/* <p className="font-lg" style={{ marginBottom: 0 }}> */}
                  {total_bags && (
                    <div className="text-primary mr">
                      <p className="font-lg" style={{ marginBottom: "0" }}>
                        {total_bags}
                      </p>
                      <p className="font-md">
                        Bags collected
                      </p>
                    </div>
                  )}
                {/* </p> */}
              </div>
              <div style={{ textAlign: "center" }}>
                {/* <p className="font-lg" style={{ marginBottom: 0 }}> */}
                  {total_items && (
                    <div className="text-primary mr">
                      <p className="font-lg" style={{ marginBottom: "0" }}>
                        {total_items}
                      </p>
                      <p className="font-md">
                        Items collected
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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
  top: {
    display: "flex",
    justifyContent: "space-between",
  }
};

export default ActionPage;
