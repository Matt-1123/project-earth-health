import {useNavigate, Link, useLocation } from 'react-router-dom';
// import { useParams, useLoaderData, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import dateConverter from '../../utils/dateConverter';
import axios from 'axios';

const ActionPage = () => {

  const locationHook = useLocation()
  const { action } = locationHook.state

  const navigate = useNavigate();

  const { id, title, date, userName, description, group_size, duration, location, env_type, total_items, total_bags } = action;

  console.log('id', id)

  // const { id } = useParams();
  // const action = useLoaderData();
  
  console.log("action: " + JSON.stringify(action))

  const deleteAction = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/cleanups/${id}`);
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

  return (    
    <>
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
              <Link to={`/edit-cleanup/${id}`}>
                <FaEdit style={{ color: "#999" }} /> Edit
              </Link>
            </button>
            <button onClick={() => onDeleteClick(id)}>
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
            <p className="font-sm">{action.userName}</p>
            <p className="font-sm">{dateConverter(date)}</p>
          </div>
        </div>

        <h1>Action Summary</h1>
        <div className="container-narrow bg-dark">
          <p>Title: {title}</p>
          {action.description && <p>Description: {description}</p>}
          <p>Date: {dateConverter(date)}</p>
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
              <p className="font-lg" style={{ marginBottom: 0 }}>
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
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p className="font-lg" style={{ marginBottom: 0 }}>
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
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}


const actionLoader = async ({ params }) => {
  const res = await fetch(`/api/actions/${params.id}`);
  const data = await res.json();
  return data;
};

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

export { ActionPage as default, actionLoader };
