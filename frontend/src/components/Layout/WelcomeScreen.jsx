import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../../styles/WelcomeScreen.css";
import welcomeImage from "../../assets/task-list.png";

const WelcomeScreen = () => {
  return (
    <div className="welcome-container">
      <img
        src={welcomeImage}
        alt="TaskWeek Welcome"
        className="welcome-image welcome-animation"
      />

      <div className="welcome-animation">
        <h1>Witamy w TaskWeek!</h1>
        <p className="text-muted">
          TaskWeek to Twój osobisty asystent do organizowania zadań. <br />
          Planuj, monitoruj postępy i zwiększ swoją produktywność każdego dnia!
        </p>
        <Button as={Link} to="/login" className="button">
          Rozpocznij zarządzanie
        </Button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
