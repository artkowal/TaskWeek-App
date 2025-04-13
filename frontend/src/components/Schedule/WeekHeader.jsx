import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "../../styles/WeekHeader.css";

const WeekHeader = ({ onAdd }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dayOfMonth = now.getDate();
  const month = now.toLocaleString("pl-PL", { month: "long" });
  const formattedTime = now.toLocaleTimeString("pl-PL");

  const handleAdd = () => {
    const currentDay = now.getDay() === 0 ? 7 : now.getDay();
    onAdd({
      dayOfWeek: currentDay,
      title: "",
      description: "",
      startTime: "08:00:00",
      endTime: "09:00:00",
      color: "#ff0000",
      isRecurring: false,
    });
  };

  return (
    <div className="week-header">
      <div className="week-header__info">
        <h4 className="week-header__date">
          {dayOfMonth} {month}
        </h4>
        <div className="week-header__time">{formattedTime}</div>
      </div>
      <div className="week-header__actions">
        <Button variant="success" onClick={handleAdd}>
          + Dodaj
        </Button>
      </div>
    </div>
  );
};

export default WeekHeader;
