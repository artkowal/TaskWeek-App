import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const WeekHeader = ({ onAdd }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  //   const dayOfMonth = now.getDate();
  //   const month = now.toLocaleString("pl-PL", { month: "long" });
  //   const formattedTime = now.toLocaleTimeString("pl-PL");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
        padding: "0 0.5rem",
      }}
    >
      <div>
        <Button variant="success" onClick={() => onAdd(null)}>
          + Dodaj
        </Button>
      </div>
      {/* <div>
        <h4 style={{ margin: 0 }}>
          {dayOfMonth} {month}
        </h4>
        <div style={{ fontSize: "0.85rem", color: "#555" }}>
          {formattedTime}
        </div>
      </div> */}
    </div>
  );
};

export default WeekHeader;
