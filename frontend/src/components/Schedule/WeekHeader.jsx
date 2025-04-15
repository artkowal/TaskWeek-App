import React, { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import "../../styles/WeekHeader.css";

const WeekHeader = () => {
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

  return (
    <div className="week-header">
      <div className="week-header__box">
        <div className="clock-box">
          <CalendarClock size={40} />
        </div>
        <div className="week-header__info">
          <h4 className="week-header__date">
            {dayOfMonth} {month}
          </h4>
          <div className="week-header__time">{formattedTime}</div>
        </div>
      </div>
    </div>
  );
};

export default WeekHeader;
