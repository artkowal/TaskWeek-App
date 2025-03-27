import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { motion } from "framer-motion";
import "../../styles/WelcomeScreen.css";
import welcomeImage from "../../assets/task-list.png";

const WelcomeScreen = () => {
  return (
    <div className="welcome-container">
      {/* Animacja Fade-In dla obrazka */}
      <motion.img
        src={welcomeImage}
        alt="TaskWeek Welcome"
        className="welcome-image"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Animacja Fade-In + Slide-Up dla tekstu */}
      <motion.div className="welcome-text">
        <h1>Witamy w TaskWeek!</h1>
        <p className="text-muted">
          TaskWeek to Twój osobisty asystent do organizowania zadań. <br />
          Planuj, monitoruj postępy i zwiększ swoją produktywność każdego dnia!
        </p>

        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05, 1] }} // efekt pulsowania
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <Button
            as={Link}
            to="/login"
            variant="primary"
            size="lg"
            className="mt-3"
          >
            Rozpocznij zarządzanie
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
