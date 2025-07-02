import { useState } from 'react';
import { useNavigate, useLoaderData, useParams } from 'react-router-dom';
import Select from "react-select";
import { toast } from 'react-toastify';

// const AddCleanupPage = ({ addCleanupSubmit }) => {
const AddCleanupPage = () => {
    const action = useLoaderData();
    
    // TODO: use localStorage to populate dropdowns (environmentType)
    const [title, setTitle] = useState(action.title);
    const [date, setDate] = useState(action.date);
    const [description, setDescription] = useState(action.description);
    const [location, setLocation] = useState(action.location);
    const [groupSize, setGroupSize] = useState(action.groupSize);
    const [environmentType, setEnvironmentType] = useState(action.environmentType);
    const [totalItemsCollected, setTotalItemsCollected] = useState(action.totalItemsCollected);
    const [totalBagsCollected, setTotalBagsCollected] = useState(action.totalBagsCollected);

    const navigate = useNavigate();
    const { id } = useParams();
    
    const updateAction = async (action) => {
        const res = await fetch(`/api/actions/${action.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action),
        });
        return;
    };

    const submitForm = (e) => {
        e.preventDefault();

        const updatedCleanup = {
            id,
            title,
            date,
            description,
            location,
            groupSize,
            environmentType,
            totalBagsCollected,
            totalItemsCollected
        }

        updateAction(updatedCleanup);

        toast.success('Cleanup Updated Successfully');

        return navigate(`/action/${id}`);
    };

    const environmentTypeOptions = [
        { value: "", label: "Select an environment type" },
        { value: "path", label: "Path" },
        { value: "park", label: "Park" },
        { value: "beach", label: "Beach" },
        { value: "other", label: "Other" },
    ];

    return (
        <form className="container-narrow bg-dark" onSubmit={submitForm}>
            <h2 className="text-primary font-lg">Cleanup Action</h2>
            
            <div className="form-group">
                <label htmlFor="title">Title*</label>
                <input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Cleanup Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                    id="description"
                    type="text"
                    name="description"
                    placeholder="(Optional) Describe your cleanup action"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="date">Date*</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="location">Location*</label>
                <input
                    id="location"
                    type="text"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
            </div>

            <div className="form-group grid-2">
                <div>
                    <label htmlFor="environment-type">Environment Type</label>
                    <Select
                        styles={customStyles}
                        defaultInputValue={environmentType}
                        onChange={(selectedOption) => {
                        setEnvironmentType(selectedOption.value);
                        }}
                        options={environmentTypeOptions}
                    />
                </div>
                <div>
                    <label htmlFor="groupSize">Group Size</label>
                    <input
                        id="groupSize"
                        style={styles.number}
                        type="number"
                        name="groupSize"
                        value={groupSize}
                        onChange={(e) => setGroupSize(e.target.value)}
                        min="1"
                        max="9999"
                    />
                </div>
            </div>

            <div className="form-group grid-2">
                <div>
                    <label htmlFor="totalItemsCollected">Total Items Collected</label>
                    <input
                        id="totalItemsCollected"
                        style={styles.number}
                        type="number"
                        name="totalItemsCollected"
                        value={totalItemsCollected}
                        onChange={(e) => setTotalItemsCollected(e.target.value)}
                        min="0"
                        max="99999"
                    />
                </div>
                <div>
                    <label htmlFor="groupSize">Total Bags Collected</label>
                    <input
                        id="totalBagsCollected"
                        style={styles.number}
                        type="number"
                        name="totalBagsCollected"
                        value={totalBagsCollected}
                        onChange={(e) => setTotalBagsCollected(e.target.value)}
                        min="0"
                        max="999"
                    />
                </div>
            </div>

            <div>
                <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary--dark btn-block"
                />
            </div>

            <p className="font-sm">* required</p>
        </form>
    );
};

const customStyles = {
    option: (provided, state) => ({
        ...provided,
        color: "#000",
    }),
}

const styles = {
  number: {
    display: "inherit",
    padding: "8px 4px",
    minWidth: "120px"
  }
};

export default AddCleanupPage;