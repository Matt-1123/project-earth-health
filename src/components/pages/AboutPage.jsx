import React from "react";

const About = () => {
  return (
    <div className="container-narrow">
      <h1>About PEH</h1>
      <hr />
      <p className="my-1">
        Project Earth Health is a platform where you can calculate and log
        environmentally-friendly actions. Currently you can log a Travel Action,
        which calculates the amount of CO2 emissions you prevent by walking or
        bicycling instead of using a vehicle.
      </p>
      <h2>Future Updates/Additions</h2>
      <hr />
      <ul>
        <li className="ml-1 my" style={{ listStyleType: "circle" }}>
          Transit will be added soon as a Travel Action option.
        </li>
        <li className="ml-1 my" style={{ listStyleType: "circle" }}>
          New action types will be added after Travel Action is complete. The
          next Action Type will be a Diet Action, in which you will be able to
          calculate the impacts of choosing more environmentally-friendly food
          options, such as replacing beef with chicken for a month, or going
          meat and cheese free for a week.
        </li>
      </ul>
    </div>
  );
};

export default About;
