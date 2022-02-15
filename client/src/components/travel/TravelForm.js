import React, { useState, useEffect } from "react";
import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import ComboBox from "react-responsive-combo-box";
import "react-responsive-combo-box/dist/index.css";
import { useNavigate } from "react-router-dom";

const TravelForm = () => {
  let navigate = useNavigate();

  // Action Title
  const [title, setTitle] = useState(() => {
    // Get stored value from local storage and if present set it as the initial state.
    const savedTitle = localStorage.getItem("title");
    const initialValue = savedTitle;
    return initialValue || "";
  });
  useEffect(() => {
    // On change, update local storage
    localStorage.setItem("title", title);
  }, [title]);

  // Action Description
  const [description, setDescription] = useState(() => {
    // Get stored value from local storage and if present set it as the initial state.
    const savedDescription = localStorage.getItem("description");
    return savedDescription || "";
  });
  useEffect(() => {
    // On change, update local storage
    localStorage.setItem("description", description);
  }, [description]);

  // Action Date
  const [date, setDate] = useState(() => {
    // Get stored value from local storage and if present set it as the initial state.
    const savedDate = localStorage.getItem("date");
    const initialValue = savedDate;
    return initialValue || "";
  });
  useEffect(() => {
    // On change, update local storage
    localStorage.setItem("date", date);
  }, [date]);

  // Used Travel Type
  const [usedTravelType, setUsedTravelType] = useState(() => {
    // Get stored value from local storage and if present set it as the initial state.
    const savedValue = localStorage.getItem("usedTravelType");
    return savedValue || "walking";
  });
  useEffect(() => {
    // On change, update local storage
    localStorage.setItem("usedTravelType", usedTravelType);
  }, [usedTravelType]);

  // Avoided Travel Type
  const [avoidedTravelType, setAvoidedTravelType] = useState(() => {
    // Get stored value from local storage and if present set it as the initial state.
    const savedValue = localStorage.getItem("avoidedTravelType");
    return savedValue || "walking";
  });
  useEffect(() => {
    // On change, update local storage
    localStorage.setItem("avoidedTravelType", avoidedTravelType);
  }, [avoidedTravelType]);

  // Used Origin
  const [usedOrigin, setUsedOrigin] = useState(() => {
    // Get stored value from local storage and if present set it as the initial state.
    const savedValue = localStorage.getItem("usedOrigin");
    return savedValue || "";
  });
  useEffect(() => {
    // On change, update local storage
    localStorage.setItem("usedOrigin", usedOrigin);
  }, [usedOrigin]);

  // Used Destination
  const [usedDestination, setUsedDestination] = useState(() => {
    // Get stored value from local storage and if present set it as the initial state.
    const savedValue = localStorage.getItem("usedDestination");
    return savedValue || "";
  });
  useEffect(() => {
    // On change, update local storage
    localStorage.setItem("usedDestination", usedDestination);
  }, [usedDestination]);

  // Avoided Origin
  const [avoidedOrigin, setAvoidedOrigin] = useState(() => {
    // Get stored value from local storage and if present set it as the initial state.
    const savedValue = localStorage.getItem("avoidedOrigin");
    return savedValue || "";
  });
  useEffect(() => {
    // On change, update local storage
    localStorage.setItem("avoidedOrigin", avoidedOrigin);
  }, [avoidedOrigin]);

  // Avoided Destination
  const [avoidedDestination, setAvoidedDestination] = useState(() => {
    // Get stored value from local storage and if present set it as the initial state.
    const savedValue = localStorage.getItem("avoidedDestination");
    return savedValue || "";
  });
  useEffect(() => {
    // On change, update local storage
    localStorage.setItem("avoidedDestination", avoidedDestination);
  }, [avoidedDestination]);

  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState({});

  const [vehicleModels, setVehicleModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState([]);

  // Store all the vehicle makes in state only when the avoided travel type is 'vehicle' and if vehicleMakes is an empty array. This will limit the API call for vehicle makes to one per session, and only if 'vehicle' is manually selected.
  useEffect(() => {
    const getVehicleMakes = async () => {
      try {
        const res = await axios.get("/api/carbon-interface/makes");
        let arr = [];
        res.data.forEach((make) => {
          arr.push({
            name: make.data.attributes.name,
            id: make.data.id,
          });
        });
        setVehicleMakes(arr);
      } catch (err) {
        console.error(err);
      }
    };

    if (vehicleMakes.length === 0 && avoidedTravelType === "vehicle") {
      getVehicleMakes();
    }
  }, [avoidedTravelType]);

  useEffect(() => {
    // create array of options to add to vehicle makes dropdown
    let makeOptions = [];
    vehicleMakes.map((make) => {
      return makeOptions.push(
        <option key={make.id} value={make.id}>
          {make.name}
        </option>
      );
    });
  }, [vehicleMakes]);

  // When selectedMake is updated, get models data from GET /carbon-interface route.
  // Then populate vehicle models dropdown
  useEffect(() => {
    const getVehicleModels = async () => {
      try {
        const res = await axios.get(
          `/api/carbon-interface/models/${selectedMake.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        console.log(res.data);

        const modelsArr = [];
        res.data.forEach((model) => {
          modelsArr.push({
            name: model.data.attributes.name,
            year: model.data.attributes.year,
            id: model.data.id,
          });
        });

        setVehicleModels(modelsArr);
      } catch (err) {
        console.log(`/api/carbon-interface/models/${selectedMake.id}`);
        console.error(err);
      }
    };

    getVehicleModels();
  }, [selectedMake]);

  // Handle inputs that must be saved in local storage
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleUsedTravelTypeChange = (e) => {
    setUsedTravelType(e.target.value);
  };
  const handleAvoidedTravelTypeChange = (e) => {
    setAvoidedTravelType(e.target.value);
  };

  // Places Autocomplete: Used Origin
  const handleUsedOriginSelect = async (value) => setUsedOrigin(value);
  const handleUsedOriginChange = (value) => setUsedOrigin(value);

  // Places Autocomplete: Used Destination
  const handleUsedDestinationSelect = async (value) =>
    setUsedDestination(value);
  const handleUsedDestinationChange = (value) => setUsedDestination(value);

  // Places Autocomplete: Avoided Origin
  const handleAvoidedOriginSelect = async (value) => setAvoidedOrigin(value);
  const handleAvoidedOriginChange = (value) => setAvoidedOrigin(value);

  // Places Autocomplete: Avoided Destination
  const handleAvoidedDestinationSelect = async (value) =>
    setAvoidedDestination(value);
  const handleAvoidedDestinationChange = (value) =>
    setAvoidedDestination(value);

  // Auto fill avoided origin when checked
  const sameOrigin = () => {
    if (document.getElementById("same-origin").checked) {
      setAvoidedOrigin(usedOrigin);
    }
  };

  // Auto fill avoided destination when checked
  const sameDestination = () => {
    if (document.getElementById("same-destination").checked) {
      setAvoidedDestination(usedDestination);
    }
  };

  // On vehicle make change, set selectedMake to make object from Carbon Interface.
  // Only call setSelectedMake if there is a vehicle make match. Otherwise selectedMake will be undefined and cause an error.
  const handleSelectedMake = (makeName) => {
    const selectedMake = vehicleMakes.find((make) => make.name === makeName);

    if (selectedMake) {
      setSelectedMake(selectedMake);
    }
  };

  const handleSelectedModel = (option) => {
    const selectedModel = vehicleModels.find(
      (model) => `${model.name} ${model.year} (${model.id})` === option
    );

    if (selectedModel) {
      setSelectedModel(selectedModel);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    navigate("/add-travel/summary", {
      state: { title, date },
    });
  };

  return (
    <form className="container-narrow bg-dark" onSubmit={onSubmit}>
      <h2 className="text-primary font-lg">Travel Action</h2>
      <div className="form-group">
        <label htmlFor="title">Title*</label>
        <input
          id="title"
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          name="description"
          placeholder="(Optional) Describe your green travel"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date*</label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={handleDateChange}
          required
        />
      </div>

      {/* TRAVEL USED */}
      <div className="card">
        <h2 className="text-left">Travel Used</h2>
        <div className="form-group">
          <label>Travel type*</label>
          <select
            name="usedTravelType"
            onChange={handleUsedTravelTypeChange}
            required
          >
            <option value="walking">Walking</option>
            <option value="bicycling">Bicycling</option>
            <option value="transit" disabled>
              Transit (coming soon)
            </option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="usedOrigin">Origin*</label>
          <PlacesAutocomplete
            value={usedOrigin}
            onChange={handleUsedOriginChange}
            onSelect={handleUsedOriginSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input {...getInputProps({ placeholder: "Type address" })} />

                <div>
                  {loading ? <div>Loading...</div> : null}

                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#003699" : "#fff",
                      color: suggestion.active ? "#fff" : "#000",
                      cursor: "pointer",
                    };

                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, { style })}
                        key={suggestion.placeId}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
        <div className="form-group">
          <label htmlFor="usedDestination">Destination*</label>
          <PlacesAutocomplete
            value={usedDestination}
            onChange={handleUsedDestinationChange}
            onSelect={handleUsedDestinationSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input {...getInputProps({ placeholder: "Type address" })} />

                <div>
                  {loading ? <div>Loading...</div> : null}

                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#003699" : "#fff",
                      color: suggestion.active ? "#fff" : "#000",
                      cursor: "pointer",
                    };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
      </div>

      {/* TRAVEL AVOIDED */}
      <div className="card">
        <h2 className="text-left">Travel Avoided</h2>
        <div className="form-group">
          <label htmlFor="avoidedTravelType">Travel type*</label>
          <select
            name="avoidedTravelType"
            onChange={handleAvoidedTravelTypeChange}
            required
          >
            <option value="">Select a travel type</option>
            <option value="vehicle">Vehicle</option>
            <option value="transit" disabled>
              Transit (coming soon)
            </option>
          </select>
        </div>

        <div className="grid-2">
          {/* Vehicle Makes Dropdown */}
          <div
            style={{
              margin: "0 auto",
              display: avoidedTravelType === "vehicle" ? "block" : "none",
            }}
            className="form-group"
          >
            <label htmlFor="vehicleMake">Vehicle Make*</label>
            {/* <select name="vehicleMake">
              <option value="">Select a vehicle make</option>
              {vehicleMakes.map((make) => (
                <option key={make.id} value={make.id}>
                  {make.name}
                </option>
              ))}
            </select> */}
            <ComboBox
              className="text-primary"
              options={vehicleMakes.map((make) => make.name)}
              enableAutocomplete
              onChange={(option) => handleSelectedMake(option)}
              onSelect={(option) => handleSelectedMake(option)}
              required
            />
          </div>

          {/* Vehicle Models Dropdown */}
          <div
            style={{
              margin: "0 auto",
              display: avoidedTravelType === "vehicle" ? "block" : "none",
            }}
            className="form-group"
          >
            <label htmlFor="vehicleModel">Vehicle Model*</label>
            <ComboBox
              className="text-primary"
              options={vehicleModels.map(
                (model) => `${model.name} ${model.year} (${model.id})`
              )}
              enableAutocomplete
              onChange={(option) => handleSelectedModel(option)}
              onSelect={(option) => handleSelectedModel(option)}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="avoidedOrigin">Origin*</label>
          <PlacesAutocomplete
            value={avoidedOrigin}
            onChange={handleAvoidedOriginChange}
            onSelect={handleAvoidedOriginSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input
                  name="avoidedOrigin"
                  {...getInputProps({ placeholder: "Type address" })}
                />

                <div>
                  {loading ? <div>Loading...</div> : null}

                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#003699" : "#fff",
                      color: suggestion.active ? "#fff" : "#000",
                    };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          <input
            className="m"
            type="checkbox"
            name="same-origin"
            id="same-origin"
            onChange={sameOrigin}
          ></input>
          <label className="m" htmlFor="same-origin">
            Same origin as travel used
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="avoidedDestination">Destination*</label>
          <PlacesAutocomplete
            value={avoidedDestination}
            onChange={handleAvoidedDestinationChange}
            onSelect={handleAvoidedDestinationSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <input {...getInputProps({ placeholder: "Type address" })} />

                <div>
                  {loading ? <div>Loading...</div> : null}

                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#003699" : "#fff",
                      color: suggestion.active ? "#fff" : "#000",
                    };

                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          <input
            className="m"
            type="checkbox"
            name="same-destination"
            id="same-destination"
            onChange={sameDestination}
          ></input>
          <label className="m" htmlFor="same-destination">
            Same destination as travel used
          </label>
        </div>
      </div>

      <div>
        <input
          type="submit"
          value="Calculate Impact"
          className="btn btn-primary btn-block"
        />
      </div>

      <p className="font-sm">* required</p>
    </form>
  );
};

export default TravelForm;
