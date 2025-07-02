import { useParams, useLoaderData, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaTrash, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';


const ActionPage = () => {

  const navigate = useNavigate();

  const { id } = useParams();
  const action = useLoaderData();
  
  console.log("action: " + JSON.stringify(action))

  const deleteAction = async (id) => {
    const res = await fetch (`/api/actions/${id}`, {
      method: 'DELETE',
    })
    return;
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
            <p className="font-sm">{action.date}</p>
          </div>
        </div>

        <h1>Action Summary</h1>
        <div className="container-narrow bg-dark">
          <p>Title: {action.title}</p>
          {action.description && <p>Description: {action.description}</p>}
          <p>Date: {action.date}</p>
        </div>
        <div className="container-narrow bg-dark">
          Lorem ipsum
          {/* CO2e prevented:{" "}
          <span className="font-lg text-primary">{carbonPrevented} kg</span> */}
        </div>
        <div className="grid-2">
          <div className="card bg-dark">
            <h3 className="px-1 mb-1">Lorem ipsum</h3>
            <div className="grid-2" style={{ gridGap: 0 }}>
              <div style={{ textAlign: "center" }}>
                <p className="font-lg" style={{ marginBottom: 0 }}>
                  lorem ipsum
                </p>
                <p className="font-sm">dolor</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p className="font-lg" style={{ marginBottom: 0 }}>
                  icon
                </p>
                <p className="font-sm">Lorem ipsum</p>
              </div>
            </div>
          </div>
          <div className="card bg-dark">
            <h3 className="px-1 mb-1">Lorem ipsum</h3>
            <div className="grid-2" style={{ gridGap: 0 }}>
              <div style={{ textAlign: "center" }}>
                <p className="font-lg" style={{ marginBottom: 0 }}>
                  Lorem ipsum
                </p>
                <p className="font-sm">dolor</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p className="font-lg" style={{ marginBottom: 0 }}>
                  icon
                </p>
                <p className="font-sm">Lorem ipsum</p>
              </div>
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
