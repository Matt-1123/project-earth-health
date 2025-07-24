import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Select from "react-select";
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { getAction } from '../../api/actions';

const EditCleanupPage = () => {
    const navigate = useNavigate();
    const locationHook = useLocation();
    const actionId = locationHook.pathname.split("/")[2];

    // const { data, isPending, isError, error, refetch, fetchStatus, status } = useQuery({
    //   queryKey: ['action', actionId],
    //   queryFn: () => getAction(actionId)
    // });
    // const [action, setAction] = useState({})
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        description: '',
        location: '',
        groupSize: 1,
        environmentType: '',
        totalBagsCollected: '',
        totalItemsCollected: ''
    })

    useEffect(() => {    
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/cleanups/${actionId}`);
                console.log(`GET /api/cleanups/[id]: ${JSON.stringify(res.data)}`)
                const {id, title, date, userName, description, group_size, duration, location, env_type, total_items, total_bags} = res.data[0];
                
                setFormData({
                    ...formData,
                    title: title,
                    [date]: date,
                    [description]: description,
                    [location]: location,
                    [groupSize]: group_size,
                    [environmentType]: env_type,
                    [totalBagsCollected]: total_bags,
                    [totalItemsCollected]: total_items
                })
            } catch (err) {
                console.error('Error fetching data', err);
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, []);
    
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            {loading && <Spinner loading={loading} />}
            {!loading && (   
                <form className="container-narrow bg-dark" onSubmit={submitForm}>
                    <h2 className="text-primary font-lg">Cleanup Action</h2>
                    
                    <div className="form-group">
                        <label htmlFor="title">Title*</label>
                        <input
                            id="title"
                            type="text"
                            name="title"
                            placeholder="Cleanup Title"
                            value={formData.title}
                            onChange={handleChange}
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
                            value={formData.description} 
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date*</label>
                        <input
                            id="date"
                            type="date"
                            name="date"
                            // value={formData.date !== '' ? dateOnlyConversion(date) : ''}
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="location">Location*</label>
                        <input
                            id="location"
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group grid-2">
                        <div>
                            <label htmlFor="environment-type">Environment Type</label>
                            <Select
                                styles={customStyles}
                                defaultInputValue={formData.environmentType}
                                onChange={(selectedOption) => {
                                    setFormData({
                                        ...formData,
                                        environmentType: selectedOption.value
                                    })
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
                                value={formData.groupSize}
                                onChange={handleChange}
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
                                value={formData.totalItemsCollected}
                                onChange={handleChange}
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
                                value={formData.totalBagsCollected}
                                onChange={handleChange}
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

export default EditCleanupPage;