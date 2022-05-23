import React from "react";
import { Spinner } from "react-bootstrap";
import "../styles/loadingScreen.css";
const LoadingScreen = () => {
  return (
    <div className="content">
      <Spinner animation="border" role="status" />
    </div>
  );
};

export default LoadingScreen;
