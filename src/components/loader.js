//import React, { Component } from "react";

const Loader = () => {
    setTimeout(() => {
        console.log("waiting...");
    }, 5000);
    return <div>Loading!</div>;
};

export default Loader;
