import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import styled from "styled-components";
export function Reloj() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();
      const currentSeconds = now.getSeconds();
      const currentMonth = now.getMonth();
      const currentDay = now.getDate();
      const currentYear = now.getFullYear();

      const days = [
        "domingo",
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábado",
      ];
      const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];

      const monthName = months[currentMonth];
      const hour12 = currentHour > 12 ? currentHour - 12 : currentHour;
      const period = currentHour < 12 ? "AM" : "PM";

      const formattedHours = hour12 < 10 ? "0" + hour12 : hour12;
      const formattedMinutes =
        currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;
      const formattedSeconds =
        currentSeconds < 10 ? "0" + currentSeconds : currentSeconds;

      setTime(
        `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${period}`
      );
      setDate(
        `${days[now.getDay()]} ${currentDay} ${monthName} de ${currentYear}`
      );
    };

    const intervalId = setInterval(updateClock, 1000);

    // Cleanup interval when component unmounts
    return () => clearInterval(intervalId);
  }, []); // The second argument [] indicates that this effect runs only on mount

  return (
    <Container>
      <div className="clock-container">
        <div className="clock" id="clock">
          {<Icon icon="icon-park:alarm-clock" />} {time}
        </div>
        <div className="date-info">
          <span id="date-text">{date}</span>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  .clock-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-weight: bold;
  }
  .clock {
    font-size: 1em;
    align-items: center;
    display: flex;
    gap: 5px;
  }
  .date-info {
    font-size: 1em;
  }
`;
