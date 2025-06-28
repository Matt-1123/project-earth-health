import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import { toast } from 'react-toastify';

const AddCleanupPage = ({ addCleanupSubmit }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [groupSize, setGroupSize] = useState('1');
    const [environmentType, setEnvironmentType] = useState('');
    const [amountCollected, setAmountCollected] = useState('');

    const navigate = useNavigate();

    const submitForm = (e) => {
        e.preventDefault();

        const newCleanup = {
            title,
            date,
            description,
            location,
            groupSize,
            environmentType,
            amountCollected
        }

        addCleanupSubmit(newCleanup);

        toast.success('Cleanup Added Successfully');

        return navigate('/');
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

            <div className="form-group">
                <label htmlFor="environment-type">Environment Type</label>
                <Select
                    styles={customStyles}
                    // defaultInputValue={}
                    onChange={(selectedOption) => {
                    setEnvironmentType(selectedOption.value);
                    }}
                    options={environmentTypeOptions}
                    placeholder="Choose an environment type"
                />
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
};

export default AddCleanupPage;