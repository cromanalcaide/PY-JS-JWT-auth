import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
  const { store, actions } = useContext(Context);

useEffect(() => {
	let myHeaders = new Headers();
  	myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3NDI5ODMyOCwianRpIjoiNmU5ODkzODctMGQzOC00Y2EwLTk4ZmMtODZlMjBmZmJjNjAxIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRlc3QyQHRlc3QuY29tIiwibmJmIjoxNjc0Mjk4MzI4LCJleHAiOjE2NzQyOTkyMjh9.q0u1kc4PwB_WbI5WvPHo0krza_W3092jorfauTo_evA"
  );

  let raw = "";

  let requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "https://3001-4geeksacade-reactflaskh-3tv1758ui84.ws-eu83.gitpod.io/api/private",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}, [])

  
  return (
    <div className="container">
      <ul className="list-group">
        {store.demo.map((item, index) => {
          return (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between"
              style={{ background: item.background }}
            >
              <Link to={"/single/" + index}>
                <span>Link to: {item.title}</span>
              </Link>
              {
                // Conditional render example
                // Check to see if the background is orange, if so, display the message
                item.background === "orange" ? (
                  <p style={{ color: item.initial }}>
                    Check store/flux.js scroll to the actions to see the code
                  </p>
                ) : null
              }
              <button
                className="btn btn-success"
                onClick={() => actions.changeColor(index, "orange")}
              >
                Change Color
              </button>
            </li>
          );
        })}
      </ul>
      <br />
      <Link to="/">
        <button className="btn btn-primary">Back home</button>
      </Link>
    </div>
  );
};
