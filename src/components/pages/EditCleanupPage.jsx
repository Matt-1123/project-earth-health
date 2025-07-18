import { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Select from "react-select";
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { getAction } from '../../api/actions';

// const AddCleanupPage = ({ addCleanupSubmit }) => {
const AddCleanupPage = () => {
    const navigate = useNavigate();
    const locationHook = useLocation();
    const actionId = locationHook.pathname.split("/")[2];

    const { data, isLoading, isError, error, refetch } = useQuery({
      queryKey: ['action', actionId],
      queryFn: () => getAction(actionId)
    });

    console.log(`data from useQuery: ${JSON.stringify(data)}`)
    
    // TODO: use localStorage to populate dropdowns (environmentType)
    const [title, setTitle] = useState(data.title);
    const [date, setDate] = useState(data.date);
    const [description, setDescription] = useState(data.description);
    const [location, setLocation] = useState(data.location);
    const [groupSize, setGroupSize] = useState(data.group_size);
    const [environmentType, setEnvironmentType] = useState(data.env_type);
    const [totalItemsCollected, setTotalItemsCollected] = useState(data.total_items);
    const [totalBagsCollected, setTotalBagsCollected] = useState(data.total_bags);

    const { id } = useParams();
    
    const updateAction = async (action) => {
        const res = await fetch(`/api/actions/${actionId}`, {
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

        return navigate(`/action/${actionId}`);
    };

    const environmentTypeOptions = [
        { value: "", label: "Select an environment type" },
        { value: "path", label: "Path" },
        { value: "park", label: "Park" },
        { value: "beach", label: "Beach" },
        { value: "other", label: "Other" }
    ];

    const dateOnlyConversion = (isoTimestamp) => {
        return isoTimestamp.split('T')[0];
    } 

    return (
        <>
            {isLoading && <Spinner loading={isLoading} />}
            {isError && <p>Error fetching data</p>}
            {data && (
                <form className="container-narrow bg-dark" onSubmit={submitForm}>
                    <h2 className="text-primary font-lg">Cleanup Action</h2>
                    
                    <div className="form-group">
                        <label htmlFor="title">Title*</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Cleanup Title"
                            value={data.title}
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
                            value={data.description} 
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date*</label>
                        <input
                            id="date"
                            type="date"
                            name="date"
                            value={dateOnlyConversion(data.date)}
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
                            value={data.location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group grid-2">
                        <div>
                            <label htmlFor="environment-type">Environment Type</label>
                            <Select
                                styles={customStyles}
                                defaultInputValue={data.env_type}
                                onChange={(selectedOption) => {
                                    setEnvironmentType(selectedOption.value);
                                }}
                                options={environmentTypeOptions}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="groupSize">Group Size</label>
                            <input
                                id="groupSize"
                                style={styles.number}
                                type="number"
                                name="groupSize"
                                value={data.group_size}
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
                                value={data.total_items}
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
                                value={data.total_bags}
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
            )}
        </>
    )
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